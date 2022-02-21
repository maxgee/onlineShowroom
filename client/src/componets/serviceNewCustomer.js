import React, {useRef, useState} from 'react'
import {Button,Modal, Form, Row, Col, Alert} from 'react-bootstrap';
import Axios from 'axios';
export default function NewCustomer(props){
    const firstName = useRef()
    const lastName = useRef()
    const phoneNumber = useRef()
    const address = useRef()
    const city = useRef()
    const state = useRef()
    const zipCode = useRef()
    const [newCustomer, setNewCustomer] = useState("")

    function handleSubmit(e){
        e.preventDefault()
        Axios.post("http://localhost:3004/api/insert/newCustomer",{
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            phoneNumber: phoneNumber.current.value,
            address:address.current.value,
            city:city.current.value,
            state:state.current.value,
            zipCode:zipCode.current.value
        }).then(res=>{
            setNewCustomer("New Customer successfully added!")
        })
    }

    return(
        <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          New Customer
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          {newCustomer && <Alert variant="success">{newCustomer}</Alert>}
       <Form onSubmit={handleSubmit}>
       <Row className="mb-3">
            <Form.Group as={Col} controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="First Name"  ref={firstName} required/>
            </Form.Group>

            <Form.Group as={Col} controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Last Name" ref={lastName} required />
            </Form.Group>
            <Form.Group as={Col} controlId="formPhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="text" placeholder="Phone Number" ref={phoneNumber}/>
            </Form.Group>
        </Row>
        <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" placeholder="1234 Main St" ref={address}/>
        </Form.Group>
        <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control  type="text" placeholder="City" ref={city} />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
            <Form.Label>State</Form.Label>
            <Form.Control  type="text" placeholder="State" ref={state} />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control type="text" placeholder="Zip Code" ref={zipCode} />
            </Form.Group>
        </Row>
        <Button variant="primary" type="submit" block> Add Customer</Button>
       </Form>
      </Modal.Body>
    </Modal>
    );
}