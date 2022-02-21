import React, {Component, useState} from 'react';
import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import ImageSlider from './imageSlider.js';


const CarTile = (props) =>(
    <Link to={"/car/" + props.car.listingID}>
<div className="carTile">
        <Card>
            <ImageSlider vehicle={props.car.listingID}></ImageSlider>
            <Card.Body>
                <Card.Title><h5 className="center">{props.car.year} {props.car.make} {props.car.model}</h5></Card.Title>
                <Card.Text><Row className="center"><Col>{props.car.miles.toLocaleString()} Miles</Col><Col>${props.car.price.toLocaleString()}</Col></Row></Card.Text>
                <Button variant="primary" block>View Vehicle</Button>
            </Card.Body>
        </Card>
    </div>
    </Link>
);


export default CarTile; 