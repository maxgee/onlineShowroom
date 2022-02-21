//React
import React, {Component,useState, useEffect} from 'react';
import Axios from 'axios';
//Containers
//Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import CarTile from './CarTile.js';



class Cars extends Component{
    constructor(props){
        super(props);
        this.state = {
            inventoryList:[]
        }
    }
    componentWillMount(){
        this.getInventory()
    }

    getInventory(){
            Axios.get('http://localhost:3004/api/get').then((response)=>{
                const invList = response.data
                console.log(invList)
                this.setState({
                    inventoryList: invList
                })
            })
        }

    render(){
        return(
            <div>
                    
                        {this.state.inventoryList.map((val)=>{
                           return   <CarTile car ={val}></CarTile>
                        })}
            </div>
        );
    }

}


export default Cars; 