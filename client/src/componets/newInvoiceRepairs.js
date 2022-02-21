import React, {useRef, useState, useEffect} from 'react'
import {Container, Jumbotron, Form,Row, Col, Button,Alert} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import AdminNavigation from './AdminNavigation.js';
import Axios from 'axios';
export default function NewInvoice(props){
    useEffect(()=>{
       getInvoice()
    },[])
    //Router DOM
    const history = useHistory()
    //Get Invoice ID From Header
    const invoiceNumber = props.match.params.id
    //Get Invoice Information
    function getInvoice(){
        Axios.get('http://localhost:3004/api/get/invoice/'+invoiceNumber).then((response)=>{
            customerID = response.data[0].customerID;
            vehicleID = response.data[0].vehicleID;
            getVehicles()
            getCustomers()

        })
    }
    //Customer and Vehicle Primary Keys
    var customerID = '';
    var vehicleID = '';
    //Customer and Vehicle Detail Retrival
    function getVehicles(){
        Axios.get('http://localhost:3004/api/get/vehicle/'+vehicleID).then((response)=>{
            setexistingVehicle(response.data[0])

        })
    }
    function getCustomers(){
        Axios.get('http://localhost:3004/api/get/customer/'+customerID).then((response)=>{
            setexistingCustomer(response.data[0])
        })
    }
    //Customer and Vehicle Information
    const [existingCustomer,setexistingCustomer] = useState('')
    const [existingVehicle,setexistingVehicle] = useState('')
    //Invoice References
    const currentMiles = useRef()
    const taxRate = useRef()
    const invoiceDate = useRef()
    const vehicleRecommendations = useRef()
    //Form Submit Function
    function handleSubmit(e){
        e.preventDefault()
        updateInvoice()
        putRepairsInState()
    }
    //Update Invoice Information
    function updateInvoice(){
        Axios.put("http://localhost:3004/api/update/invoice", {
            invoiceNumber: invoiceNumber,
            currentMiles: currentMiles.current.value,
            taxRate: taxRate.current.value,
            invoiceDate:invoiceDate.current.value,
            vehicleRecommendations: vehicleRecommendations.current.value,
            })
    }
    //Repairs Array

    const [repairs, addRepair] = useState([
        {
            name:"",
            hours:null,
            rate:null,
            parts:[{
                name:"",
                cost:null,
            }]
        }
        ]) 
        //More Repairs
        function moreRepairs(){
            addRepair([...repairs,{
                name:"",
                hours:null,
                rate:null,
                parts:[{
                    name:"",
                    cost:null,
                }]
            }])
        }
    //Parts Array

    const [parts, addParts] = useState([
        {
            name:"",
            cost:null,
        }
        ]) 
        //More Repairs

        function moreParts(index){
            addRepair(previousParts=>{
                return [...previousParts.slice(0,index), {...previousParts[index], parts:[...previousParts[index].parts,{ name:"", cost:null,}]}, ...previousParts.slice(index+1)]
            })
        }
        //Handles the setting of the repair name to the state
        function putRepairsInState(){
            let newRepair = [...repairs]
            repairs.map((repair,index)=>{
                //Adds Singluar Repair Into Database
                Axios.post("http://localhost:3004/api/insert/newRepair",{
                    invoiceID: invoiceNumber,
                    itemName: document.getElementById(index + "name").value,
                    hours: document.getElementById(index + "hours").value,
                    laborRate: document.getElementById(index + "rate").value
                }).then(res=>{
                   //Adds Parts Needed for the repair correlated to the repair ID
                   console.log("Repair Added! #" + res.data.insertId )
                   repair.parts.map((part,partIndex)=>{
                        Axios.post("http://localhost:3004/api/insert/addParts",{
                            invoiceID: invoiceNumber,
                            repairLineItemID : res.data.insertId,
                            partName: document.getElementById(index +partIndex+ "partName").value,
                            partPrice: document.getElementById(index +partIndex +"partCost").value,
                        }).then(res=>{
                        console.log("Part Added! #" + res.data.insertId)
                        })
                    })
                })

            })
            history.push("/admin/createdInvoice/"+invoiceNumber)
        }
    return(
        <div>
        <AdminNavigation></AdminNavigation>
        <br></br>
        <Container>
            <Alert variant="secondary" className="center">
            <h1 className="center">Invoice #{invoiceNumber}</h1>
            <Row>
                <Col><Alert.Heading>Customer</Alert.Heading></Col>
                <Col><Alert.Heading>Vehicle</Alert.Heading></Col>
            </Row>
            <Row>
                <Col>{existingCustomer.firstName} {existingCustomer.lastName}<br></br></Col>
                <Col>{existingVehicle.vehicleYear} {existingVehicle.vehicleMake} {existingVehicle.vehicleModel}</Col>
            </Row>
            <Row>
                <Col>{existingCustomer.phoneNumber}</Col>
                <Col>{existingVehicle.VIN}</Col>
            </Row>
            <Row>
                <Col>{existingCustomer.address}</Col>
                <Col></Col>
            </Row>
            <Row>
                <Col>{existingCustomer.city},{existingCustomer.state} {existingCustomer.zipCode}</Col>
                <Col></Col>
            </Row>
            </Alert>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col><h2>Invoice Information</h2></Col>
                    <Col></Col>
                    <Col></Col>
                </Row>
                <Row className="mb-3">
                        <Form.Group as={Col} controlId="formHours">
                        <Form.Label>Current Vehicle Mileage</Form.Label>
                        <Form.Control type="text" placeholder="Miles"  ref={currentMiles} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formHours">
                        <Form.Label>Tax Rate</Form.Label>
                        <Form.Control type="text" placeholder="Tax Rate"  ref={taxRate} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formVMake">
                        <Form.Label>Invoice Date</Form.Label>
                        <Form.Control type="date"  name="listingDate" ref={invoiceDate}></Form.Control>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Col></Col>
                        <Col className="center"><h2>Issues</h2></Col>
                        <Col className="right"><Button onClick={moreRepairs}>More Repairs</Button></Col>
                    </Row>
                    {repairs.map((repair,index)=>(
                        <div key={index}>
                        <h3>Repair #{index + 1}</h3>
                        <Form.Group className="mb-3" controlId="formRepairName">
                        <Form.Label>Issue</Form.Label>
                        <Form.Control id={index +"name"} type="text" name="name" placeholder="Repair"/>
                    </Form.Group>
                    <Row className="mb-2">
                        <Form.Group as={Col} controlId="formHours">
                        <Form.Label>Hours</Form.Label>
                        <Form.Control id={index + "hours"} type="text" name="hours" placeholder="Hours Taken" defaultValue={repair.hours} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formVMake">
                        <Form.Label>Rate</Form.Label>
                        <Form.Control id={index + "rate"} type="text" name="rate" placeholder="Hourly Rate" defaultValue={repair.rate}/>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Col><h3>Parts</h3></Col>
                        <Col></Col>
                        <Col className="right"><Button onClick={()=>moreParts(index)}>More Parts</Button></Col>
                    </Row>
                    {repair.parts.map((part,partIndex)=>(
                        <Row className="mb-2">
                        <Form.Group as={Col} controlId="formHours">
                        <Form.Label>Part</Form.Label>
                        <Form.Control id={index +partIndex+ "partName"} type="text" name="hours" placeholder="Part Name"  />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formVMake">
                        <Form.Label>Cost</Form.Label>
                        <Form.Control  id={index +partIndex  + "partCost"}type="text" name="rate" placeholder="Cost" />
                        </Form.Group>
                    </Row>
                    ))}
                    </div>
                    ))}
                    <h2>Recommendations</h2>
                    <Form.Group className="mb-3" controlId="formVehicleRecomendations">
                        <Form.Control type="text" placeholder="Recommendations"  ref={vehicleRecommendations}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" block> Finish Invoice</Button>
                </Form>
        </Container>
        </div>
    );
}