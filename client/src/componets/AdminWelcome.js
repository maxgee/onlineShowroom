import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import {useAuth} from '../context/AuthContext.js';

export default function AdminWelcome(){

    const {currentUser} = useAuth();

    return (
        <Jumbotron>
            <h1>Welcome, {currentUser.displayName}</h1>
        </Jumbotron>
    )

}