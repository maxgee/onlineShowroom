import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import AdminNavigation from './AdminNavigation.js';
import {Container,Jumbotron,Row,Col,Button,Table} from 'react-bootstrap';
import NewCustomer from './serviceNewCustomer.js';
import NewVehicle from './serviceNewVehicle.js';

export default function AdminService(){
    const [newCustomerShow, setnewCustomerShow] = useState(false);
    const [newVehicleShow, setnewVehicleShow] = useState(false);
    const history = useHistory();
    return (
        <div>
            <AdminNavigation></AdminNavigation>
            <br></br>
            <Container>
                <Jumbotron>
                    <h1 className="center">Service</h1>
                </Jumbotron>
                <Row className="center">
                    <Col><Button onClick={()=>{
                        setnewCustomerShow(true)
                    }}>New Customer</Button></Col>
                    <Col><Button onClick={()=>{
                        setnewVehicleShow(true)
                    }}>New Vehicle</Button></Col>
                    <Col><Button onClick={()=>{ history.push("/admin/newInvoice")}} >New Invoice</Button></Col>
                </Row>
                <NewCustomer show={newCustomerShow}
        onHide={() => setnewCustomerShow(false)}></NewCustomer>
                <NewVehicle show={newVehicleShow}
        onHide={() => setnewVehicleShow(false)}></NewVehicle>
        
                <br></br>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Invoice #</th>
                            <th>Date</th>
                            <th>Customer Name</th>
                            <th>Vehicle</th>
                            <th>Amount</th>
                            <th>Receipt</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>7/30/21</td>
                            <td>Weston Kene</td>
                            <td>2010 Honda Civic</td>
                            <td>420.69</td>
                            <td><Button>View</Button></td>
                        </tr>
                    </tbody>
                </Table>
                <hr></hr>
            </Container>
        </div>
    );
}