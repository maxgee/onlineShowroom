//React
import React, { Component, useState, useRef } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import {useHistory, Link} from 'react-router-dom';
//Bootstrap
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert'
import Seventy1Logo from '../imgs/71Logo.png';
import {useAuth} from '../context/AuthContext.js'


export default function ForgotPassword(){
    const emailRef = useRef()
    const [loading, setLoading] = useState(false)
    const {resetPassword} = useAuth()
    const history = useHistory()
    const [error,setError] = useState("");
    const [message,setMessage] = useState("");

   async function handleSubmit(e){
       e.preventDefault()
        try{
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('A email has been sent to reset your password!')
        }catch{
            setError("Failed to reset password!")
        }
        setLoading(false)
    };
        return(
            <div>
                <br></br>
                <Container>
                    <img src={Seventy1Logo} className="businessLogo"/>
                    <Jumbotron className="center loginContainer"><h1>Password Reset</h1>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={handleSubmit}> 
                        <Form.Group as={Row} controlId="formHorizontalEmail">
                            <Form.Label column sm={2} className="left">
                            <b>Email</b>
                            </Form.Label>
                            <Col sm={10}>
                            <Form.Control ref={emailRef} type="email"  placeholder="Email" required/>
                            </Col>
                        </Form.Group>
                        <Button disabled={loading} variant="primary" type="submit" block>Reset</Button>
                    </Form>
                    <br></br>
                    <div><Link to="/admin">Login</Link></div>
                    </Jumbotron>
                    
                </Container>
            </div>
        );
}