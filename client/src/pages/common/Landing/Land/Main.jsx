import React  from 'react';
import { Link } from 'react-router-dom';
import image from '../../../../assets/pic1.png';
import'./Main.css';
import Navbar from './Navbar';



const Main = () => {
    return (
        <div className='home-page'>
        <div className='content-area'>
            <div className='content-wrapper'>
                <Navbar />
                <div className='content-section'>
                    <h2>Wisdom in Waves:</h2>
                    <h3>Dive into Quizzes</h3>
                    <p>Explore the realm of knowledge at Quizify.</p>
                    <p>Quizzes that entertain, challenge, and enlighten</p>
<<<<<<< HEAD
                    <a href="/login" id='start-button' class='button'>Get Started</a>

=======
                    <button id='button' type='button'><a href="/login">Get Started</a></button>
>>>>>>> 89d5cb46f7adf0719da8a4505baabab4be2ff45c
                </div>
                <div className='visual-content'>
                    <img src={image} alt='front pic' height={400} />
                </div>
            </div>
        </div>
    </div>
    







    );
}
export default Main;