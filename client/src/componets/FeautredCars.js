import React, {Component} from 'react';
import Axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {withRouter } from "react-router-dom";
import CarCard from './carCard.js';
import Container from 'react-bootstrap/Container';

class featuredCars extends Component{
    constructor(props){
        super(props);
        this.state = {
            featuredCars:[]

        }
    }
    componentWillMount(){
        this.getCar()
    }

    getCar(){
        const carURL = 'http://localhost:3004/api/get/featuredcar/'
        Axios.get(carURL).then((response)=>{
            const featuredCarsData = response.data
            //console.log(carDetails)
            this.setState({
                featuredCars: featuredCarsData
            })
        })
        }

    render(){
        return(
            <div>
            <Container>
            <h1>Feautred Cars</h1>
            <Row xs={1} lg={3}>
            {this.state.featuredCars.map((val)=>{
                           return   <Col><CarCard car={val}></CarCard></Col>
                        })}
            </Row>
            </Container>
        </div>
        );
    }

}


export default featuredCars; 
