import React, { useEffect } from 'react';
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
        }, 100); 
      }
    }
  }, [hash]);

  return (
    <>
      <MahalaxmiHero />

        <div id="shop-collection">
        <MahalaxmiCategories />
      </div>
      
      {/* [NEW] ଏଠାରେ ଗୋଟିଏ ID ଦିଆଗଲା */}
      <div id="shop-department">
          <ShopByDepartment />
      </div>

    
      <ProductShowcase />   
    </>
  )
}

export default Home;