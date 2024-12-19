// WelcomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Box, createTheme, ThemeProvider, Typography, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';


function WelcomePage() {
    return (
        <Box
            sx={{
                textAlign: 'center',
                background: 'white',
                borderRadius: '20px',
                padding: '30px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Typography
                variant="h3"
                gutterBottom
                sx={{ fontFamily: 'Outfit, sans-serif', fontWeight: 'bold' }}
            >
                BrainDigit
            </Typography>
            <Typography
                variant="body1"
                gutterBottom
                sx={{ fontFamily: 'Outfit, sans-serif', fontWeight: '' }}
            >
                Test your memory and recall digits shown on the screen!
            </Typography>

            <Button
                component={Link}
                to="/settings"
                variant="contained"
                color="#3d5afe"
                sx={{
                    mt: 3,
                    fontWeight: 'bold',
                    backgroundColor: '#3d5afe',
                    color: '#fff', // Ensures text is visible on the custom background
                    '&:hover': {
                        backgroundColor: '#3246e3', // Optional: lighter shade for hover
                    },
                }}
                endIcon={< SendIcon />}
            >
                Go
            </Button>

        </Box >
    );
}

export default WelcomePage;
