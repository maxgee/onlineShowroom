import React from 'react';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Contact from './Contact.js';
import BMW from '../imgs/BMW.jpg';


const Service = () =>(
    <div>
        <br></br>
        <Container>
            <Jumbotron className="center">
            <h1>Vehicle Service</h1>
            </Jumbotron>
            <div className="servcieContainer">
                <h2>Toyota Hybrid Systems</h2>
                <p>Along with selling cars at Seventy-1 Auto we do also work on and service select cars.
                We specialize working on and servicing Toyota Hybrid systems.
                    <ul>
                        <li>Brake Pumps</li>
                        <li>Third Generation Head Gaskets</li>
                        <li>Disgnonsing Faults in Hyrbid Systems</li>
                        <li>Repairing Hybrid Batteies</li>
                        <li>Oil Comsumption Repairs</li>
                        <li>Engine Swaps and Rebuilds</li>
                        <li>General Maintnence</li>
                    </ul>
                </p>
                <h2>European Vehicles</h2>
                <p>We don't only specilize in Toyota Hybrid Systems. We also have a extensive amount of experience with european vehicles such as BMW's, Audi's, and Volkswagens.
                    <h4>BMW's</h4>
                    <img src={BMW} className="serviceIMGPage"/>
                        <ul>
                            <li>Diagnonsing Oil Leaks</li>
                            <li>Valve Cover Gaskets</li>
                            <li>Oil FIlter Housing Gasets</li>
                            <li>High Pressure FUel Systems</li>
                            <li>Failed Fuel Injectos</li>
                            <li>Rough shifting in Z6HP Automtic transmissions</li>
                            <li>Genral Maintnence</li>
                        </ul>

                    <h4>Volkswagen and Audi's</h4>
                        <ul>
                            <li>Timing Chains</li>
                            <li>Intake Manifolds</li>
                            <li>Intake Runners</li>
                            <li>PCV Systems</li>
                            <li>Vaucuum Systems</li>
                            <li>High Pressure Fuel Systems</li>
                        </ul>
                </p>
                <h2>General Maintnence</h2>
                <p>We can also do general maintence on most vehicles besides what we specialize in. If you are in need of general maintence for your vehicle such as oil changes, brake work,plugs and coils, cooling systems, or fulid refils and flushes we can most likely handle it.  </p>
            </div>
            <Contact></Contact>
        </Container>
    </div>
);


export default Service; 