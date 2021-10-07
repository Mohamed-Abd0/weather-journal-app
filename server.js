
    /******************  [1] set up the server *****************/

// get the express module to make our server
const express = require('express');

// Start up an instance of app
const app = express();

// define the port 
const port = 8000;

// that function will fire when the server run 
const listen_to_browser = ()=>console.log(`the server is runing now on port : ${port} and all is ok ` )

// open a server with port 8000 to listen to the browser 
app.listen(port , listen_to_browser());






/************* [2] Middlewares ***************/

//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: false }));
// support parsing of application/json type post data
app.use(bodyParser.json());

// get cors module
const cors = require('cors');

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder (default file is [indext.html])
app.use(express.static('website'));








/************* [3] handle the post and get requests  ************/

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// this arrow function to handle the post request with rout ('/add')
const postData = (req ,res)=>{
    //put the receved data into our projectData opject
    projectData = req.body;
    // check if we get the data or not 
    console.log(projectData);
    console.log('all done')
}

// handle the post request from the clinte side 
app.post('/add' , postData);

// this arrow function to handle the get request with rout ('/all')
const getAllData = (req ,res)=>{
    // send the data in our projectData object to the clinte side 
    res.send(projectData)

    // reset the project data
    projectData={}
}

// handle the get request from the clinte side 
app.get('/all' , getAllData);


