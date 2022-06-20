import React from 'react';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import { Link } from 'react-router-dom';
import Services from '../components/Services';
import Footer from '../components/Footer';

function LandingScreen() {
  return (
    <>
    <Hero hero="defaultHero">
    </Hero>
    <Banner title="Luxurious Rooms" subtitle="deluxe rooms starting at 300$">
            <Link to="/home" className="btn btn-primary">
                  Our Rooms
            </Link>
    </Banner>
    <Services/> 
    <Footer/>
    </>
  )
}

export default LandingScreen