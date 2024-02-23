require('dotenv').config();
const mongoose =require('mongoose');
const { Schema } = require('zod');
const url =process.env.MONGO_URL;
mongoose.connect(url);

const userSchema =new mongoose.Schema({
    username:{
        type:String,
        required:[true,"username  is required"]
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    firstname:{
        type:String,
    },
    lastname:{
        type:String,
    }
},
{
    timestamps:true
})

// Account schema
const accountSchema =new mongoose.Schema({
     userId:{
        type:mongoose.Schema.Types.ObjectId,  //Refrence to user model
        ref:'User',
        required:true
     },
     balance:{
        type:Number,
        required:true
     }
})

const User =mongoose.model("User",userSchema)
const Account =mongoose.model("Account",accountSchema)

module.exports={
    User,
    Account
}