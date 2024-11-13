import { AppBar, IconButton, Toolbar } from "@mui/material";
import { ThemeContextType, useThemeContext } from "../Context/ThemeContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
function NavBar() {
  const { toggleTheme, themeMode }: ThemeContextType = useThemeContext();
  return (
    <>
      <AppBar>
        <Toolbar>
          <IconButton color="inherit" onClick={toggleTheme}>
            {themeMode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default NavBar;
