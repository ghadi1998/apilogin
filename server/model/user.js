var Sequelize=require("sequelize")
var db = require("../database/database")





module.exports = (sequelize, type ) => 
{  db.Sequelize.define('user',
{
        user_id: {
              type:Sequelize.INTEGER,
                 primaryKey:true,
                     autoIncrement:true
    },

        first_name:{
             type:Sequelize.STRING,
                trim: true,
    },
        last_name:{
             type:Sequelize.STRING,
               trim: true,
},
user_name:{
  type:Sequelize.STRING,
    trim: true,
},
        email: {
               type: Sequelize.String,
               unique:true,
               trim: true,
                   
  },
  created_date: {
                        type: Sequelize.Date,
                             defaultValue: Sequelize.NOW
                             },

          password:{
                type:Sequelize.STRING
                    }
        
             
    },
    {
      // The `timestamps` field specify whether or not the `createdAt` and `updatedAt` fields will be created.
      // This was true by default, but now is false by default
     
      timestamps: false , 
      freezeTableName: true,
      tableName: 'user'
    }
)

  }


