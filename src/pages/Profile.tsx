import React, { useEffect, useState } from "react";
import { Container, Paper, Typography, Avatar, Stack } from "@mui/material";
import client from "../api/client";
import { useAuth } from "../context/AuthContext";

// Define Profile type
interface Profile {
  id: number | string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  age: number;
  image?: string; // optional in case no image is returned
}

export default function Profile() {
  const { user, token, refreshProfile } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(
    (user as Profile) ?? null
  );

  useEffect(() => {
    if (user) {
      setProfile(user as Profile);
      return;
    }
    if (!token) return;

    client
      .get<Profile>("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProfile(res.data))
      .catch((err) => {
        console.error(
          "Profile fetch failed, attempting refresh via context",
          err
        );
        // try context refresh
        refreshProfile()
          .then(() => {
            const stored = localStorage.getItem("user");
            if (stored) setProfile(JSON.parse(stored) as Profile);
          })
          .catch(() => {});
      });
  }, [user, token, refreshProfile]);

  if (!profile) return <Container>Loading...</Container>;

  return (
    <Container>
      <Paper sx={{ p: 3, maxWidth: 420, mx: "auto" }}>
        <Stack spacing={2} alignItems="center">
          <Avatar src={profile.image} sx={{ width: 100, height: 100 }} />
          <Typography variant="h6">
            {profile.firstName} {profile.lastName}
          </Typography>
          <Typography>Username: {profile.username}</Typography>
          <Typography>Email: {profile.email}</Typography>
          <Typography>Age: {profile.age}</Typography>
        </Stack>
      </Paper>
    </Container>
  );
}
