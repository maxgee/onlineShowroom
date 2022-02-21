//Librarys
import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import Axios from 'axios';
import {image} from 'cloudinary-react';
import Dropzone from 'react-dropzone'
//Bootstrap
import Carousel from 'react-bootstrap/Carousel'

class imageSlider extends Component{
    constructor(props){
        super(props);
        this.state = {
            carID: this.props.vehicle,
            carPictures:[]
        }
    }
    componentWillMount(){
        this.getImages()
    }
    getImages(){
        const carPictureURL = 'http://localhost:3004/api/get/pictures/' + this.state.carID
        Axios.get(carPictureURL).then((response)=>{
            const carPics = response.data
            //console.log(carDetails)
            this.setState({
                carPictures: carPics
            })
        })
    }
    

    render(){
        return(
        <div>
            <Carousel fade interval={null}>
                    {
                        this.state.carPictures.map((val,index)=>{
                            return (
                                <Carousel.Item key={index}>
                                <img
                                  className="d-block w-100"
                                  src={val.pictureLocation}
                                />
                              </Carousel.Item>
                            )
                        })
                    }
                    </Carousel>
        </div>
        );
    }

}


export default imageSlider; 
