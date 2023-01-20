import React, { useState } from 'react';
import Home from './Home.jsx';
import { Login } from './Login.jsx';
import { SignUp } from './SignUp.jsx';
import Dashboard from './Dashboard.jsx';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { GiOstrich } from 'react-icons/gi';
import Logo from '../Images/HATCH.png';
import axios from 'axios';

const Navbar = () => {
  const [selectedPage, setSelectedPage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState();
  const navigate = useNavigate();

  // error navigating from home to dashboard
  console.log('selected page: ', selectedPage);
  console.log('FROM NAV BAR userId: ', userId);
  const handleDashNav = async (e, destination) => {
    e.preventDefault();
    try {
      console.log('button clicked');
      const response = await axios.get('/api/verify');
      console.log('response.status ', response.status);
      console.log('response is ', response);
      if (response.statusText === 'OK') {
        setSelectedPage(`${destination}`);
        setUserId(response.data);
        if (destination === 'dashboard') {
          navigate('dashboard', { state: { userId: response.data, setIsLoggedIn: setIsLoggedIn } });
        }
        else {
          navigate('/', { state: { userId: response.data, setIsLoggedIn: setIsLoggedIn } });
        }
      }
    } catch (err) {
      navigate('/login');
      console.log('err: ', err);
    }
  }



  return (
    <>
      <nav className="fixed w-screen bg-secondary-500 h-[80px] z-10 drop-shadow-xl">
        <div className="flex justify-between w-full h-full px-20">
          <div className="flex items-center gap-10">
            <h1 alt="logo" onClick={() => navigate('/')} className="cursor-pointer text-4xl text-secondary-200">< GiOstrich /></h1>
            {/* <img alt="logo" onClick={() => navigate('/')} className="cursor-pointer h-25 w-25" src={Logo}></img> */}
            <Link
              to="/"
              onClick={() => setSelectedPage('home')}
            />

            <a href='' onClick={(e) => handleDashNav(e, '')}
              className={`${selectedPage === 'home'
                ? 'text-tertiary-500'
                : 'text-primary-500'
                } hover:text-opacity-75`}>

              Home
            </a>
            {/* <Link
              to="/dashboard"
              onClick={() => setSelectedPage('dashboard')}
            >
              Dashboard
            </Link> */}
            <a className="text-primary-500 hover:text-opacity-75" href='' onClick={(e) => handleDashNav(e, 'dashboard')}>Dashboard</a>
          </div>
          <div className="flex items-center gap-10">
            {/* Logout Button: need to clear cookies on logout and set isLogged to false */}
            {isLoggedIn && <Link to="/login">
              <button className="bg-primary-500 text-secondary-500">
                Logout
              </button>
            </Link>}
            {!isLoggedIn && <Link to="/login">
              <button className="bg-primary-500 text-secondary-500">
                Login
              </button>
            </Link>}
            {!isLoggedIn && (<Link to="/signup">
              <button>Become a Member</button>
            </Link>)}
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userId={userId} />} />
        <Route path="/dashboard" element={<Dashboard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userId={userId} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
};

export default Navbar;
