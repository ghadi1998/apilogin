var  Sequelize = require('sequelize')
var app = require('./app')
var config = require('../config/config')
const db = {}


const sequelize = new Sequelize ("users" , "root" , "" ,{

        host:'localhost',
        dialect:'mysql',
        operatorAliases:false,

        pool:{
            max:5,
            min:0,
            acquire:30000,
            idle:10000
        }

})

console.log('alright')


db.sequelize=sequelize
db.Sequelize=Sequelize




export default db






  