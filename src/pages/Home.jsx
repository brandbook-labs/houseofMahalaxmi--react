import React from 'react'
import { About, CarbonStats, Card, Contact, Hero, Partnerships, Services, Subscriber, SustainableEnergy, Testimonials } from '../components'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AgencyHero from '../components/Hero/Hero';

import ServiceScroll from '../components/Common/Services';
import Manifesto from '../components/Common/Manifesto';
import MarqueeSection from '../components/Common/Maqueer';
import PartnerGrid from '../components/Partnerships/Partnerships';

import PopularProducts from '../components/Products/PopularItems';
import GoogleReviews from '../components/Common/CustomerReviews';

function Home() {
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
      <AgencyHero />
      <PopularProducts />
      <ServiceScroll />
      <PartnerGrid />
      <GoogleReviews />
      {/* <MarqueeSection /> */}
      <Manifesto />
   
    </>
  )
}

export default Home
