import React, {useRef, useState, useEffect} from 'react'
import {Container, Jumbotron, Form,Row, Col, Button,Alert} from 'react-bootstrap';
import AdminNavigation from './AdminNavigation.js';
import {useHistory} from 'react-router-dom';
import Axios from 'axios';
export default function NewInvoice(props){
    useEffect(()=>{
       getInvoice()
       getRepairs()
       getParts()
    },[])
    //Get Invoice ID From Header
    const invoiceNumber = props.match.params.id

     //Router DOM
    const history = useHistory()
    
    //Customer, Vehicle, Invoice, Repair Information
    const [existingCustomer,setexistingCustomer] = useState('')
    const [existingVehicle,setexistingVehicle] = useState('')
    const [existingInvoice,setexistingInvoice] = useState('')
    const [repairs,addRepairs] = useState([])
    const [parts,addParts] = useState([])
    const [invoiceDate, setInvoiceDate] = useState('')

    //Invoice Date formations
    function formatDate(){
            var dateToReturn = null
            var dateToFormat = null
            if(existingInvoice.date){
                dateToFormat = existingInvoice.date
                var dateNoTime =  dateToFormat.slice(0,10)
                var dateYear = dateNoTime.slice(0,4)
                var dateMonth = dateNoTime.slice(6,7)
                var dateDay = dateNoTime.slice(8,10)
                var invoiceDate = dateMonth+'/'+dateDay+'/'+dateYear;
                
                dateToReturn = invoiceDate
            }else{
                dateToReturn = 'No Date Selected'
            }
        return dateToReturn
    }
    //Get Invoice Information
    function getInvoice(){
        Axios.get('http://localhost:3004/api/get/invoice/'+invoiceNumber).then((response)=>{
            customerID = response.data[0].customerID;
            vehicleID = response.data[0].vehicleID;
            setexistingInvoice(response.data[0])
            getVehicles()
            getCustomers()
        })
    }
    //Customer and Vehicle Primary Keys
    var customerID = '';
    var vehicleID = '';
    //GET Vehicle Information
    function getVehicles(){
        Axios.get('http://localhost:3004/api/get/vehicle/'+vehicleID).then((response)=>{
            setexistingVehicle(response.data[0])

        })
    }
    //GET Customer Information
    function getCustomers(){
        Axios.get('http://localhost:3004/api/get/customer/'+customerID).then((response)=>{
            setexistingCustomer(response.data[0])
        })
    }
    //GET Repairs
    function getRepairs(){
        Axios.get('http://localhost:3004/api/get/repairs/'+invoiceNumber).then((response)=>{
            addRepairs(response.data)
        })
    }
    function getParts(){
        Axios.get('http://localhost:3004/api/get/parts/'+invoiceNumber).then((response)=>{
            addParts(response.data)
        })
    }
    //GET Parts
    //Subtotal Function's
    //Get Labor Total
    function getLaborTotal(){
        var subTotal = 0
        repairs.map((repair,index)=>(
            <div>{subTotal += repair.hours * repair.laborRate }</div>
        ))
        return subTotal.toLocaleString()
    }
    //Get Parts Total
    function getPartsTotal(){
        var subTotal = 0
        parts.map((part,index)=>(
            <div>{subTotal += part.partPrice }</div>
        ))
        return subTotal.toLocaleString()
    }
    //Get Grand Sub Total
    function getSubtotal(){
        var subTotal = 0
        repairs.map((repair,index)=>(
            <div>{subTotal += repair.hours * repair.laborRate }</div>
        ))
        parts.map((part,index)=>(
            <div>{subTotal += part.partPrice }</div>
        ))
        return subTotal.toLocaleString()
    }
    //Get Tax Dollar Amount
    function getTaxAmount(){
        var taxAmount = 0
        var subTotal = Number(getSubtotal())
        taxAmount = subTotal * (existingInvoice.taxRate / 100)
        return Number(taxAmount).toFixed(2)
    }

    //Gets Grand Total
    function getGrandTotal(){
        var grandTotal = Number(getSubtotal())
        if(existingInvoice.taxRate == null){
        }else{
            grandTotal += Number(getTaxAmount())
        }
        grandTotal = grandTotal.toFixed(2)
        return grandTotal
    }
    //Decides if Parts Heading should show
    function showPartsLineItemTotal(lineItemID){
        var subTotal = 0
        parts.filter(part=> part.repairLineItemID === lineItemID).map(filteredPart =>(
            subTotal += filteredPart.partPrice
        ))
        return (<h4 className="right">Parts Total: ${subTotal}</h4>)
    }
    return(
        <div>
        <AdminNavigation></AdminNavigation>
        <br></br>
        <Container>
            <div variant="secondary" className="center invoiceDetails">
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
                <Col>Mileage: {existingInvoice ? existingInvoice.vehicleMileage.toLocaleString() : null}</Col>
            </Row>
            <Row>
                <Col>{existingCustomer.city},{existingCustomer.state} {existingCustomer.zipCode}</Col>
                <Col>Invoiced Date: {formatDate()}</Col>
            </Row>
            </div>
            <div className="createdInvoiceRepairs">
                <Row>
                    <Col></Col>
                    <Col><h1 className='center'>Repairs</h1></Col>
                    <Col className="right"><Button onClick={()=> history.push("/admin/invoicePDF/"+invoiceNumber)}>PDF Invoice</Button></Col>
                </Row>
                {repairs.map((repair,index)=>(
                    <div>
                        <Row>
                            <Col><h2>{repair.itemName}</h2></Col>
                        </Row>
                         <Row>
                            <Col><h5>Labor: {repair.hours} Hours</h5></Col>
                            <Col className="center"><h5>  Rate: ${repair.laborRate} per hour</h5> </Col>
                            <Col className="right"><h4>Total: ${repair.hours * repair.laborRate}</h4></Col>
                         </Row>
                         <Row>
                            <Col className="left">{parts.filter(part=> part.repairLineItemID === repair.lineItemID).length > 0 ? <h4><u>Parts</u></h4> : null}</Col>
                         </Row>
                            {parts.filter(part=> part.repairLineItemID === repair.lineItemID).map(filteredPart =>(
                                   <div>
                                        <Row>
                                            <Col className="partsIndent"><h4>{filteredPart.partName} </h4></Col>
                                            <Col><h4>${filteredPart.partPrice}</h4></Col>
                                            <Col></Col>
                                        </Row>
                                    </div>
                            ))}
                            {parts.filter(part=> part.repairLineItemID === repair.lineItemID).length > 0 ? showPartsLineItemTotal(repair.lineItemID) : null}
                        <hr></hr>
                    </div>
                ))}
                {existingInvoice.recommendations ? <div><h2 className='left'>Recommendations:</h2><h3> {existingInvoice.recommendations}</h3><hr></hr></div> : null }
                <Row>
                    <Col><h3>Labor Total: ${getLaborTotal()}</h3></Col>
                    <Col className="center"><h3>Parts Total: ${getPartsTotal()}</h3></Col>
                    <Col className="right"><h3>Sub Total: ${getSubtotal()}</h3></Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col className="right"></Col>
                    <Col className="right"><h3>{existingInvoice.taxRate != null ? existingInvoice.taxRate +'% Tax: $' + getTaxAmount() : 'Exempt'}</h3></Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col className="right"></Col>
                    <Col className="right"><hr></hr><h2>Total: ${ getGrandTotal()}</h2></Col>
                </Row>
            </div>
        </Container>
        </div>
    );
}