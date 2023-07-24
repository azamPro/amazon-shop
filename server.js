// Include express
const express = require('express');
const webApp = express();
// Include body-parser 
const bodyParser = require('body-parser');
// Configuring express to use body-parser as middle-ware
webApp.use(bodyParser.urlencoded({ extended: false }));
webApp.use(bodyParser.json());
// Include CORS 
const cors = require('cors');
webApp.use(cors());
// Connects the server-side to the client-side 
webApp.use(express.static('website'));

const port = 8080;
webApp.listen(port,()=>{
    console.log('The server is up and running')
})

webApp.get('/retrieve',(req,res)=>{
    
    res.send({user:'55'})
})