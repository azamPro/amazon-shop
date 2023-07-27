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
webApp.listen(port, () => {
    console.log('The server is up and running')
})


// send email and passwords 
// loop through the array and check the email and passwords
//          respond with  1 if the user correct credentials 
//          respond with -1 if the user incorrect credentials 
webApp.get('/retrieve', (req, res) => {

let user = authenticationLogin(decodeURIComponent(req.query.email), decodeURIComponent(req.query.password))

    if (user === false) {
        console.log(user)
        res.json({ success: false })
    } else {
        console.log(user)
        res.json(user)

    }

})

// New User Registration
webApp.post('/addUser',(req,res)=>{
    if(isTheEmailUsed(req.body.email)){
        res.send('-1')
    }else{
        users.push(req.body)
        res.send('1')
    }
})

let users = [
    { email: 'jawahirah@gmail.com', name: 'jawahirah', password: '1234', cart:[], totalCost:0}
]

// Check user login credentials
let authenticationLogin = (email, password) => {
    for (let i = 0; i < users.length; i++) {
        if (users[i].email.toLowerCase() === email.toLowerCase() && users[i].password.toLowerCase() === password.toLowerCase()) {
            return users[i];
        }
    }
    return false
}

// Check if the email is already used 
let isTheEmailUsed= (email)=>{
    for(let i = 0; i< users.length;i++){
        if(users[i].email.toLowerCase() == email.toLowerCase()){
            return true;
        }
    }
    return false;
}

