import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

const DynamicSEO = () => {
  const [city, setCity] = useState('Odisha'); // Default fallback

  useEffect(() => {
    // 1. Fetch user's IP location
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        // Only update if they are actually in Odisha to avoid weird results
        if (data.city && data.region_code === 'OR') {
          setCity(data.city);
        }
      })
      .catch(err => console.error("Location check failed", err));
  }, []);

  return (
    <Helmet>
      {/* Dynamic Title showing User's City */}
      <title>Wedding Photography & Flex Print in {city} | MoGraphics</title>
      
      {/* Dynamic Description */}
      <meta 
        name="description" 
        content={`Looking for premium video editing, flex printing, or photography in ${city}? MoGraphics offers the best creative services in ${city} and nearby areas.`} 
      />
    </Helmet>
  );
};

export default DynamicSEO;