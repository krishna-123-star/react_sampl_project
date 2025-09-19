import React, { useEffect, useState } from "react";
import { Container, Typography, Card, CardMedia, CardContent } from "@mui/material";
import { useParams } from "react-router-dom";
import client from "../api/client";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<any | null>(null);

  useEffect(() => {
    if (!id) return;
    client.get(`/products/${id}`).then((res) => setProduct(res.data)).catch((err) => console.error(err));
  }, [id]);

  if (!product) return <Container>Loading...</Container>;

  return (
    <Container>
      <Card>
        {product.thumbnail && <CardMedia component="img" height="300" image={product.thumbnail} />}
        <CardContent>
          <Typography variant="h5">{product.title}</Typography>
          <Typography>{product.description}</Typography>
          <Typography>Price: ${product.price}</Typography>
          <Typography>Brand: {product.brand}</Typography>
          <Typography>Category: {product.category}</Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
