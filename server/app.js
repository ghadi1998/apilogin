
  
  var express = require('express');
var path = require('path');
var cors= require('cors')
var bodyParser=require("body-parser");
var helmet= require('helmet')
var compress= require('compress')
var cookieParser= require('cookie-parser')
var db = require ('./server')
var userRoute = require ("./routes/user")
var axios = require("axios")
var config = require('../config/config')




const app = express()
app.use(cors())



//headers
app.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
	  
   next()
});

//body parser for form data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

// secure apps by setting various HTTP headers
app.use(helmet())
// enable CORS - Cross Origin Resource Sharing

app.options('*', cors()); 


//fetching index from react
app.use(express.static(path.join(__dirname, '../client/build')));
app.get('*', (req, res) => {
  res.send(express.static(path.join(__dirname, '../client/build/index.html')))  ;
});

app.post('/api/login', userRoute.login , function(req,res){

      res.send(req.body)
  console.log(req.body)
})




app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({"error" : err.name + ": " + err.message})
    }
  })
  
  
  app.listen(config.port, (err) => {
    if (err) {
      console.log(err)
    }
    console.info('Server started on port %s.', config.port)
  })
  
  module.exports = app

 
