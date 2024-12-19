// SubmitPage.jsx
import React, { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';

function SubmitPage() {
    const { state } = useLocation();
    const { result, totalDigits } = state || {};
    const navigate = useNavigate();

    useEffect(() => {
        if (result === null || totalDigits === null) {
            navigate('/'); // Redirect to home if no data is passed
        }
    }, [result, totalDigits, navigate]);

    return (
        <>
            {/* Full-Screen Confetti Effect */}
            {result === totalDigits && (
                <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    recycle={true}
                />
            )}

            <Box
                sx={{
                    background: 'white',
                    borderRadius: '20px',
                    padding: '20px',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    width: { xs: '90%', sm: '400px' },
                    height: 'auto',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mx: 'auto',
                    mt: { xs: 4, sm: 8 },
                    position: 'relative',
                }}
            >
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                        fontFamily: 'Outfit, sans-serif',
                        fontWeight: 'bold',
                        fontSize: { xs: '1.8rem', sm: '2.2rem' },
                    }}
                >
                    {result === totalDigits ? '🎉 Congratulations! 🎉' : 'Results'}
                </Typography>

                <Typography
                    variant="h6"
                    sx={{
                        mt: 2,
                        fontFamily: 'Outfit, sans-serif',
                        fontWeight: 'normal',
                        fontSize: { xs: '1.2rem', sm: '1.5rem' },
                    }}
                >
                    You matched <strong>{result}</strong> out of <strong>{totalDigits}</strong> digits correctly!
                </Typography>

                {result === totalDigits && (
                    <Typography
                        variant="body1"
                        sx={{
                            mt: 2,
                            color: 'green',
                            fontFamily: 'Outfit, sans-serif',
                            fontWeight: 'bold',
                            fontSize: { xs: '1rem', sm: '1.2rem' },
                        }}
                    >
                        Perfect score! Well done!
                    </Typography>
                )}

                <Button
                    variant="contained"
                    sx={{
                        mt: 4,
                        textTransform: 'none',
                        fontWeight: 'bold',
                        backgroundColor: '#3d5afe',
                        color: '#fff',
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                        '&:hover': {
                            backgroundColor: '#3246e3',
                        },
                        width: { xs: '100%', sm: 'auto' },
                        px: { xs: 3, sm: 4 },
                    }}
                    onClick={() => navigate('/')}
                >
                    Go to Home
                </Button>
            </Box>
        </>
    );
}

export default SubmitPage;
