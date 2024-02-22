require('dotenv').config();
const mongoose =require('mongoose');
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

const User =mongoose.model("User",userSchema)

module.exports={
    User
}