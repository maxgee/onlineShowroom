import React, { useState, Component, useEffect } from 'react'
import {Button,Modal,Table} from 'react-bootstrap';
import Axios from 'axios';
export default function ExistingVehicle(props){
    useEffect(()=>{
        getVehicles()
    },[])
    const [vehicles,setvehicles] = useState();
    function getVehicles(){
        Axios.get('http://localhost:3004/api/get/vehicles').then((response)=>{
            //console.log(response.data)
            setvehicles(response.data)
        })
    }
    function returnVehicle(i){
        props.existingVehicleData(vehicles[i])
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
                <th>VIN</th>
                <th>Year</th>
                <th>Make</th>
                <th>Model</th>
                </tr>
            </thead>
            <tbody>
                {vehicles ? vehicles.map((vehicle, index)=>{
                    //console.log(index)
                    return <tr key={index}>
                                <td>{vehicle.VIN}</td>
                                <td>{vehicle.vehicleYear}</td>
                                <td>{vehicle.vehicleMake}</td>
                                <td>{vehicle.vehicleModel}</td>
                                <td className="center"><Button onClick={()=>{returnVehicle(index)}}>Select</Button></td>
                            </tr>
                }):null}
            </tbody>
        </Table>
      </Modal.Body>
    </Modal>
    );
}