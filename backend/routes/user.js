require('dotenv').config();
const express =require('express');
const router =express.Router();
const {User} =require('../db/index')
const {z} =require('zod');
const jwt =require("jsonwebtoken");
const secret_key =process.env.JWT_SECRET;
const bcrypt =require('bcrypt');

const signupSchema  = z.object({
    username:z.string(),
    password:z.string().min(6),
    firstname:z.string(),
    lastname:z.string()
})

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


module.exports=router;