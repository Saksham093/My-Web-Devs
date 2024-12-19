// ResultPage.jsx
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Stack, Grid, TextField } from '@mui/material';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import { styled } from '@mui/system';

// Custom styled TextField for OTP input
const OtpInput = styled(TextField)(({ theme }) => ({
  '& input': {
    textAlign: 'center',
    fontSize: '1.2rem',
    padding: '10px',
    width: '50px',
  },
  '& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button': {
    '-webkit-appearance': 'none',
    margin: 0,
  },
  '& input[type=number]': {
    MozAppearance: 'textfield',
  },
}));

function ResultPage() {
  const { state } = useLocation();
  const { generatedDigits } = state;
  const [userInput, setUserInput] = useState(new Array(generatedDigits.length).fill(''));
  const navigate = useNavigate();

  const handleSubmit = () => {
    const matches = generatedDigits.filter((digit, index) => digit === Number(userInput[index]));
    const result = matches.length;
    navigate('/submit', { state: { result, totalDigits: generatedDigits.length } });
  };

  return (
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
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontFamily: 'Outfit, sans-serif',
          fontWeight: 'bold',
          fontSize: { xs: '1.5rem', sm: '1.8rem' },
        }}
      >
        Enter the Digits
      </Typography>

      {/* OTP Input Fields */}
      <Grid
        container
        spacing={2}
        justifyContent="center"
        sx={{ mt: 2, mb: 2 }}
      >
        {generatedDigits.map((_, index) => (
          <Grid item key={index}>
            <OtpInput
              type="number"
              value={userInput[index]}
              onChange={(e) => {
                const newInput = [...userInput];
                newInput[index] = e.target.value.slice(-1); // Only keep the last digit
                setUserInput(newInput);
              }}
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            />
          </Grid>
        ))}
      </Grid>

      {/* Buttons */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{ mt: 4, width: '100%' }}
      >
        <Button
          variant="outlined"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            borderColor: '#651fff',
            color: '#651fff',
            width: { xs: '100%', sm: 'auto' },
          }}
          onClick={() => navigate(-1)}
          startIcon={<HistoryRoundedIcon />}
        >
          Replay
        </Button>

        <Button
          component={Link}
          to="/settings"
          variant="contained"
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
            width: { xs: '100%', sm: 'auto' },
          }}
          endIcon={<SettingsSuggestRoundedIcon />}
        >
          Reset
        </Button>

        <Button
          variant="contained"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textTransform: 'none',
            fontWeight: 'bold',
            backgroundColor: '#3d5afe',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#3246e3',
            },
            width: { xs: '100%', sm: 'auto' },
          }}
          onClick={handleSubmit}
          endIcon={<TaskAltRoundedIcon />}
        >
          Submit
        </Button>
      </Stack>
    </Box>
  );
}

export default ResultPage;
