import React, {Component, useState} from 'react';
import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import ImageSlider from './imageSlider.js';
import {ClipboardData, HandIndexThumb} from 'react-bootstrap-icons';


const CarTile = (props) =>(

<div className="carTile">
        <Row>
            <Col lg={4}><a href={"/car/" + props.car.listingID} className="tileCar"><ImageSlider vehicle={props.car.listingID}></ImageSlider></a></Col>
            <Col className="frontcarTileText">
                <Row>
                    <Col className="center">
                        <h1><a href={"/car/" + props.car.listingID} className="tileCar">{props.car.year} {props.car.make} {props.car.model}</a></h1>
                    </Col>
                </Row>
                <Row className="frontmilesPrice">
                    <Col> ${props.car.price.toLocaleString()}</Col>
                    <Col> {props.car.miles.toLocaleString()} Miles</Col>
                </Row>
                <br></br>
                <Row xs={1} lg={2}>
                    <Col><div className="frontvhReport"><a href={"/car/" + props.car.listingID}><Button variant="primary" block><HandIndexThumb size={25}></HandIndexThumb> View Vehicle</Button></a></div></Col>
                    {props.car.historyReportURL ?<Col><div className="frontvhReport"><a href={props.car.historyReportURL}><Button variant="primary" block><ClipboardData size={25}></ClipboardData>History Report</Button></a></div></Col>:null}
                </Row>   
            </Col>
        </Row>    
    </div>

);


export default CarTile; 