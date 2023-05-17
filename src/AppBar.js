import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import CalendarPicker from "./CalendarPicker";
import AddCalendar from "./AddCalendar";
import { Link } from "react-router-dom";
import { AccountCircle, HowToReg } from "@mui/icons-material";
import ListItemIcon from "@mui/material/ListItemIcon";
import LogoutIcon from '@mui/icons-material/Logout';
import Login from "./Login";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";

function ResponsiveAppBar(props) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed" style={{ background: "#2E3B55" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            calenBar
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <CalendarPicker
              calendar={props.calendar}
              setCalendar={props.setCalendar}
            ></CalendarPicker>
            <AddCalendar></AddCalendar>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircle sx={{ color: "white" }}></AccountCircle>
              </IconButton>
            </Tooltip>
            <Paper>
              <Menu
                sx={{
                  mt: "45px",
                  "& .MuiMenu-paper": { backgroundColor: "#232629" },
                }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  onClick={handleCloseUserMenu}
                  sx={{ "&:hover": {
                    backgroundColor: "#424242",
                  },}}
                >
                  <HowToReg sx={{ color: "#FFF" }} />
                  <Link
                    to={"/register"}
                    style={{
                      marginLeft: "5px",
                      color: "white",
                      textDecoration: "none",
                      fontFamily: "Merriweather",
                    }}
                  >
                    Register
                  </Link>
                </MenuItem>
                <Divider sx={{ my: 0.5, backgroundColor: "#3D3D3D", marginLeft: "0.5em", marginRight: "0.5em" }} />
                <MenuItem
                  onClick={handleCloseUserMenu}
                  sx={{ "&:hover": {
                    backgroundColor: "#424242",
                  },}}
                >
                  <LogoutIcon fontSize="small" sx={{ color: "white" }} />
                  <Link
                    to={"/login"}
                    style={{
                      marginLeft: "10px",
                      color: "white",
                      textDecoration: "none",
                      fontFamily: "Merriweather",
                    }}
                    onClick={() => {localStorage.clear()}}
                  >
                    Logout
                  </Link>
                </MenuItem>
              </Menu>
            </Paper>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
