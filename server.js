// Include express
const express = require('express');
const webApp = express();
//include paypal
const paypal = require('paypal-rest-sdk');
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
    { email: 'jawahirah@gmail.com', name: 'jawahirah', password: '1234', cart:[{itemName:'none',numberOfItems:0,cost:0}], totalCost:0}
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



//paypal

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'ATikV68RhiGEfXm5ds59CyozvwSpavdMFHv1dDUQyC87O5NNlYvJ60dLUx9QwwFmmIhb5pJUTvU-p58U',
    'client_secret': 'EM6ODtSidL01YKbycpwvFyxNIPzPatZZXwIYzX1KenBPXm3CGCaF3SiOnY1qL3hGCjXKyyPgnEiLXyAr'
  });

 
  webApp.get('/', (req, res) => res.sendFile(__dirname + "/payment.html"));
  //Payment handler... don't change the currency
  webApp.post('/pay', (req, res) => {
    const create_payment_json = {
      "intent": "sale",
      "payer": {
          "payment_method": "paypal"
      },
      "redirect_urls": {
          "return_url": "http://localhost:8080/success",
          "cancel_url": "http://localhost:8080/cancel"
      },
      "transactions": [{
          "item_list": {
              "items": [{
                  "name": "Red Sox Hat",
                  "sku": "001",
                  "price": "25.00",
                  "currency": "USD",
                  "quantity": 1
              }]
          },
          "amount": {
              "currency": "USD", 
              "total": "25.00"
          },
          "description": "Hat for the best team ever"
      }]
  };
  //Success  handler
  webApp.get('/success', (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
  
    const execute_payment_json = {
      "payer_id": payerId,
      "transactions": [{
          "amount": {
              "currency": "USD",
              "total": "25.00"
          }
      }]
    };
  
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
      if (error) {
          console.log(error.response);
          throw error;
      } else {
          console.log(JSON.stringify(payment));
          res.send('Success');
      }
  });
  });
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            for(let i = 0;i < payment.links.length;i++){
              if(payment.links[i].rel === 'approval_url'){
                res.redirect(payment.links[i].href);
              }
            }
        }
      });
      
      });

     // Transaction cancellation
      webApp.get('/cancel', (req, res) => res.send('Cancelled'));
