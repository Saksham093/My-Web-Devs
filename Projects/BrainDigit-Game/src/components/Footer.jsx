// Footer.jsx
import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { GitHub, X } from '@mui/icons-material';

function Footer() {
  const isMobile = window.innerWidth <= 768;

  return (
    <Box
      sx={{
        width: '100vw', // Full viewport width
        display: 'flex',
        justifyContent: 'space-between', // Align items in a row
        alignItems: 'center',
        padding: '10px 20px', // Space around content
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Transparent effect
        backdropFilter: 'blur(10px)', // Frosted glass effect
        position: 'fixed', // Fixed at the bottom of the screen
        bottom: 0,
        left: 0,
        borderTop: '1px solid rgba(255, 255, 255, 0.2)', // Subtle border
        zIndex: 1000, // Ensures it stays above other content
        boxSizing: 'border-box', // Prevents overflow
      }}
    >
      {/* Left: Logo for Mobile View */}
      {isMobile ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <img
            src="/images/BG_SAKSHAM.png"
            alt="Logo"
            style={{
              height: 30,
            }}
          />
        </Box>
      ) : (
        <Typography
          variant="body2"
          sx={{
            fontFamily: 'Outfit, sans-serif',
          }}
        >
          &copy; 2024 Digit Recall. All rights reserved.
        </Typography>
      )}

      {/* Center: Made With Text for Non-Mobile View */}
      {!isMobile && (
        <Typography
          variant="body2"
          sx={{
            fontFamily: 'Outfit, sans-serif',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Made with <span style={{ color: 'red', fontSize: '16px', marginLeft: 4 }}>❤️</span> from <span style={{ color: 'blue', fontSize: '16px', marginLeft: 4 }}>🇮🇳</span>
        </Typography>
      )}

      {/* Right: Icons */}
      <Box sx={{ display: 'flex', gap: 1 }}> {/* Add gap */}
        <IconButton
          component="a"
          href="https://github.com/Saksham093" // Replace with GitHub profile link
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: '#333' }}
        >
          <GitHub />
        </IconButton>
        <IconButton
          component="a"
          href="https://twitter.com/M_Saksham093" // Replace with X/Twitter profile link
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: 'black' }}
        >
          <X />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Footer;
