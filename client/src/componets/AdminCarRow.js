import React, {Component, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Contact from './Contact.js';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import ImageSlider from './imageSlider.js';
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';
 
const DaysonMarketButton = (listingDate)=>{
        const orginalDate = new Date(listingDate);
        const todaysDate = new Date()
        const Difference_In_Time = todaysDate.getTime() - orginalDate.getTime();
        const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        const DaysonMarket = Math.round(Difference_In_Days)
        let ButtonColor = "danger"
        if(DaysonMarket >= 60){
            ButtonColor = "danger"
        }else if (DaysonMarket <= 59 && DaysonMarket >= 30 ){
            ButtonColor = "warning"
        }else{
            ButtonColor = "success"
        }
        return (<Button variant={ButtonColor} className="daysOnMarket">
        Days on Market: <Badge variant="light">{DaysonMarket}</Badge>
        </Button>)
};
const Car = (props) =>(
    <div className="AdminCarShow">
        <Row>
            <Col lg={4}><ImageSlider vehicle={props.car.listingID}></ImageSlider></Col>
            <Col>
            {DaysonMarketButton(props.car.listingDate)}
            <div className="adminRowText">
                <Row className="center">
                    <Col>
                        <h1 className="yearMakeModel">{props.car.year} {props.car.make} {props.car.model}</h1>
                    </Col>
                </Row>
                <br></br>
                <br></br>
                <Row className="milesPrice">
                    <Col>{props.car.miles.toLocaleString()} Miles</Col>
                    <Col>${props.car.price.toLocaleString()}</Col>
                </Row>
                <Row className="vinStock">
                    <Col>VIN: {props.car.vinNumber}</Col>
                    <Col>SN: {props.car.stockNumber}</Col>
                </Row>    
                </div>
            </Col>
        </Row>
        <Row noGutters>
                    <Col className="carButtons"><Link to={'../car/'+props.car.listingID}><Button variant="primary" block>View</Button></Link></Col>
                    <Col className="carButtons"><Link to={'/admin/updateCar/'+props.car.listingID}><Button variant="warning" block>Update</Button></Link></Col>
                    <Col className="carButtons"><Button variant="success" onClick={()=> {props.sellCar()}}  block>Sell</Button></Col>
                    <Col className="carButtons"><Button variant="danger" block onClick={()=> {props.deleteCar()}} >Delete</Button></Col>
        </Row>        
    </div>

);


export default Car; 