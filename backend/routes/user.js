require('dotenv').config();
const express =require('express');
const router =express.Router();
const { User, Account } =require('../db/index')
const {z, string} =require('zod');
const jwt =require("jsonwebtoken");
const secret_key =process.env.JWT_SECRET;
const bcrypt =require('bcrypt');
const { authMiddleware } = require('../middleware');
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

const updateSchema =z.object({
    password:z.string().min(6).optional(),
    firstname:z.string().optional(),
    lastname:z.string().optional()
})

// signup route
router.post('/signup',async(req,res)=>{   
const validate =signupSchema.safeParse(req.body)
if(!validate.success){
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
        
                // Given a random balance to user.
                    await Account.create({
                        userId,
                        balance:1+Math.random() *10000
                    })
            
                    const token =jwt.sign({userId} ,secret_key);
                    res.status(201).json({msg:"User Created Successfully",token:token});
        } catch (error) {

            res.status(411).json({msg:"something went wrong"})
        }
    }
})

// signin route
router.post('/signin',async(req,res)=>{
    const validate =signinSchema.safeParse(req.body);
    if(!validate.success){
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
            res.status(200).json({msg:"user signin succesfully",token:"Bearer "+token})
        } 
    }
})

router.put('/',authMiddleware,async (req,res)=>{
      const validate =updateSchema.safeParse(req.body);
      if(!validate.success){
        return res.status(411).json({msg:"invalid inputs"})
      }
      
      try {
        console.log(req.body);
          await User.findOneAndUpdate({_id:req.userId},req.body)
           res.status(201).json({msg:"updated successfully"});
      } catch (error) {
          res.status(411).json({msg:"Error while updating user"})
      }
})

router.get('/bulk',async(req,res)=>{
   const filter =req.query.filter;
   
   const users = await User.find({
    $or: [{
        firstname: { "$regex": filter }
    }, {
        lastname: { "$regex": filter }
    }]
})
         res.status(200).json({
            user:users.map(user =>({
                username:user.username,
                firstname:user.firstname,
                lastname:user.lastname,
                _id:user._id
            }))
         })
})

module.exports=router;