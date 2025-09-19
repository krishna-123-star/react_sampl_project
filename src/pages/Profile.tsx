import React, { useEffect, useState } from "react";
import { Container, Paper, Typography, Avatar, Stack } from "@mui/material";
import client from "../api/client";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, token, refreshProfile } = useAuth();
  const [profile, setProfile] = useState<any | null>(user ?? null);

  useEffect(() => {
    if (user) { setProfile(user); return; }
    if (!token) return;
    client.get("/auth/me", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setProfile(res.data))
      .catch((err) => {
        console.error("Profile fetch failed, attempting refresh via context", err);
        // try context refresh
        refreshProfile().then(() => {
          const stored = localStorage.getItem("user");
          if (stored) setProfile(JSON.parse(stored));
        }).catch(() => {});
      });
  }, [user, token, refreshProfile]);

  if (!profile) return <Container>Loading...</Container>;

  return (
    <Container>
      <Paper sx={{ p: 3, maxWidth: 420, mx: "auto" }}>
        <Stack spacing={2} alignItems="center">
          <Avatar src={profile.image} sx={{ width: 100, height: 100 }} />
          <Typography variant="h6">{profile.firstName} {profile.lastName}</Typography>
          <Typography>Username: {profile.username}</Typography>
          <Typography>Email: {profile.email}</Typography>
          <Typography>Age: {profile.age}</Typography>
        </Stack>
      </Paper>
    </Container>
  );
}
