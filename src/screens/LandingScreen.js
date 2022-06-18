import React from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
AOS.init({
  duration: 2000
});

function LandingScreen() {
  return (
    <div className='row landing justify-content-center'>
        <div className='col-md-9 my-auto text-center' style={{borderRight: '8px solid #19192f'}}>
            <h2 data-aos='zoom-in' style={{color: '#19192f', fontSize: '130px'}}>T&THotel</h2>
            <h1 data-aos='zoom-out' style={{color: '#19192f'}}>There is only one boss. The Guest.</h1>

            <Link to='/home'>
            <button className='btn landing-btn'  >Get Started</button>
            </Link>
        </div>
    </div>
  )
}

export default LandingScreen