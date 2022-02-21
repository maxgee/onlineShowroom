//React
import React, { Component, useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import Axios from 'axios';

//Bootstrap
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import AdminNavigation from './AdminNavigation.js';


class addInventory extends Component{
    constructor(props){
        super(props);
        this.state = {
            year:null,
            make:'',
            model:'',
            miles:null,
            price:null,
            vehicleReportURL:'',
            description:'',
            vin:'',
            stockNumber:'',
            redirect:null,
            date: new Date().toISOString().split('T')[0]

        }
    }

    inventoryDetailsChange = event =>{
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    pushInventory(){
            Axios.post("http://localhost:3004/api/insert", {
                year: this.state.year,
                make: this.state.make,
                model:this.state.model,
                miles: this.state.miles,
                description: this.state.description,
                price: this.state.price,
                status: "For Sale",
                date: this.state.date,
                vinNumber: this.state.vin,
                stockNumber: this.state.stockNumber,
                vehicleReportURL: this.state.vehicleReportURL
            }).then(res=>{
                console.log(res.data.insertId);
                this.setState({
                    redirect:'../uploadImages/'+res.data.insertId
                })
            });
            
    }
    
    render(){
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
          }
          console.log(this.state.date)
        return(
            <div>
                <AdminNavigation></AdminNavigation>
                <br></br>
                <Container>
                    <Jumbotron><h1 className="center">Add Inventory</h1></Jumbotron>
                    <Form onSubmit={(event)=>{
                        event.preventDefault()
                        this.pushInventory()
                    }}>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Year</Form.Label>
                            <Form.Control type="text" placeholder="Year" name="year" onChange={this.inventoryDetailsChange} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridMake">
                            <Form.Label>Make</Form.Label>
                            <Form.Control type="text" placeholder="Make" name="make"   onChange={this.inventoryDetailsChange}/>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridModel">
                            <Form.Label>Model</Form.Label>
                            <Form.Control type="text" placeholder="Model" name="model"   onChange={this.inventoryDetailsChange}/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridMiles">
                            <Form.Label>Miles</Form.Label>
                            <InputGroup>
                            <Form.Control type="text" placeholder="Miles"  name="miles" onChange={this.inventoryDetailsChange}/>
                            <InputGroup.Prepend>
                            <InputGroup.Text>Miles</InputGroup.Text>
                            </InputGroup.Prepend>
                            </InputGroup>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPrice">
                            <Form.Label>Price</Form.Label>
                            <InputGroup>
                            <InputGroup.Prepend>
                            <InputGroup.Text>$</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type="text" placeholder="Price"  name="price" onChange={this.inventoryDetailsChange}/>
                            </InputGroup>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row xs={1} lg={2}>
                            <Form.Group as={Col} controlId="formGridVIN">
                            <Form.Label>VIN Number</Form.Label>
                            <InputGroup>
                            <Form.Control type="text" placeholder="Vin"  name="vin" onChange={this.inventoryDetailsChange}/>
                            </InputGroup>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridStockNum">
                            <Form.Label>Stock Number</Form.Label>
                            <InputGroup>
                            <Form.Control type="text" placeholder="Stock Number"  name="stockNumber" onChange={this.inventoryDetailsChange}/>
                            </InputGroup>
                            </Form.Group>
                        </Form.Row>
                        <Form.Group controlId="formGridURL">
                            <Form.Label>Vehicle History Report URL</Form.Label>
                            <Form.Control placeholder="History Report" name="vehicleReportURL"  onChange={this.inventoryDetailsChange}/>
                        </Form.Group>
                        <Form.Group controlId="formGridDesc">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={10}  name="description" onChange={this.inventoryDetailsChange}/>
                        </Form.Group>

                        <Button variant="primary" type="submit" block>
                            Add Inventory
                        </Button>
                        </Form>
                </Container>
            </div>
            
        );
    }

}


export default addInventory; 