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
// import AdbIcon from '@mui/icons-material/Adb';
import BVCWhiteImage from '../../bvc-image/BvcWhiteImage.component';
// import { Height } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import handleLogout from '../../../placeholders/authentication/logout.action';

const commonPages = ['All Programs', 'All Classes', 'Comments'];

const guestPages = [...commonPages];

const adminPages = ['Dashboard', ...commonPages];
const studentPages = ['Dashboard', 'My Classes', ...commonPages];

function NavBar({ isAdminPage = false, isGuest = false }) {
    const currentUser = JSON.parse(sessionStorage.getItem('BVC_Session'));

    // Handle Header background-color variation
    let pageTheme = 'primary';

    if (isAdminPage) {
        pageTheme = 'secondary';
    }

    if (isGuest) {
        pageTheme = 'warning';
    }

    let pages = [];

    if (!currentUser) {
        pages = guestPages;
    } else {
        if (currentUser.isAdmin) {
            pages = adminPages;
        } else {
            pages = studentPages;
        }
    }

    let settings = [];

    if (!currentUser) {
        settings = ['Login'];
    } else {
        settings = ['Profile', 'Logout'];
    }

    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = event => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = event => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    function createNavLinkUrl(pagePath) {
        if (!currentUser) {
            return `/guest/${pagePath}`;
        } else {
            if (currentUser.isAdmin) {
                return `/admin/${pagePath}`;
            } else {
                return `/student/${pagePath}`;
            }
        }
    }

    return (
        <AppBar position="static" color={pageTheme}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* <BVCWhiteImage height={80} /> */}
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
                            textDecoration: 'none'
                        }}
                    >
                        <BVCWhiteImage height={60} />
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' }
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left'
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left'
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages.map(page => {
                                return (
                                    <MenuItem
                                        key={page}
                                        onClick={() => {
                                            navigate(
                                                createNavLinkUrl(
                                                    page
                                                        .toLowerCase()
                                                        .replace(/ /g, '-')
                                                )
                                            );
                                            handleCloseNavMenu();
                                        }}
                                    >
                                        <Typography
                                            sx={{ textAlign: 'center' }}
                                        >
                                            {page}
                                        </Typography>
                                    </MenuItem>
                                );
                            })}
                        </Menu>
                    </Box>
                    {/* <BVCImage height={80} /> */}
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none'
                        }}
                    >
                        <BVCWhiteImage height={60} />
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' }
                        }}
                    >
                        {pages.map(page => (
                            <Button
                                key={page}
                                onClick={() => {
                                    navigate(
                                        createNavLinkUrl(
                                            page
                                                .toLowerCase()
                                                .replace(/ /g, '-')
                                        )
                                    );
                                    handleCloseNavMenu();
                                }}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}
                            >
                                <Avatar
                                    alt="Remy Sharp"
                                    src="/static/images/avatar/2.jpg"
                                />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map(setting => (
                                <MenuItem
                                    key={setting}
                                    onClick={() => {
                                        if (setting === 'Logout') {
                                            handleLogout();
                                            navigate('/');
                                        }
                                        handleCloseUserMenu();
                                    }}
                                >
                                    <Typography sx={{ textAlign: 'center' }}>
                                        {setting}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default NavBar;
