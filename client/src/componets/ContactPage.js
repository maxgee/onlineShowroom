import React from 'react';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import {Row, Col} from 'react-bootstrap';
import GoogleMap from './GoogleMap.js'


const ContactPage = () =>(
    <div>
        <Container>
            <br></br>
            <Jumbotron className="center">
            <Row xs={1} lg={2}>
                <Col className="contactAddress">
                <h2>Seventy-1 Auto</h2>
                <h3>(501) 366-3863</h3>
                <h3>13515 AR-16</h3>
                <h3>Fayetteville, AR</h3>
                </Col>
                <Col className="contactJumbo">
               <GoogleMap></GoogleMap>
                </Col>
            </Row>
            </Jumbotron>
        </Container>
    </div>
);


export default ContactPage; 