import React from 'react';
import { useLocation } from 'react-router-dom';
import HomePage from '../Images/HomePage.png';
import HomePageText from '../Images/HomePageText.png';

export const Home = (props) => {
  const location = useLocation();
  // const { userId } = location.state;

  // console.log('Home userId: ', { userId });
  return (
    <div className="w-screen h-screen flex items-center justify-center gap-20">
      <img alt="home-page-text" src={HomePageText} className="mt-40" />
      <img alt="home-page-graphic" src={HomePage} className="mt-10" />
    </div>
  );
};

export default Home;
