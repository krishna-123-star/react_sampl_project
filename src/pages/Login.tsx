import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Paper, TextField, Button, Typography, Box } from "@mui/material";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    try {
      await login(username, password);
      navigate("/dashboard/products");
    } catch (err: any) {
      console.error("Login failed:", err);
      alert(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>Login</Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField label="Username" value={username} fullWidth margin="normal" onChange={(e) => setUsername(e.target.value)} />
          <TextField label="Password" type="password" value={password} fullWidth margin="normal" onChange={(e) => setPassword(e.target.value)} />
          <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={() => handleSubmit()} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
