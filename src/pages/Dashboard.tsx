import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Drawer, List, ListItem, ListItemText, AppBar, Toolbar, Typography, Box, IconButton
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../context/AuthContext";

const drawerWidth = 240;

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const items = [
    { text: "Products", path: "products" },
    { text: "Quotes", path: "quotes" },
    { text: "Todos", path: "todos" },
    { text: "Profile", path: "profile" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton color="inherit" edge="start" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>Dashboard</Typography>
          </Box>
          <Box>
            <Typography variant="body2" component="span" sx={{ mr: 2 }}>
              {user?.username}
            </Typography>
            <Typography component="button" onClick={logout} sx={{ color: "white", background: "transparent", border: 0, cursor: "pointer" }}>
              Logout
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" sx={{ width: drawerWidth, [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" } }}>
        <Toolbar />
        <List>
          {items.map((it) => (
            <ListItem button key={it.text} onClick={() => navigate(it.path)}>
              <ListItemText primary={it.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
