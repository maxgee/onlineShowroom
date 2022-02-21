//Librarys
import React, {Component} from 'react';
import Axios from 'axios';
import Dropzone from 'react-dropzone';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
//Bootstrap
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Alert from 'react-bootstrap/Alert'

//Componets
import AdminNavigation from './AdminNavigation.js';

class uploadImages extends Component{
    constructor(props){
        super(props);
        this.state = {
            carID: this.props.match.params.id,
            imageSelected:'',
            uploads:[],
            imageCount:0,
            saveAlert:false
        }
    }
    componentWillMount(){
        this.getExistingImages()
    }
    
    uploadImage(){
        const formData = new FormData()
        formData.append("file", this.state.imageSelected[0])
        formData.append("upload_preset", "")

        Axios.post("https://api.cloudinary.com/v1_1/image/upload", formData).then((response)=>{
            console.log(response)
        })
    };
    handleDrop = files => {
        // Push all the axios request promise into a single array
        const uploaders = files.map(file => {
          // Initial FormData
          const formData = new FormData();
          formData.append("file", file);
          formData.append("tags", `codeinfuse, medium, gist`);
          formData.append("upload_preset", ""); // Replace the preset name with your own\
          
          // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
          return Axios.post("https://api.cloudinary.com/v1_1/image/upload", formData, {
            headers: { "X-Requested-With": "XMLHttpRequest" },
          }).then(response => {
            const data = response.data;
            console.log(data.url)
            this.pushImage(data.url);
            //console.log(this.state.uploadedImages)
        })
        });
      
        // Once all the files are uploaded 
        Axios.all(uploaders).then(() => {
            this.setState({
                uploads:[]
            },this.getExistingImages())
        });
      }
      pushImage(pictureLocation){
        Axios.post("http://localhost:3004/api/uploadPictures",{
            vehicleID: this.state.carID,
            pictureOrderID: this.state.imageCount,
            pictureLocation: pictureLocation
        })
        console.log(this.state.imageCount)
      }
      getExistingImages(){
        const carPictureURL = 'http://localhost:3004/api/get/pictures/' + this.state.carID
        Axios.get(carPictureURL).then((response)=>{
            const carPics = response.data
            carPics.map((url)=>{
                let urlArray = this.state.uploads;
                urlArray.push({pictureID: url.pictureID, pictureLocation: url.pictureLocation,pictureOrderID: url.pictureOrderID})
                this.setState({
                    urlArray
                });
            }
            )
        })
        console.log(this.state.uploads)
      }
      onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
          return;
        }
        const shuffledImageArray = Array.from(this.state.uploads);
        const [reorderedImages] = shuffledImageArray.splice(result.source.index,1);
        console.log(reorderedImages)
        shuffledImageArray.splice(result.destination.index,0,reorderedImages);

        this.setState({
            uploads:shuffledImageArray
        })
      }
      onSaveImage(){
          const savePictureURL = 'http://localhost:3004/api/update/images'
          this.state.uploads.map((image,index)=>
            Axios.put(savePictureURL,{
                pictureID : image.pictureID,
                pictureOrderID: index
            }).then(()=>{
                this.setState({
                saveAlert:true
                })
            })
          )
      }
      deletePicture(pictureID){
        Axios.delete(`http://localhost:3004/api/delete/picture/${pictureID}`).then(()=>{
            this.setState({
                uploads:[],
            },this.getExistingImages())
        });
      }

    render(){
        return(
            <div>
                <AdminNavigation></AdminNavigation>
                <br></br>
            <Container>
                <Jumbotron>
                    <h1 className="center">Image Uploader</h1>
                    <h2 className="center">Vehicle Number #{this.state.carID} </h2>
                </Jumbotron>
                <div className="imageDrop">
                <Dropzone onDrop={this.handleDrop}>
                {({getRootProps, getInputProps}) => (
                    <section>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p className="center">Drag 'n' drop images here of click to select images!</p>
                    </div>
                    </section>
                )}
                </Dropzone>
                </div>
                {this.state.saveAlert ?
                          <Alert variant="success" onClose={() => this.setState({ saveAlert:false})} dismissible>
                            <Alert.Heading>Image Changes</Alert.Heading>
                            <p>Your changes have been saved.</p>
                          </Alert>
                        : null
                    
                }
                {this.state.uploads.length ? <Row><Col><h1>Uploads</h1></Col><Col><Button varitant="primary" className="saveImageButton" onClick={()=>this.onSaveImage()}>Save Images</Button></Col></Row>:null}
                <div className="dragDropOuter">
                    <DragDropContext onDragEnd={(result)=>this.onDragEnd(result)}>
                        <Droppable droppableId="droppable-1">
                            {(provided,_)=> (
                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                    <Row xs={1} md={2}>
                                    {this.state.uploads.map(({pictureID,pictureLocation,pictureOrderID},index)=>(
                                        <Draggable key={pictureID} draggableId={"draggable-"+pictureID} index={index} >
                                            {(provided, snapchat)=>(
                                                <Col ref={provided.innerRef} {...provided.draggableProps}{...provided.dragHandleProps}>
                                                    <Card>
                                                        <Card.Img width="350px" heighth="200px" src={pictureLocation}/>
                                                        <Card.Text><Button variant="danger" block onClick={()=> this.deletePicture(pictureID)}>Delete</Button></Card.Text>
                                                    </Card>
                                                </Col>
                                            )}
                                        </Draggable>
        
                                    ))}
                                    {provided.placeholder}
                                    </Row>
                                </div> 
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            </Container>
        </div>
        );
    }

}


export default uploadImages; 
