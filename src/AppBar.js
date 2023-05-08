import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import CalendarPicker from './CalendarPicker';
import AddCalendar from './AddCalendar';
import { Link } from "react-router-dom";
import { Stack } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';

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
    <AppBar position="fixed" style={{ background: '#2E3B55' }}>
      <Container maxWidth="xl">

        <Toolbar disableGutters>

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            calenBar
          </Typography>


          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <CalendarPicker
                calendar={props.calendar}
                setCalendar={props.setCalendar}
            ></CalendarPicker>
            <AddCalendar></AddCalendar>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
          
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircle  sx={{color:"white"}}></AccountCircle>
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >

                <MenuItem onClick={handleCloseUserMenu}>
                    <Link to={"/login"} style={{paddingRight:"10px"}}>Login</Link>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                    <Link to={"/register"}>Register</Link>  
                </MenuItem>

            </Menu>

          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;