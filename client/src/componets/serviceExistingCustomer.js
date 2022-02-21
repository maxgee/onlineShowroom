import React, { useState, Component, useEffect } from 'react'
import {Button,Modal,Table} from 'react-bootstrap';
import Axios from 'axios';
export default function ExistingCustomer(props){
    useEffect(()=>{
        getCustomers()
    },[])
    const [customers,setcustomers] = useState();
    function getCustomers(){
        Axios.get('http://localhost:3004/api/get/customers').then((response)=>{
            //console.log(response.data)
            setcustomers(response.data)
        })
    }
    function returnCustomer(i){
        props.existingCustomerData(customers[i])
        props.onHide()
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
          Existing Customer
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Table striped bordered hover>
            <thead>
                <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>New Invoice</th>
                </tr>
            </thead>
            <tbody>
                {customers ? customers.map((customer, index)=>{
                    //console.log(index)
                    return <tr key={index}><td>{customer.firstName}</td><td>{customer.lastName}</td><td className="center"><Button onClick={()=>{returnCustomer(index)}}>Select</Button></td></tr>
                }):null}
            </tbody>
        </Table>
      </Modal.Body>
    </Modal>
    );
}