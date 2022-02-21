import React from 'react';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import FeaturedCars from './FeautredCars.js';
import ContactContainer from './ContactContainer.js';
import HomeSlides from './HomeSlides';


const Home = () =>(
    <div>
        <HomeSlides></HomeSlides>
        <Container><hr></hr></Container>
        <FeaturedCars></FeaturedCars>
        <Container><hr></hr></Container>
        <ContactContainer></ContactContainer>
      </div>
);


export default Home; 