import React  from 'react';
import { Link } from 'react-router-dom';
import image from '../../../../assets/pic1.png';
import'./Main.css';
import Navbar from './Navbar';



const Main = () => {
    return (
        <div className='page1'>
            <div className='main-content'>
            <div className='main'>
                <Navbar />
                <div className='contentMain'>
                    <h2>Wisdom in Waves:</h2>
                    <h3>Dive into Quizzes</h3>
                    <p>Explore the realm of knowledge at Quizify.</p>
                    <p>Quizzes that entertain, challenge, and enlighten</p>
                    <button id='button' type='button'><a href="/login">Get Started</a></button>
                </div>
                <div className='image'>
                    <img src={image} alt='front pic' height={400} />
                </div>
            </div>
            </div>
        </div>







    );
}
export default Main;