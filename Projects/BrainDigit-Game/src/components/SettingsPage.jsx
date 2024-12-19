import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Button,
    FormControl,
    MenuItem,
    Select,
    Stack,
} from '@mui/material';
import PlayCircleOutlineRoundedIcon from '@mui/icons-material/PlayCircleOutlineRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

function SettingsPage() {
    const [digits, setDigits] = useState(3);
    const [digitType, setDigitType] = useState('single');
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                background: '#fff',
                borderRadius: '20px',
                padding: '20px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                width: { xs: '90%', sm: '400px' },
                textAlign: 'center',
                mx: 'auto', // Centers horizontally
                mt: { xs: 4, sm: 8 }, // Top margin for spacing
            }}
        >
            {/* Settings Title */}
            <Typography
                variant="h5"
                sx={{
                    fontWeight: 'bold',
                    mb: 4,
                    fontSize: { xs: '1.5rem', sm: '1.8rem' },
                }}
            >
                Settings
            </Typography>

            <Stack spacing={3}>
                {/* Number of Digits Dropdown */}
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography
                        sx={{
                            textAlign: 'left',
                            fontWeight: 'bold',
                            minWidth: { xs: '140px', sm: '160px' },
                        }}
                    >
                        Number of Digits
                    </Typography>
                    <FormControl fullWidth>
                        <Select
                            value={digits}
                            onChange={(e) => setDigits(e.target.value)}
                            variant="outlined"
                            displayEmpty
                            sx={{
                                '& .MuiSelect-select': { padding: '10px' },
                                borderRadius: '8px',
                                background: '#f5f5f5',
                            }}
                        >
                            {[1, 2, 3, 4, 5, 6].map((num) => (
                                <MenuItem key={num} value={num}>
                                    {num}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>

                {/* Digit Type Dropdown */}
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography
                        sx={{
                            textAlign: 'left',
                            fontWeight: 'bold',
                            minWidth: { xs: '140px', sm: '160px' },
                        }}
                    >
                        Digit Type
                    </Typography>
                    <FormControl fullWidth>
                        <Select
                            value={digitType}
                            onChange={(e) => setDigitType(e.target.value)}
                            variant="outlined"
                            displayEmpty
                            sx={{
                                '& .MuiSelect-select': { padding: '10px' },
                                borderRadius: '8px',
                                background: '#f5f5f5',
                            }}
                        >
                            <MenuItem value="single">Single</MenuItem>
                            <MenuItem value="double">Double</MenuItem>
                            <MenuItem value="triple">Triple</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
            </Stack>

            <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
                {/* Back Button */}
                <Button
                    variant="outlined"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        borderColor: '#651fff',
                        color: '#651fff',
                        '&:hover': {
                            borderColor: '#4a148c',
                            backgroundColor: '#f3e5f5',
                        },
                    }}
                    onClick={() => navigate(-1)}
                    startIcon={<ArrowBackRoundedIcon />}
                >
                    
                </Button>

                {/* Start Button */}
                <Button
                    variant="contained"
                    fullWidth
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textTransform: 'none',
                        fontWeight: 'bold',
                        backgroundColor: '#ef6c00',
                        color: '#fff',
                        '&:hover': {
                            backgroundColor: '#e65100',
                        },
                    }}
                    onClick={() =>
                        navigate('/game', { state: { digits, digitType } })
                    }
                    endIcon={<PlayCircleOutlineRoundedIcon />}
                >
                    Start
                </Button>
            </Stack>
        </Box>
    );
}

export default SettingsPage;
