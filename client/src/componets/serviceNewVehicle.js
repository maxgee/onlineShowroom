import React, {useRef, useState} from 'react'
import {Button,Modal, Form, Row, Col, Alert} from 'react-bootstrap';
import Axios from 'axios';
export default function NewVehicle(props){
  const year = useRef()
  const make = useRef()
  const model = useRef()
  const VIN = useRef()
  const [newVehicle, setNewVehicle] = useState("")
  function handleSubmit(e){
    e.preventDefault()
    Axios.post("http://localhost:3004/api/insert/newVehicle",{
        year: year.current.value,
        make: make.current.value,
        model: model.current.value,
        VIN:VIN.current.value,
    }).then(res=>{
        setNewVehicle("New Vehicle successfully added!") 
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
          New Vehicle
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {newVehicle && <Alert variant="success">{newVehicle}</Alert>}
       <Form onSubmit={handleSubmit}>
       <Row className="mb-3">
            <Form.Group as={Col} controlId="formVYear">
            <Form.Label>Year</Form.Label>
            <Form.Control type="text" placeholder="Year" ref={year}/>
            </Form.Group>

            <Form.Group as={Col} controlId="formVMake">
            <Form.Label>Make</Form.Label>
            <Form.Control type="text" placeholder="Make" ref={make}/>
            </Form.Group>
            <Form.Group as={Col} controlId="formVModel">
            <Form.Label>Model</Form.Label>
            <Form.Control type="text" placeholder="Model" ref={model}/>
            </Form.Group>
        </Row>
        <Form.Group className="mb-3" controlId="formVIN">
            <Form.Label>VIN</Form.Label>
            <Form.Control type="text" placeholder="Vin Number" ref={VIN}/>
        </Form.Group>
        <Button variant="primary" type="submit" block> Add Vehicle</Button>
       </Form>
      </Modal.Body>
    </Modal>
    );
}