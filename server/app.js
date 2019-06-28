
  
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
var CONFIG = require('../config/CONFIG')
const logger = require('morgan');



const app = express()
app.use(cors())



//headers
aapp.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin,Content-Type, Authorization, x-id, Content-Length, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

//body parser for form data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(logger('dev'));
// secure apps by setting various HTTP headers
app.use(helmet())
// enable CORS - Cross Origin Resource Sharing

app.options('*', cors()); 


//fetching index from react
app.use(express.static(path.join(__dirname, '../client/build')));
app.get('*', (req, res) => {
  res.send(express.static(path.join(__dirname, '../client/build/index.html')))  ;
});

app.use('/api/login' ,userRoute.login)











  
  
  app.listen(CONFIG.port, (err) => {
    if (err) {
      console.log(err)
    }
    console.info('Server started on port %s.', CONFIG.port)
  })
  
  module.exports = app

 app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({"error" : err.name + ": " + err.message})
    }
  })


