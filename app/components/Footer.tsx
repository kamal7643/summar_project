"use client";
import { Box, Typography, Container, Link } from '@mui/material';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={{ bgcolor: '#000', color: '#fff', py: 3, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center">
          <Typography variant="body1" sx={{ mb: { xs: 2, sm: 0 } }}>
            &copy; {new Date().getFullYear()} Alpha Second. All rights reserved.
          </Typography>
          <Box>
            <Link href="/" color="inherit" underline="none" sx={{ mx: 1 }}>
              Home
            </Link>
            <Link href="/about" color="inherit" underline="none" sx={{ mx: 1 }}>
              About
            </Link>
            <Link href="/contact" color="inherit" underline="none" sx={{ mx: 1 }}>
              Contact
            </Link>
          </Box>
          <Box display="flex" alignItems="center" sx={{ mt: { xs: 2, sm: 0 } }}>
            <Link href="https://facebook.com" target="_blank" rel="noopener" sx={{ color: '#fff', mx: 1 }}>
              <FaFacebook />
            </Link>
            <Link href="https://twitter.com" target="_blank" rel="noopener" sx={{ color: '#fff', mx: 1 }}>
              <FaTwitter />
            </Link>
            <Link href="https://instagram.com" target="_blank" rel="noopener" sx={{ color: '#fff', mx: 1 }}>
              <FaInstagram />
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
