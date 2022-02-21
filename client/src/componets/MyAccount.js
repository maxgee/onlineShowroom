import { Component ,useState } from 'react';
import { BrowserRouter as Router,Switch, Route, Link} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AdminNavigation from './AdminNavigation.js';
import {useAuth} from '../context/AuthContext.js';
export default function Admin (){    
    
    const {currentUser} = useAuth();
    
    return(
        <div>
            <AdminNavigation></AdminNavigation>
            <br></br>
            <Container>
            <div className="profile">
                <h1 className="center">My Account</h1>
                <Row className="profileDetails" xs={1} lg={2}>
                    <Col><b>Name:</b> {currentUser.displayName}</Col>
                    <Col><b>Email:</b> {currentUser.email}</Col>
                </Row>
                <div className="center profileDetails"><Link to="/forgot-password">Reset Password</Link></div>
            </div>
            </Container>
        </div>
        );
}
