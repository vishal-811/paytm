const express =require('express');
const { authMiddleware } = require('../middleware');
const {Account} =require('../db/index');
const router =express.Router();
const mongoose  =require('mongoose');
// Route to get the balance 
router.get('/balance' ,authMiddleware ,async(req,res)=>{
        try {
            const account =await Account.findOne({
                userId:req.userId
            })
            res.status(200).json({balance: account.balance});
        } catch (error) {
             res.status(411).json({msg:"something went wrong in fetching balance"})
        }
})

// Transfer route 
router.post('/transfer',authMiddleware ,async(req,res)=>{
     const session = await mongoose.startSession();  //used to perform set of operations sequentaily.
     session.startTransaction();
     
     try {
        const { amount , to } = req.body;
        const account =await Account.findOne({userId:req.userId}).session(session);
        if(!account || account.balance<amount){
            await session.abortTransaction();
            
           return res.status(400).json({msg:"Insufficient balance"});
        }
  
        const toaccount = await Account.findOne({userId:to}).session(session);
        if(!toaccount){
          await session.abortTransaction();
          return res.status(400).json({msg:"Invalid account"});
        }
  
        await Account.updateOne({
           userId:req.userId
          },
          {
              $inc:{
                  balance:-parseInt(amount)
              }
          })
         
          await Account.updateOne({
              userId:to
          },
          {
              $inc:{
                  balance:parseInt(amount)
              }
          })
          
          // commit the transaction
          await session.commitTransaction();
          res.status(200).json({msg:"Transfer Successful"});
  
     } catch (error) {
         res.status(400).json({msg:"something went wrong, failed transaction"})
     }finally{
          session.endSession();
     }
}) 

module.exports=router;