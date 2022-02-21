import React from 'react';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Cars from './Cars.js'

const Showroom = () =>(
    <div>
        <br></br>
        <Container><Jumbotron className="center">
            <h1>Inventory</h1>
            <h3>Current vehicles we have for sale.</h3>
            </Jumbotron>
            <Row>
                <Col className=""><Cars></Cars></Col>
            </Row>
        </Container>
    </div>
);


export default Showroom; 