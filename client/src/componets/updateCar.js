//React
import React, { Component, useState, useEffect } from 'react';
import { Redirect, Link } from "react-router-dom";
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
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import Admin from './MyAccount.js';


class updateCar extends Component{
    constructor(props){
        super(props);
        this.state = {
            carID: this.props.match.params.id,
            year:null,
            make:'',
            model:'',
            miles:null,
            price:null,
            vehicleReportURL:'',
            description:'',
            vin:'',
            status:'',
            dbSavedStatus:'',
            stockNumber:'',
            listingDate: '',
            salePrice:'',
            saleDate:'',
            redirect:null

        }
    }
    componentWillMount(){
        this.getCarDetails()
    }

    inventoryDetailsChange = event =>{
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    getCarDetails(){
        const carURL = 'http://localhost:3004/api/get/car/' + this.state.carID
        Axios.get(carURL).then((response)=>{
            const carDetails = response.data
            const car = carDetails[0]
            //console.log(carDetails)
            this.setState({
                year:car.year,
                make:car.make,
                model:car.model,
                miles:car.miles,
                price:car.price,
                vehicleReportURL: car.historyReportURL,
                description:car.description,
                vin:car.vinNumber,
                stockNumber:car.stockNumber,
                status:car.status,
                dbSavedStatus:car.status,
                salePrice:car.salePrice,
                saleDate:car.saleDate ? car.saleDate.split('T')[0] : '',
                listingDate: car.listingDate ? car.listingDate.split('T')[0] : ''
            })
        })
    }
    
    verifySalePriceDate(){
        if((this.state.status != "Sold") && (this.state.salePrice != null || this.state.saleDate != null) ){
            this.setState({
                salePrice:null,
                saleDate:null
            },
            ()=>this.updateInventory()
            )
        }else{
            this.updateInventory()
        }
    }
    updateInventory(){
            const date = (new Date()).toLocaleString("en-US")
            console.log("Updating Inventory as "+ this.state.status +" With States as: ", this.state.salePrice, this.state.saleDate)
            Axios.put("http://localhost:3004/api/update", {
                year: this.state.year,
                make: this.state.make,
                model:this.state.model,
                miles: this.state.miles,
                description: this.state.description,
                price: this.state.price,
                vehicleReportURL: this.state.vehicleReportURL,
                date: this.date,
                vinNumber: this.state.vin,
                stockNumber: this.state.stockNumber,
                listingID: this.state.carID,
                listingDate: this.state.listingDate,
                salePrice:this.state.salePrice,
                saleDate:this.state.saleDate,
                status: this.state.status
            })
            this.setState({
                redirect:'/admin/adminpannel'
                
            })
            
    }
    

    render(){
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
          }

        return(
            <div>
                <AdminNavigation></AdminNavigation>
                <br></br>
                <Container>
                    <Jumbotron><h1 className="center">Update</h1></Jumbotron>
                    <Form onSubmit={(event)=>{
                        event.preventDefault()
                        this.verifySalePriceDate()
                    }}>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Year</Form.Label>
                            <Form.Control type="text" placeholder="Year" name="year" onChange={this.inventoryDetailsChange} value={this.state.year}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridMake">
                            <Form.Label>Make</Form.Label>
                            <Form.Control type="text" placeholder="Make" name="make"   onChange={this.inventoryDetailsChange} value={this.state.make}/>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridModel">
                            <Form.Label>Model</Form.Label>
                            <Form.Control type="text" placeholder="Model" name="model"   onChange={this.inventoryDetailsChange} value={this.state.model}/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridMiles">
                            <Form.Label>Miles</Form.Label>
                            <InputGroup>

                            <Form.Control type="number"  placeholder="Miles"  name="miles" onChange={this.inventoryDetailsChange} value={this.state.miles}/>
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
                            <Form.Control type="number"    placeholder="Price"  name="price" onChange={this.inventoryDetailsChange} value={this.state.price}/>
                            </InputGroup>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridVIN">
                            <Form.Label>VIN Number</Form.Label>
                            <InputGroup>
                            <Form.Control type="text" placeholder="Vin"  name="vin" onChange={this.inventoryDetailsChange} value={this.state.vin}/>
                            </InputGroup>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridStockNum">
                            <Form.Label>Stock Number</Form.Label>
                            <InputGroup>
                            <Form.Control type="text" placeholder="Stock Number"  name="stockNumber" onChange={this.inventoryDetailsChange} value={this.state.stockNumber}/>
                            </InputGroup>
                            </Form.Group>
                        </Form.Row>
                        <Form.Group controlId="formGridURL">
                            <Form.Label>Vehicle History Report URL</Form.Label>
                            <Form.Control placeholder="History Report" name="vehicleReportURL"  onChange={this.inventoryDetailsChange} value={this.state.vehicleReportURL}/>
                        </Form.Group>
                        <Form.Row>
                            <Form.Group as={Col}>
                            <Form.Label>Vehicle Status</Form.Label>
                            <Form.Control as="select" name="status" onChange={this.inventoryDetailsChange}>
                                <option value={this.state.dbSavedStatus}>{this.state.dbSavedStatus}</option>
                                <option disabled>----</option>
                                <option value="For Sale" >For Sale</option>
                                <option value="Sold">Sold</option>
                                <option value="Unlisted">Unlisted</option>
                            </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridStockNum">
                            <Form.Label>Day Listed on Market</Form.Label>
                            <Form.Control type="date"  name="listingDate" onChange={this.inventoryDetailsChange} value={this.state.listingDate}></Form.Control>
                            </Form.Group>
                        </Form.Row>
                        {this.state.status == "Sold" ? 
                            <Form.Row>
                                <Form.Group as={Col}>
                                <Form.Label>Sale Price</Form.Label>
                                <Form.Control type="text" placeholder="Sale Price" name="salePrice" onChange={this.inventoryDetailsChange} value={this.state.salePrice}/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridStockNum">
                                <Form.Label>Day Sold</Form.Label>
                                <Form.Control type="date"  name="saleDate" onChange={this.inventoryDetailsChange} value={this.state.saleDate}></Form.Control>
                                </Form.Group>
                            </Form.Row>
                    
                            : null}

                        <Form.Group controlId="formGridDesc">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={10}  name="description" onChange={this.inventoryDetailsChange} value={this.state.description}/>
                        </Form.Group>
                        <Link to={'../uploadImages/'+ this.state.carID}><Button variant="primary"  block>
                            Update Pictures
                        </Button></Link>
                        <br></br>
                        <Button variant="warning" type="submit" block>
                            Update Listing
                        </Button>
                        </Form>
                </Container>
            </div>
            
        );
    }

}


export default updateCar; 