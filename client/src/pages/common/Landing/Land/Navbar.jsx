import axios from 'axios';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './Navbar.css'

axios.defaults.withCredentials = true;

const Navbar = () => {

  return (
    <div className="header-nav">
      <div className='heading'>
        <h1>Quizify</h1>
      </div>
      <nav className="navigation">
        <ul>
          <li><Link className='txt' to='/about'>About</Link></li>
          <li><Link className='txt' to='/register'>Sign up</Link></li>
          <li><Link className='txt' to='/login'>Log in</Link></li>
        </ul>
      </nav>
    </div>
  );
}
export default Navbar;
