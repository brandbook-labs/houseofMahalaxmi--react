import React from 'react'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MahalaxmiHero from '../components/Hero/Hero';
import ProductShowcase from '../components/Products/PopularItems';
import MahalaxmiCategories from '../components/Common/Categories';
import ShopByDepartment from '../components/Common/CategoriesMenWomen';

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
      <MahalaxmiHero />
      <ShopByDepartment />
      <MahalaxmiCategories />
      <ProductShowcase />   
    </>
  )
}

export default Home
