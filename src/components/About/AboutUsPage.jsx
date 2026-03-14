import React from 'react'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AboutUsHero from './AboutUsPageHero';
import LeadershipTeam from './AboutUsPage_Leaders';
import PartnersSection from './AboutUsPage_Partners';
import VisionMission from './AboutUsPage_Vision';



function AboutUsPage() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100); // wait for the DOM to load
      }
    }
  }, [hash]);
  return (
    <>
      
    <AboutUsHero />
    <LeadershipTeam />
    <PartnersSection />
    <VisionMission />
    
     
    </>
  )
}

export default AboutUsPage
