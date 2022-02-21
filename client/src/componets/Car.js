import React, {Component} from 'react';
import Axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Contact from './Contact.js';
import {withRouter, Link } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import ImageSlider from './imageSlider.js';
import Button from 'react-bootstrap/Button';
import {ClipboardData} from 'react-bootstrap-icons';

class Car extends Component{
    constructor(props){
        super(props);
        this.state = {
            carDetails:[],
            carPictures:[],
            miles:0,
            price:0


        }
    }
    componentWillMount(){
        this.getCar()
    }

    getCar(){
        const carID = this.props.match.params.id;
        const carURL = 'http://localhost:3004/api/get/car/' + carID
        Axios.get(carURL).then((response)=>{
            const carDetails = response.data
            //console.log(carDetails)
            this.setState({
                carDetails: carDetails[0],
                price: carDetails[0].price,
                miles: carDetails[0].miles,
            })
        })
        const carPictureURL = 'http://localhost:3004/api/get/pictures/' + carID
        Axios.get(carPictureURL).then((response)=>{
            const carPics = response.data
            //console.log(carDetails)
            this.setState({
                carPictures: carPics
            })
            console.log(this.state.carPictures)
        })
        }

    render(){
        return(
            <div>
            <br></br>
            <Container>
                <div className="carProfileContainer">
                <h1 className="center carProfileYMM">{this.state.carDetails.year + ' ' + this.state.carDetails.make + ' ' + this.state.carDetails.model}</h1>
                <Row className="center">
                    <Col><h3 className="frontMilePriceCar">${this.state.price.toLocaleString()}</h3></Col>
                    <Col><h3 className="frontMilePriceCar">{this.state.miles.toLocaleString()} Miles</h3></Col>
                </Row>
                    <Row>
                    <Col lg="6">
                    <ImageSlider vehicle={this.props.match.params.id}></ImageSlider>
                    </Col>
                    <Col lg="6">  
                    <p className="description">{this.state.carDetails.description}</p>
                    <hr></hr>
                    {this.state.carDetails.historyReportURL ? <a href={this.state.carDetails.historyReportURL}><Button variant="primary" block><ClipboardData size={25}></ClipboardData> Vehicle History Report</Button></a>: null}
                    <p>VIN Number: {this.state.carDetails.vinNumber}</p>
                    </Col>
                </Row>
                </div>
            <Contact></Contact>
            </Container>
        </div>
        );
    }

}


export default Car; 
