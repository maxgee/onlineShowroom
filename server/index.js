const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require("mysql");

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'seventy-1auto'
});

db.connect();

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
//
//GET REQUEST
//
app.get('/api/get', (req,res)=>{
    const sqlSelect = "SELECT * FROM listings WHERE status = 'For Sale'";
    db.query(sqlSelect,(err,result)=>{
        res.send(result);
    });
})
app.get('/api/get/sold', (req,res)=>{
    const sqlSelect = "SELECT * FROM listings WHERE status = 'Sold'";
    db.query(sqlSelect,(err,result)=>{
        res.send(result);
    });
})
app.get('/api/get/unlisted', (req,res)=>{
    const sqlSelect = "SELECT * FROM listings WHERE status = 'Unlisted'";
    db.query(sqlSelect,(err,result)=>{
        res.send(result);
    });
})
app.get('/api/get/featuredcar/', (req,res)=>{
    const sqlfeatured = "SELECT * FROM listings WHERE status = 'For Sale' ORDER BY listingID DESC LIMIT 3;";
    db.query(sqlfeatured,(err,result)=>{
        res.send(result);
    });
})
app.get('/api/get/car/:id', (req,res)=>{
    const carID = req.params.id
    const sqlSelect = "SELECT * FROM listings WHERE listingID = ?";
    db.query(sqlSelect,[carID],(err,result)=>{
        res.send(result);
    });
})
app.get('/api/get/pictures/:id', (req,res)=>{
    const carPictureID = req.params.id
    const sqlSelectPictures = "SELECT pictureID, pictureLocation, pictureOrderID FROM vehiclePictures WHERE vehicleID = ? ORDER BY pictureOrderID";
    db.query(sqlSelectPictures,[carPictureID],(err,result)=>{
        res.send(result);
    });
})
//Get all customers and vehicles
app.get('/api/get/customers', (req,res)=>{
    const sqlGetAllCustomers = "SELECT * FROM customer";
    db.query(sqlGetAllCustomers,(err,result)=>{
        res.send(result);
    });
})
app.get('/api/get/vehicles', (req,res)=>{
    const sqlGetAllVehicles = "SELECT * FROM vehicle";
    db.query(sqlGetAllVehicles,(err,result)=>{
        res.send(result);
    });
})
//Get customer and vehicle ID from Invoice ID
app.get('/api/get/invoice/:id', (req,res)=>{
    const invoiceID = req.params.id;
    const getInvoice = "SELECT * FROM invoice WHERE invoiceID = ?";
    db.query(getInvoice,[invoiceID],(err,result)=>{
        res.send(result);
    });
})
//Get customers and vehicles by ID
app.get('/api/get/customer/:id', (req,res)=>{
    const customerID = req.params.id;
    const sqlGetCustomer = "SELECT * FROM customer WHERE customerID = ?";
    db.query(sqlGetCustomer,[customerID],(err,result)=>{
        res.send(result);
    });
})
//Gets vehicle info given vehicleID
app.get('/api/get/vehicle/:id', (req,res)=>{
    const vehicleID = req.params.id; 
    const sqlGetVehicle = "SELECT * FROM vehicle WHERE vehicleID = ?";
    db.query(sqlGetVehicle,[vehicleID],(err,result)=>{
        res.send(result);
    });
})
//Get list of repairs givine InvoiceID
app.get('/api/get/repairs/:id', (req,res)=>{
    const invoiceID = req.params.id; 
    const getRepairs = "SELECT * FROM invoiceLineItem WHERE invoiceID = ?";
    db.query(getRepairs,[invoiceID],(err,result)=>{
        res.send(result);
    });
})
//Get list of parts given Invice ID
app.get('/api/get/parts/:id', (req,res)=>{
    const invoiceID = req.params.id; 
    const getParts = "SELECT * FROM repairParts WHERE invoiceID = ?";
    db.query(getParts,[invoiceID],(err,result)=>{
        res.send(result);
    });
})
//
//POST REQUEST
//
app.post('/api/uploadPictures',(req,res)=>{
    const vehicleID = req.body.vehicleID
    const pictureOrderID = req.body.pictureOrderID
    const pictureLocation = req.body.pictureLocation

    const sqlInsertImages = "INSERT INTO vehiclePictures (vehicleID, pictureOrderID, pictureLocation) VALUES (?,?,?)"
    db.query(sqlInsertImages,[vehicleID,pictureOrderID,pictureLocation],(err,result)=>{
        
        console.log(err);
    })
});
app.post('/api/insert', (req,res)=>{
    
    const year = req.body.year
    const make = req.body.make
    const model = req.body.model
    const miles = req.body.miles
    const description = req.body.description
    const price = req.body.price
    const status = req.body.status
    const date = req.body.date
    const vinNumber = req.body.vinNumber
    const stockNumber = req.body.stockNumber
    const vehicleReportURL = req.body.vehicleReportURL

    const sqlInsert = "INSERT INTO listings (year, make, model, miles, description,price,status, listingDate, vinNumber, stockNumber, historyReportURL) VALUES (?,?,?,?,?,?,?,?,?,?,?)"
    db.query(sqlInsert,[year,make,model,miles,description,price,status, date, vinNumber,stockNumber, vehicleReportURL],(err,result)=>{
        console.log(err);
        res.send(result);
    })
});
app.post('/api/insert/newCustomer', (req,res)=>{
    
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const phoneNumber = req.body.phoneNumber
    const address = req.body.address
    const city = req.body.city
    const state = req.body.state
    const zipCode = req.body.zipCode

    const sqlInsertCustomer = "INSERT INTO customer (firstName, lastName, address, city, state,phoneNumber,zipCode) VALUES (?,?,?,?,?,?,?)"
    db.query(sqlInsertCustomer,[firstName,lastName,address,city,state,phoneNumber,zipCode],(err,result)=>{
        console.log(err);
        res.send(result);
    })
});
app.post('/api/insert/newVehicle', (req,res)=>{
    
    const year = req.body.year
    const make = req.body.make
    const model = req.body.model
    const vin = req.body.VIN

    const sqlInsertVehicle = "INSERT INTO vehicle (vehicleYear, vehicleMake, vehicleModel, VIN) VALUES (?,?,?,?)"
    db.query(sqlInsertVehicle,[year,make,model,vin],(err,result)=>{
        console.log(err);
        res.send(result);
    })
});
app.post('/api/insert/newInvoice', (req,res)=>{

    const customerID = req.body.customerID
    const vehicleID = req.body.vehicleID

    const sqlCreateInvoice = "INSERT INTO invoice (customerID, vehicleID) VALUES (?,?)"
    db.query(sqlCreateInvoice, [customerID, vehicleID], (err,result)=>{
        console.log(err);
        res.send(result);
    })
    
});
//Add Vehicle Repairs to the database
app.post('/api/insert/newRepair', (req,res)=>{

    const invoiceID = req.body.invoiceID
    const itemName = req.body.itemName
    const hours = req.body.hours
    const laborRate = req.body.laborRate

    const sqlAddRepair = "INSERT INTO invoiceLineItem (invoiceID, itemName, hours, laborRate) VALUES (?,?,?,?)"
    db.query(sqlAddRepair, [invoiceID, itemName, hours, laborRate], (err,result)=>{
        console.log(err);
        res.send(result);
    })
    
});
//Add Reapair Parts to the DB
app.post('/api/insert/addParts', (req,res)=>{

    const invoiceID = req.body.invoiceID
    const repairLineItemID = req.body.repairLineItemID
    const partName = req.body.partName
    const partPrice = req.body.partPrice

    const sqlAddRepair = "INSERT INTO repairParts (invoiceID,repairLineItemID, partName, partPrice) VALUES (?,?,?,?)"
    db.query(sqlAddRepair, [invoiceID,repairLineItemID, partName, partPrice], (err,result)=>{
        console.log(err);
        res.send(result);
    })
    
});
//
//DELETE REQUEST
//
app.delete('/api/delete/:carID', (req,res)=>{
    const carID = req.params.carID
    const sqlDelete = "DELETE FROM `seventy-1auto`.listings WHERE listingID = ?";
    db.query(sqlDelete, carID, (err, result)=>{
       if (err) console.log(err)
    })
})
app.delete('/api/delete/picture/:pictureID', (req,res)=>{
    const carID = req.params.pictureID
    const sqlDeletePicture = "DELETE FROM `seventy-1auto`.vehiclePictures WHERE pictureID = ?";
    db.query(sqlDeletePicture, carID, (err, result)=>{
        res.send(result);
       if (err) console.log(err)
    })
})
//
//PUT REQUEST
//
app.put('/api/update/', (req,res)=>{
    const year = req.body.year
    const make = req.body.make
    const model = req.body.model
    const miles = req.body.miles
    const description = req.body.description
    const price = req.body.price
    const status = req.body.status
    const date = req.body.date
    const vinNumber = req.body.vinNumber
    const stockNumber = req.body.stockNumber
    const listingID = req.body.listingID
    const vehicleReportURL = req.body.vehicleReportURL
    const listingDate = req.body.listingDate
    const salePrice = req.body.salePrice
    const saleDate = req.body.saleDate
    const sqlUpdate = "UPDATE `seventy-1auto`.listings SET year = ? , make = ?, model = ?, miles = ?, price = ?, vinNumber = ?, stockNumber = ?, description = ?, historyReportURL = ?, status = ?, listingDate = ?, saleDate = ?, salePrice = ?  WHERE listingID = ?";
    db.query(sqlUpdate, [year,make,model,miles,price,vinNumber,stockNumber,description,vehicleReportURL,status, listingDate,saleDate, salePrice, listingID], (err, result)=>{
        res.send(result);
       if (err) console.log(err)
    })
})
app.put('/api/update/images',(req,res)=>{
    const pictureID = req.body.pictureID
    const pictureOrderID = req.body.pictureOrderID
    const sqlUpdateImages = "UPDATE `seventy-1auto`.vehiclePictures SET pictureOrderID = ? WHERE pictureID = ?";
    db.query(sqlUpdateImages, [pictureOrderID, pictureID],(err, result)=>{
        res.send(result);
        if (err) console.log(err)
    })
})
app.put('/api/update/sale',(req,res)=>{
    const salePrice = req.body.salePrice
    const saleDate = req.body.saleDate
    const listingID = req.body.listingID
    const sqlUpdateSale = "UPDATE `seventy-1auto`.listings SET status = 'Sold' , salePrice = ?, saleDate = ? WHERE listingID = ?";
    db.query(sqlUpdateSale, [salePrice, saleDate, listingID],(err, result)=>{
        res.send(result);
        if (err) console.log(err)
    })
})
//Update Invoice Information with Miles,Date,Recommendations
app.put('/api/update/invoice',(req,res)=>{
    const invoiceNumber = req.body.invoiceNumber
    const currentMiles = req.body.currentMiles
    const taxRate = req.body.taxRate
    const invoiceDate = req.body.invoiceDate
    const vehicleRecommendations = req.body.vehicleRecommendations
    const updateInvoice = "UPDATE `seventy-1auto`.invoice SET vehicleMileage = ?, taxRate = ?, date = ? , recommendations = ? WHERE invoiceID = ?";
    db.query(updateInvoice, [currentMiles, taxRate, invoiceDate, vehicleRecommendations,invoiceNumber],(err, result)=>{
        res.send(result);
        if (err) console.log(err)
    })
})
app.listen(3004, () =>{
    console.log("running on port 3004");
});