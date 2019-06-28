var jwt = require('jsonwebtoken');
var atob = require('atob');
var Cryptr = require('cryptr'),
cryptr = new Cryptr('1q2w3e4r5t6y7u8i9o0pp0o9i8u7y6t5r4e3w2q1');
var db = require('../server')

exports.signup=function(req , res){
    
    var fname  = req.body.first_name;
    var lname= req.body.last_name;
    var username = req.body.username;
    var pass= req.body.password;
    var email=req.body.email;
    var dec_pass =atob(toString(pass));
    var encrypted_pass = cryptr.encrypt(dec_pass);

    var sql = "INSERT INTO `user`(`user_id`,`first_name`,`last_name`,`user_name` , `email`,`password`) VALUES ('','" + fname + "','" + lname + "','" + username + "','" +email+ "','" +encrypted_pass+ "')";
         var query = db.query(sql, function(err, result){
            message = "Succesfully! Your account has been created.";
           console.log(req)
            res.render('signup.ejs');
            
            res.end(JSON.stringify(result));
   });

};

exports.login=function(req , res){
var name=req.body.username;
var pass= req.body.password;
var { name, pass} = req.body
var dec_pass =atob(toString(pass));
var encrypted_pass = cryptr.encrypt(dec_pass);

var sql="SELECT user_id, first_name, last_name, user_name FROM `user` WHERE `user_name`='"+name+"' and password = '"+encrypted_pass+"'";

db.query(sql, function(err, results){	
		 
    if(results != ""){
        
        console.log(JSON.stringify(results));
        
        var data = JSON.stringify(results);
        
        var secret = 'TOPSECRETTTTT';
           var now = Math.floor(Date.now() / 1000),
               iat = (now - 10),
               expiresIn = 3600,
               expr = (now + expiresIn),
               notBefore = (now - 10),
               jwtId = Math.random().toString(36).substring(7);
           var payload = {
               iat: iat,
               jwtid : jwtId,
               audience : 'TEST',
               data : data
           };	
           
        
        jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn : expiresIn}, function(err, token) {
               
           if(err){
               console.log('Error occurred while generating token');
               console.log(err);
               return false;
           }
            else{
           if(token != false){
               res.send(token);
               res.header();
               res.json({
                     "results":
                             {"status": "true"},
                     "token" : token,
                   "data" : results
                                   
                 });
               res.end();
           }
           else{
            res.status(400).json({ error: 'User does not exist' })
               res.end();
           }
           
            }
       });
   
    }
    else if(results == ""){
        
console.log('  NOT A USER ')
           
    }
});
};