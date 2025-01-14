import React, { useState, useEffect } from 'react';
import signUpRequest from '../api/signUpRequest';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useCookies, Cookies } from 'react-cookie';

export const SignUp = () => {
  // useState to update and track the input fields from the signup page
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [userRole, setuserRole] = useState('');
  const [error, setError] = useState('');
  // const [cookies, setCookie] = useCookies(['ID']);
  const navigate = useNavigate();
  // console.log('Cookie value?', cookies.load('ID'));


  // handle form submission 
  const handleSignUp = async (e) => {
    e.preventDefault();
    // setCookie("logged in", firstName);
    // console.log('cookie?', setCookie("firstName"));
    try {
      const response = await axios.post('/api/users/signup', { firstName, lastName, password, userRole, email })
      console.log('signup test ', response)
      if (response) navigate('/dashboard', { state: { userId: response.data.id } });
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div className='flex flex-col h-screen w-screen items-center justify-center'>
      {/* display error message if error */}
      <div>{error}</div>
      {/* useState to track the data in each input field */}
      <form className='flex flex-col justify-items-center items-center' onSubmit={handleSignUp}>
        <input
          type='email'
          placeholder='Email:'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          placeholder='Password:'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type='text'
          placeholder='First Name:'
          value={firstName}
          onChange={(e) => setfirstName(e.target.value)}
        />
        <input
          type='text'
          placeholder='Last Name:'
          value={lastName}
          onChange={(e) => setlastName(e.target.value)}
        />
        <input
          type='text'
          placeholder='User Role:'
          value={userRole}
          onChange={(e) => setuserRole(e.target.value)}
        />
        <button>Sign Up</button>
      </form>
      <div>
        Have an account already? <br />
        <Link to="/login" className='text-tertiary-500 underline'>
          Login right here!
        </Link>
      </div>
    </div>
  );
};
