import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import NavLink from 'react-bootstrap/esm/NavLink';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useHistory} from 'react-router-dom';
import {useAuth} from '../context/AuthContext.js';

export default function AdminNavigation(props){

    const {currentUser,logout} = useAuth();
    const history = useHistory()
    async function handleLogout(){
        try{
            await logout()
            history.push('/admin')
        }catch{

        }
    }
    return(
        <div>
            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="/">Admin Pannel</Navbar.Brand>
                    <Nav className="mr-auto">
                    <Nav.Link href="/admin/adminpannel">Home</Nav.Link>
                    <Nav.Link href="/admin/service">Service</Nav.Link>
                    <Nav.Link href="/cars">Cars</Nav.Link>
                    </Nav>
                    <Nav>
                        <NavDropdown title={currentUser.displayName} id="basic-nav-dropdown">
                                <NavDropdown.Item href="/admin/myaccount">My Account</NavDropdown.Item>
                            <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
    };
