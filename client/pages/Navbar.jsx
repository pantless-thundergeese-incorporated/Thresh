import React, { useState } from 'react';
import Home from './Home.jsx';
import { Login }  from './Login.jsx';
import { SignUp } from './SignUp.jsx';
import Dashboard from './Dashboard.jsx';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { GiOstrich } from 'react-icons/gi';
import Logo from '../Images/HATCH.png';

const Navbar = () => {
  const [selectedPage, setSelectedPage] = useState('');
  const navigate = useNavigate();

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
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              onClick={() => setSelectedPage('dashboard')}
            >
              Dashboard
            </Link>
          </div>
          <div className="flex items-center gap-10">
            <Link to="/login">
              <button className="bg-primary-500 text-secondary-500">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button>Become a Member</button>
            </Link>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
};

export default Navbar;
