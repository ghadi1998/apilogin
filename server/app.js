
  
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




fetch("http://localhost:3001/api/login", {"credentials":"omit","headers":{"accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3","accept-language":"en-GB,en;q=0.9,en-US;q=0.8,ar;q=0.7,pt;q=0.6","cache-control":"max-age=0","if-none-match":"W/\"6cc-gCE7WmwumEcbJBh2aiQCo0ieb7c\"","upgrade-insecure-requests":"1"},"referrerPolicy":"no-referrer-when-downgrade","body":req.body,"method":"GET","mode":"cors"}); ;







  
  
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


