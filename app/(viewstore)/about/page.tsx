"use client";
// components/About.tsx
import React from 'react';
import { Container, Box, Typography, Card, CardContent } from '@mui/material';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const About = () => {
  return (
    <Container maxWidth="lg" className="py-10">
      <Box className="text-center mb-8">
        <Typography variant="h3" component="h1" className="mb-2">
          About Us
        </Typography>
        <Typography variant="body1" className="text-gray-600">
          Learn more about our company and our mission.
        </Typography>
      </Box>
      
      <Box className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="shadow-md">
          <CardContent className="flex flex-col items-center">
            <FiMail size={50} className="text-blue-500 mb-4" />
            <Typography variant="h6" component="h2" className="mb-2">
              Email Us
            </Typography>
            <Typography variant="body2" className="text-gray-600">
              info@example.com
            </Typography>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardContent className="flex flex-col items-center">
            <FiPhone size={50} className="text-blue-500 mb-4" />
            <Typography variant="h6" component="h2" className="mb-2">
              Call Us
            </Typography>
            <Typography variant="body2" className="text-gray-600">
              +1 234 567 890
            </Typography>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardContent className="flex flex-col items-center">
            <FiMapPin size={50} className="text-blue-500 mb-4" />
            <Typography variant="h6" component="h2" className="mb-2">
              Visit Us
            </Typography>
            <Typography variant="body2" className="text-gray-600">
              123 Main Street, Anytown, USA
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Box className="mt-12 text-center">
        <Typography variant="h5" component="h3" className="mb-4">
          Our Mission
        </Typography>
        <Typography variant="body1" className="text-gray-600 max-w-2xl mx-auto">
          Our mission is to deliver the best products and services to our customers, ensuring their satisfaction and success. We strive for excellence in everything we do and are committed to continuous improvement and innovation.
        </Typography>
      </Box>
    </Container>
  );
};

export default About;
