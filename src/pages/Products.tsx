import React, { useEffect, useState, useCallback } from "react";
import { Container, Typography, Select, MenuItem, Grid, Card, CardMedia, CardContent, Button } from "@mui/material";
import client from "../api/client";
import { useNavigate } from "react-router-dom";

type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail?: string;
  category?: string;
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState("price"); // sort field
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const navigate = useNavigate();

  const fetchProducts = useCallback(async () => {
    try {
      const res = await client.get(`/products?sortBy=${encodeURIComponent(sortBy)}&order=${order}`);
      setProducts(res.data.products || []);
    } catch (err) {
      console.error("Products fetch failed", err);
    }
  }, [sortBy, order]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Container>
      <Typography variant="h5" gutterBottom>Products</Typography>

      <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
        <Select value={sortBy} onChange={(e) => setSortBy(String(e.target.value))}>
          <MenuItem value="price">Price</MenuItem>
          <MenuItem value="title">Title</MenuItem>
          <MenuItem value="rating">Rating</MenuItem>
        </Select>

        <Select value={order} onChange={(e) => setOrder(e.target.value as "asc" | "desc")}>
          <MenuItem value="asc">Asc</MenuItem>
          <MenuItem value="desc">Desc</MenuItem>
        </Select>

        <Button variant="outlined" onClick={() => fetchProducts()}>Refresh</Button>
      </div>

      <Grid container spacing={2}>
        {products.map((p) => (
          <Grid item xs={12} sm={6} md={4} key={p.id}>
            <Card sx={{ cursor: "pointer" }} onClick={() => navigate(`/dashboard/products/${p.id}`)}>
              {p.thumbnail && <CardMedia component="img" height="140" image={p.thumbnail} alt={p.title} />}
              <CardContent>
                <Typography variant="h6">{p.title}</Typography>
                <Typography>Price: ${p.price}</Typography>
                <Typography variant="caption">{p.category}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
