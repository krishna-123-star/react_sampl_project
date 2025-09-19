import React, { useEffect, useState, useCallback } from "react";
import { Container, Typography, Grid, Card, CardContent, Checkbox, CircularProgress, Box } from "@mui/material";
import client from "../api/client";

type Todo = { id: number; todo: string; completed: boolean; userId?: number };

export default function Todos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.get("/todos")
      .then((res) => setTodos(res.data.todos || []))
      .catch((err) => console.error("Todos fetch failed", err))
      .finally(() => setLoading(false));
  }, []);

  const toggle = useCallback(async (t: Todo) => {
    try {
      const res = await client.put(`/todos/${t.id}`, { completed: !t.completed });
      setTodos((prev) => prev.map((p) => (p.id === t.id ? { ...p, completed: res.data.completed ?? !p.completed } : p)));
    } catch (err) {
      console.error("Update todo failed", err);
    }
  }, []);

  if (loading) return <Box p={3}><CircularProgress /></Box>;

  return (
    <Container>
      <Typography variant="h5" gutterBottom>Todos</Typography>
      <Grid container spacing={2}>
        {todos.map((t) => (
          <Grid key={t.id} item xs={12} sm={6}>
            <Card>
              <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Checkbox checked={t.completed} onChange={() => toggle(t)} />
                <Typography sx={{ textDecoration: t.completed ? "line-through" : "none" }}>{t.todo}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
