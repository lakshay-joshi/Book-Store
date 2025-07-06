import React from 'react'
import Banner from './banner';
import Topsellers from './topsellers';
import Recommended from './recommended';
import News from './news';

const Home = () => {
  return (
    <>
    <Banner></Banner>
    <Topsellers></Topsellers>
    <Recommended></Recommended>
    <News></News>
    </>
  )
}

export default Home;
