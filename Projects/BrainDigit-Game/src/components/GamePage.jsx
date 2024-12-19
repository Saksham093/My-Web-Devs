// GamePage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, CircularProgress, Stack } from '@mui/material';

// Beep sound file (use any beep sound file URL or local path)
const beepSoundUrl = '/sounds/censor-beep-88052.mp3';

function GamePage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { digits } = state;
  const [phase, setPhase] = useState('GettingReady'); // 'GettingReady', 'ShowDigits'
  const [dots, setDots] = useState(''); // To handle blinking dots
  const [currentDigit, setCurrentDigit] = useState(null);
  const [shownDigits, setShownDigits] = useState([]);
  const [effectClass, setEffectClass] = useState(''); // For CSS effects

  useEffect(() => {
    // Function to generate numbers based on digitType
    const generateNumbers = (length, type) => {
      if (type === 'single') {
        return Array.from({ length }, () => Math.floor(Math.random() * 10)); // Single-digit numbers
      } else if (type === 'double') {
        return Array.from({ length }, () =>
          Math.floor(Math.random() * 90) + 10 // Double-digit numbers (10-99)
        );
      } else if (type === 'triple') {
        return Array.from({ length }, () =>
          Math.floor(Math.random() * 900) + 100 // Triple-digit numbers (100-999)
        );
      }
    };
    const generatedDigits = generateNumbers(digits, state.digitType);
    setShownDigits(generatedDigits);

    // Blinking dots logic
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
    }, 500);

    // Transition from "Getting Ready..." to showing digits
    const readyTimeout = setTimeout(() => {
      clearInterval(dotsInterval); // Stop blinking dots
      setPhase('ShowDigits'); // Transition to showing digits
      startNumberDisplay();
    }, 3000); // Show "Getting Ready..." for 3 seconds

    const startNumberDisplay = () => {
      let index = 0;
      const digitInterval = setInterval(() => {
        if (index < generatedDigits.length) {
          // Play beep sound
          const beep = new Audio(beepSoundUrl);
          beep.play();

          // Show digit with effect
          setCurrentDigit(generatedDigits[index]);
          setEffectClass('digit-effect'); // Add effect class
          setTimeout(() => setEffectClass(''), 500); // Remove effect after animation
          index++;
        } else {
          clearInterval(digitInterval);
          navigate('/result', { state: { generatedDigits } });
        }
      }, 1000);
    };

    return () => {
      clearTimeout(readyTimeout);
      clearInterval(dotsInterval);
    };
  }, [digits, navigate]);

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
        mx: 'auto', // Center horizontally
        mt: { xs: 4, sm: 8 }, // Adjust top margin based on screen size
      }}
    >
      {phase === 'GettingReady' ? (
        <Stack spacing={2} direction="column" alignItems="center">
          <CircularProgress size="3rem" />
          <Typography
            variant="h5"
            sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }}
          >
            Getting Ready{dots}
          </Typography>
        </Stack>
      ) : (
        <Typography
          variant="h1"
          className={effectClass} // Apply effect class
          sx={{
            fontSize: { xs: '3rem', sm: '5rem' },
            transition: 'transform 0.5s, opacity 0.5s',
          }}
        >
          {currentDigit}
        </Typography>
      )}
    </Box>
  );
}

export default GamePage;
