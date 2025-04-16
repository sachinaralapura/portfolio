import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useThemeContext } from "../Context/ThemeContext";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useData } from "../Context/DataContext";
import { ThemeContextType } from "../utils/type";

const SideDrawer = () => {
  const { navList } = useData();
  const { themeMode } = useThemeContext();
  return (
    <Stack sx={{ width: "200px" }} spacing={1}>
      {navList.map((item) => (
        <Button key={item} color="inherit">
          <NavLink
            to={item}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            {({ isActive }) => (
              <Typography
                fontSize={20}
                sx={{
                  color: isActive
                    ? themeMode === "dark"
                      ? "primary.dark"
                      : "primary.light"
                    : "inherit",
                  px: 5,
                  py: 1,
                }}
              >
                {item}
              </Typography>
            )}
          </NavLink>
        </Button>
      ))}
    </Stack>
  );
};

function NavBar() {
  const { navList } = useData();

  const { toggleTheme, themeMode }: ThemeContextType = useThemeContext();
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <AppBar position="fixed" elevation={3} sx={{ top: 0 }} color="default">
        <Toolbar>
          {/* ----------------------- Menu Icon ----------------------- */}

          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "start",
              display: { md: "none" },
            }}
          >
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* ----------------------- Navbar Items ----------------------- */}

          <Stack
            sx={{ flexGrow: 1, display: { xs: "none", md: "block" }, py: 1 }}
            direction={"row"}
            spacing={2}
          >
            {navList.map((item) => (
              <Button key={item} color="inherit" variant="text">
                <NavLink
                  to={item}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  {({ isActive }) => (
                    <Typography
                      fontSize={20}
                      fontWeight={"bold"}
                      sx={{
                        color: isActive
                          ? themeMode === "dark"
                            ? "primary.dark"
                            : "primary.light"
                          : "inherit",
                        px: 4,
                        py: 1,
                      }}
                    >
                      {item}
                    </Typography>
                  )}
                </NavLink>
              </Button>
            ))}
          </Stack>

          {/* ----------------------- Dark Mode Icon ----------------------- */}

          <IconButton color="inherit" onClick={toggleTheme}>
            {themeMode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* ----------------------- Drawer for small devices ----------------------- */}

      <Drawer
        open={drawerOpen}
        anchor="left"
        onClose={handleDrawerToggle}
        sx={{ display: { md: "none" } }}
      >
        <SideDrawer />
      </Drawer>
    </>
  );
}

export default NavBar;
