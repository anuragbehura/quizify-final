import React from 'react'
import './About.css'
import image from '../../../assets/118.png'
import img1 from '../../../assets/img1.JPG'
import img2 from '../../../assets/img2.jpg'
import img3 from '../../../assets/img3.jpg'
import img5 from '../../../assets/img5.jpg'


function About() {
  return (
    <div className='about'>
      <div className='about-container'>
        <h1>About Us</h1>
      </div>
      <div className='line-container'>
        <div className='line'></div>
      </div>
      <div className='about-content'>
        <img className='aboutImg' src={image} alt='about-img' height={350}></img>
        <p> We are the makers of Quizify, that is a quiz system that streamlines quiz creation and evaluation for educators while providing interactive learning experiences for students. With user-friendly features and real-time feedback, it enhances teaching and learning by facilitating customization and assessment,
          fostering engagement and progress tracking.</p>
      </div>
      <div className='about-section'>
        <h2>People behind it</h2>
        <div className='about-card'>
          <div className='card-content'>
            <img className='img1' src={img1} alt='img1' height={250}></img>
            <h1>Anurag Behura</h1>
            <h3>Backend developer</h3>
          </div>
          <div className='card-content'>
            <img className='img2' src={img2} alt='img2' height={250}></img>
            <h1>Pradipta Behera</h1>
            <h3>Frontend developer</h3>
          </div>
          <div className='card-content'>
            <img className='img3' src={img3} alt='img3' height={250}></img>
            <h1>Sourav Ku Mohanta</h1>
            <h3>Connectivity developer</h3>
          </div>
        </div>
      </div>
      <div className='guide-section'>
        <h2>Guided By</h2>
        <div className='guide-card'>
          <div className='guide-content'>
           <img className='img5' src={img5} alt='img5' height={250}></img>
           <h1>Dr. Mukesh Bathre Sir</h1>
           <h3>Head of the department</h3>
          </div>
          <div className='guide-content'>
           {/* <img className='img6' src={img6} alt='img6' height={250}></img> */}
           <h1>Devraj Sir</h1>
           <h3> Our Mentor</h3>
          </div>

        </div>

      </div>
    </div>
  )
}

export default About