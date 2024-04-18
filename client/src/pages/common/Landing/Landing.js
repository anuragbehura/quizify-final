import React from 'react'
import '../Landing/utils/index.css'
import Main from './utils/Main';
import Slider from './utils/Slider';
import Section from './utils/Section';
import Footer from './utils/Footer';

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