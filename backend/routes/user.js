require('dotenv').config();
const express =require('express');
const router =express.Router();
const {User} =require('../db/index')
const {z, string} =require('zod');
const jwt =require("jsonwebtoken");
const secret_key =process.env.JWT_SECRET;
const bcrypt =require('bcrypt');

const signupSchema  = z.object({
    username:z.string(),
    password:z.string().min(6),
    firstname:z.string(),
    lastname:z.string()
})

const signinSchema  = z.object({
    username:z.string().email(),
    password:z.string()
})

// signup route
router.post('/signup',async(req,res)=>{   
const success =signupSchema.safeParse(req.body)
if(!success){
   return res.status(411).json({msg:"Invalid Inputs"})
}
    const alreadyuserexist = await User.findOne({username:req.body.username})
    if(alreadyuserexist){
        res.status(411).json({msg:"user already exist with this username or email"})
    }
    else{
        const password =req.body.password;
        const hashpassword = await bcrypt.hash(String(password),10);
        try {
            const user = await User.create({
                username:req.body.username,
                password:hashpassword,
                firstname:req.body.firstname,
                lastname:req.body.lastname
            })
                 const userId =user._id;
                const token =jwt.sign({userId} ,secret_key);
                res.status(201).json({msg:"User Created Successfully",token:token});
        } catch (error) {

            res.status(411).json({msg:"something went wrong"})
        }
    }
})

// signin route
router.post('/signin',async(req,res)=>{
    const success =signinSchema.safeParse(req.body);
    if(!success){
        res.status(411).json({msg:"Invalid Inputs"})
    }
    const checkuserexist =await User.findOne({username:req.body.username});
    if(!checkuserexist){
        res.status(411).json({msg:"user doesn't exist with this credentials"})
    }
    else{
        const password =req.body.password
        const checkpassword =await bcrypt.compare(String(password),checkuserexist.password)
        if(!checkpassword){
             res.status(411).json({msg:"Wrong password"});
        }
        else{
             const userId=checkuserexist._id;
             const token =jwt.sign({userId},secret_key)
            res.status(200).json({msg:"user signin succesfully",token:token})
        } 
    }
})

module.exports=router;