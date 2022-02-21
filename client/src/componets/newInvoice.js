import React, {useRef, useState} from 'react'
import {Container, Jumbotron, Form,Row, Col, Button} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import AdminNavigation from './AdminNavigation.js';
import ExistingCustomer from './serviceExistingCustomer.js';
import ExistingVehicle from './serviceExistingVehicle.js';
import Axios from 'axios';
export default function NewInvoice(props){
    //Router DOM
    const history = useHistory()
    //Modals
    const [existingCustomerShow, setexistingCustomerShow] = useState(false);
    const [existingVehicleShow, setexistingVehicleShow] = useState(false);
    //Save Functions
    function saveNewCustomer(){
        Axios.post("http://localhost:3004/api/insert/newCustomer",{
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            phoneNumber: phoneNumber.current.value,
            address:address.current.value,
            city:city.current.value,
            state:state.current.value,
            zipCode:zipCode.current.value
        }).then(res=>{

            customerID = res.data.insertId
            console.log("New Customer has been saved! Customer #"+customerID)
            if(existingVehicle.vehicleID){
                createInvoice()
            }
        })
    }
    function saveNewVehicle(){
        Axios.post("http://localhost:3004/api/insert/newVehicle",{
            year: year.current.value,
            make: make.current.value,
            model: model.current.value,
            VIN:VIN.current.value,
        }).then(res=>{
            vehicleID = res.data.insertId
            console.log("New Vehicle - " + vehicleID)
            createInvoice()
        })
    }
    function handleSubmit(e){
        e.preventDefault()
        if(existingVehicle && existingCustomer){
            vehicleID = existingVehicle.vehicleID
            customerID = existingCustomer.customerID
            createInvoice()
        }else if(existingVehicle && !existingCustomer){
            vehicleID = existingVehicle.vehicleID
            saveNewCustomer()
        }else if(!existingVehicle && existingCustomer){
            customerID = existingCustomer.customerID
            saveNewVehicle()
        }else{
            saveNewCustomer()
            saveNewVehicle()
        }
    }
  
    function createInvoice(){
        Axios.post("http://localhost:3004/api/insert/newInvoice",{
            customerID: customerID,
            vehicleID: vehicleID,
        }).then(res=>{
           console.log("Invoice Created! #" + res.data.insertId)
           var invoiceNumber = res.data.insertId
           history.push("/admin/invoice/"+invoiceNumber)
        })
    }
    //Customer References
    const [existingCustomer,setexistingCustomer] = useState('')
    const [existingVehicle,setexistingVehicle] = useState('')
    var customerID = ''
    const firstName = useRef()
    const lastName = useRef()
    const phoneNumber = useRef()
    const address = useRef()
    const city = useRef()
    const state = useRef()
    const zipCode = useRef()
    //Vehcile References
    var vehicleID = ''
    const year = useRef()
    const make = useRef()
    const model = useRef()
    const VIN = useRef()
    return(
        <div>
        <AdminNavigation></AdminNavigation>
        <br></br>
        <Container>
            <Jumbotron>
                <h1 className="center">New Invoice</h1>
            </Jumbotron>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col><h2>Customer</h2></Col>
                    <Col></Col>
                    <Col className="right"><Button onClick={()=>{setexistingCustomerShow(true)}} block>Existing Customer</Button></Col>
                </Row>
                <ExistingCustomer show={existingCustomerShow}
        onHide={() => setexistingCustomerShow(false)} existingCustomerData={setexistingCustomer} ></ExistingCustomer>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="First Name"  ref={firstName} required value={existingCustomer.firstName}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Last Name" ref={lastName} required value={existingCustomer.lastName}/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formPhoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="text" placeholder="Phone Number" ref={phoneNumber} value={existingCustomer.phoneNumber}/>
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="1234 Main St" ref={address} value={existingCustomer.address}/>
                </Form.Group>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control  type="text" placeholder="City" ref={city}  value={existingCustomer.city}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>State</Form.Label>
                    <Form.Control  type="text" placeholder="State" ref={state}  value={existingCustomer.state}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control type="text" placeholder="Zip Code" ref={zipCode}  value={existingCustomer.zipCode}/>
                    </Form.Group>
                </Row>
                    <Row>
                        <Col><h2>Vehicle</h2></Col>
                        <Col></Col>
                        <Col className="right"><Button onClick={()=>{setexistingVehicleShow(true)}} block>Existing Vehicle</Button></Col>
                    </Row>
                    <ExistingVehicle show={existingVehicleShow}
        onHide={() => setexistingVehicleShow(false)} existingVehicleData={setexistingVehicle} ></ExistingVehicle>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formVYear">
                        <Form.Label>Year</Form.Label>
                        <Form.Control type="text" placeholder="Year" ref={year} value={existingVehicle.vehicleYear}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formVMake">
                        <Form.Label>Make</Form.Label>
                        <Form.Control type="text" placeholder="Make" ref={make} value={existingVehicle.vehicleMake}/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formVModel">
                        <Form.Label>Model</Form.Label>
                        <Form.Control type="text" placeholder="Model" ref={model} value={existingVehicle.vehicleModel}/>
                        </Form.Group>
                    </Row>
                    <Form.Group className="mb-3" controlId="formVIN">
                        <Form.Label>VIN</Form.Label>
                        <Form.Control type="text" placeholder="Vin Number" ref={VIN} value={existingVehicle.VIN}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" block>Next</Button>
                </Form>
        </Container>
        </div>
    );
}