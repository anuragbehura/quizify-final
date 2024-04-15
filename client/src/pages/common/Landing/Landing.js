import React from 'react'
import '../Landing/Land/index.css'
import Main from './Land/Main';
import Slider from './Land/Slider';
import Section from './Land/Section';
import Footer from './Land/Footer';

function Landing() {
  return(
    <div className='landing'>
        <Main />
        <Slider/>
        <Section/>
        <Footer/>
    </div>
);
}

export default Landing