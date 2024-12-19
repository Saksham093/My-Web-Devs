import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem } from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import MenuIcon from '@mui/icons-material/Menu';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Link } from 'react-router-dom';

function Navigation() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const isMobile = window.innerWidth <= 768;

    return (
        <AppBar
            position="fixed"
            sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                boxShadow: 'none',
                backdropFilter: 'blur(15px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
            }}
        >
            <Toolbar sx={{ minHeight: 48 }}>
                {/* Left Text */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        padding: '8px',
                    }}
                >
                    <Typography
                        variant="h6"
                        component={Link}
                        to="/"
                        sx={{
                            fontFamily: 'Outfit, sans-serif',
                            fontWeight: 'bold',
                            color: 'black',
                            textDecoration: 'none',
                            cursor: 'pointer',
                            transition: 'color 0.3s ease, transform 0.3s ease',
                            '&:hover': {
                                color: 'white',
                                transform: 'translateY(-2px)',
                            },
                        }}
                    >
                        BrainDigit
                    </Typography>
                </Box>

                {/* Central Logo */}
                {!isMobile && (
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <img
                            src="/images/BG_SAKSHAM.png"
                            alt="Logo"
                            style={{
                                height: 40,
                                zIndex: 1,
                            }}
                        />
                    </Box>
                )}

                {/* Navigation Buttons */}
                {!isMobile && (
                    <Box
                        sx={{
                            position: 'absolute',
                            right: 20,
                        }}
                    >
                        <Button
                            color="inherit"
                            variant="outlined"
                            sx={{
                                fontFamily: 'Outfit, sans-serif',
                                fontWeight: 'bold',
                                color: 'black',
                                textTransform: 'none',
                                borderColor: 'white',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                                    borderColor: 'black',
                                },
                            }}
                            component={Link}
                            to="/"
                        >
                            Home
                        </Button>

                        <Button
                            color="inherit"
                            variant="outlined"
                            sx={{
                                marginLeft: '10px',
                                fontFamily: 'Outfit, sans-serif',
                                fontWeight: 'bold',
                                color: 'black',
                                textTransform: 'none',
                                borderColor: 'white',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                                    borderColor: 'black',
                                },
                            }}
                            component={Link}
                            to="/settings"
                        >
                            Play
                        </Button>
                    </Box>
                )}

                {/* Mobile Menu */}
                {isMobile && (
                    <Box
                        sx={{
                            position: 'absolute',
                            right: 20,
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="#000"
                            aria-label="menu"
                            onClick={handleMenuOpen}
                        >
                            <MenuRoundedIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem component={Link} to="/" onClick={handleMenuClose}>
                                <HomeRoundedIcon sx={{ marginRight: 1 }} />
                                Home
                            </MenuItem>
                            <MenuItem component={Link} to="/settings" onClick={handleMenuClose}>
                                <PlayArrowIcon sx={{ marginRight: 1 }} />
                                Play
                            </MenuItem>
                        </Menu>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Navigation;
