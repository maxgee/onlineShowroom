import React from 'react';
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import serviceIMG from '../imgs/service.jpg';
import BMW from '../imgs/BMW.jpg';
import hybrid from '../imgs/hybrid.jpg';


const HomeSlides = () =>(
    <div>
        <Container>
          <br></br>
        <Carousel 
                className="carouselIMG">
            <Carousel.Item variant="dark" >
              <img
                className="d-block w-100"
                src={hybrid}
                alt="Hybrid"
                className="carouselIMG"

              />
              <Carousel.Caption className="carouselCaption">
                <h3 className="darkText">Toyota Hybrids</h3>
                <p className="darkText">The most trusted source for hybrid vehicles in NWA!</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={BMW}
                alt="BMW"
                className="carouselIMG"
              />

              <Carousel.Caption className="carouselCaption">
                <h3>European cars</h3>
                <p>Buy a european from someone that works and specializes in them.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={serviceIMG}
                alt="Serice"
                className="carouselIMG"
              />

              <Carousel.Caption className="carouselCaption">
                <h3>Service</h3>
                <p>We work on all vehiles but specialize in prius hybrids, BMWs,Audis!</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Container>
    </div>
);


export default HomeSlides; 