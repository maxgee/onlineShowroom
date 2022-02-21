//React
import React, {Component,useState, useEffect} from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import {Link, Redirect} from 'react-router-dom';
import Axios from 'axios';
import {useAuth} from '../context/AuthContext.js';
//Containers
import AdminNavigation from './AdminNavigation.js';
import AdminCarRow from './AdminCarRow.js'
//Bootstrap
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import AdminWelcome from './AdminWelcome.js';



class AdminControlPannel extends Component{

    static contextType = useAuth

    constructor(props){
        super(props);
        this.state = {
            inventoryList:[],
            redirect:null,
            soldList:[],
            unlistedList:[],
            sellCarModal:false,
            sellCar:'',
            sellPrice:'',
            sellDate:'',
        }
    }
    componentWillMount(){
        this.getInventory()
    }

    getInventory(){
            Axios.get('http://localhost:3004/api/get').then((response)=>{
                const invList = response.data
                this.setState({
                    inventoryList: invList
                })
            })
            Axios.get('http://localhost:3004/api/get/sold').then((response)=>{
                const invSoldList = response.data
                this.setState({
                    soldList: invSoldList
                })
            })
            Axios.get('http://localhost:3004/api/get/unlisted').then((response)=>{
                const invUnlistedList = response.data
                this.setState({
                    unlistedList: invUnlistedList
                })
            })
        }
    sellPriceChange(event) {
        this.setState({
            [event.target.name]:event.target.value
        });
    }
    
    sellCar(car){
       // console.log(car)
        this.setState({
            sellCar:car
        },()=>{this.setState({ sellCarModal:true})})
    }
    deleteCar = carID =>{
        Axios.delete(`http://localhost:3004/api/delete/${carID}`);
        this.setState({
            redirect:'/adminpannel'
        })
    }
    adminCarRow(val){
       return <AdminCarRow car ={val} sellCar={()=> {this.sellCar(val)}} deleteCar = {() => {this.deleteCar(val.listingID)}}></AdminCarRow>
    }
    pushSoldCar(){
        console.log(this.state.sellCar.listingID, this.state.sellPrice,this.state.sellDate);
        Axios.put("http://localhost:3004/api/update/sale", {
                salePrice: this.state.sellPrice,
                saleDate: this.state.sellDate,
                listingID:this.state.sellCar.listingID,
            }).then(this.setState({sellCarModal:false}));
    }
    sellCarModal(props){
        return(
            <Modal
                {...props}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.sellCar.year + ' ' + props.sellCar.make + ' ' + props.sellCar.model}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h4>Sell Car</h4>
                <p>
                <Form>
                    <Form.Group controlId="formGridMake">
                        <Form.Label>Price</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>$</InputGroup.Text>
                            </InputGroup.Prepend>
                                <Form.Control type="text" placeholder="Price" name="sellPrice"  onChange={props.sellPriceChange} />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="formGridMake">
                        <Form.Label>Day Sold</Form.Label>
                        <Form.Control type="date" placeholder="Date" name="sellDate"   onChange={props.sellPriceChange}/>
                    </Form.Group>
                </Form>
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button className="center" onClick={props.pushSoldCar}>Sell Car</Button>
              </Modal.Footer>
            </Modal>);
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
                   <AdminWelcome></AdminWelcome>
                    <Row xs={1} lg={3}>
                        <Col xs={{ order: 3 }} lg={{order:1}}>{this.state.inventoryList[0] ? <h2 className="saleStatus">For Sale</h2> : null }</Col>
                        <Col xs={{ order: 2 }} lg={{order:2}}></Col>
                        <Col xs={{ order: 1 }} lg={{order:3}} className="addInventoryButton"><Link to ="/admin/addInventory"><Button variant="primary" block>Add Inventory</Button></Link></Col>
                    </Row>
                        {this.state.inventoryList.map((val)=>{
                          return this.adminCarRow(val)
                        })}
                        {this.state.soldList[0] ? <h2 className="saleStatus">Sold</h2> : null }
                        {this.state.soldList.map((val)=>{
                           return this.adminCarRow(val)
                        })}
                        {this.state.unlistedList[0] ? <h2 className="saleStatus">Unlisted</h2> : null }
                        {this.state.unlistedList.map((val)=>{
                           return this.adminCarRow(val)
                        })}
                        <this.sellCarModal sellPriceChange={(e)=> this.sellPriceChange(e)}  show={this.state.sellCarModal} onHide={() => this.setState({sellCarModal:false})} sellCar={this.state.sellCar}  pushSoldCar={()=>{this.pushSoldCar()}}/>
                    
                    
                </Container>
            </div>
        );
    }

}


export default AdminControlPannel; 