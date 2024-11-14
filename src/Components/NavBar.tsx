import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { ThemeContextType, useThemeContext } from "../Context/ThemeContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import { useState } from "react";
const navItems: string[] = ["About", "Skills", "Blog", "Resume", "Contact"];

const SideDrawer = () => {
  return (
    <Box sx={{ width: "250px" }}>
      <List>
        {navItems.map((item) => (
          <ListItemButton key={item}>
            <NavLink to={item} style={{ color: "inherit", textDecoration: "none" }}>
              <ListItemText primary={item} />
            </NavLink>
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

function NavBar() {
  const { toggleTheme, themeMode }: ThemeContextType = useThemeContext();
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <AppBar position="fixed" elevation={3} sx={{ top: 0 }}>
        <Toolbar>
          {/* ----------------------- Menu Icon ----------------------- */}

          <Box sx={{ flexGrow: 1, justifyContent: "start", display: { sm: "none" } }}>
            <IconButton color="inherit" edge="start" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          </Box>

          {/* ----------------------- Navbar Items ----------------------- */}

          <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button key={item} color="inherit">
                <NavLink to={item} style={{ color: "inherit", textDecoration: "none" }}>
                  {item}
                </NavLink>
              </Button>
            ))}
          </Box>

          {/* ----------------------- Dark Mode Icon ----------------------- */}

          <IconButton color="inherit" onClick={toggleTheme}>
            {themeMode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* ----------------------- Drawer for small devices ----------------------- */}

      <Drawer
        open={drawerOpen}
        anchor="left"
        onClose={handleDrawerToggle}
        sx={{ display: { sm: "none" } }}
      >
        <SideDrawer />
      </Drawer>
    </>
  );
}

export default NavBar;
