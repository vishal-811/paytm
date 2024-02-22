require('dotenv').config();
const jwt =require('jsonwebtoken');
const secret_key =process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')){
         res.status(401).json({msg:"please login to access the page"})
    }
    const token =authHeader.split(' ')[1];

    try {
        const decoded =jwt.verify(token,secret_key)
        if(!decoded){
            res.status(401).json({msg:"invalid token"})
        }
        req.userId = decoded.userId
      next();
    } catch (error) {
        res.status(401).json({msg:"verification failed"})
    }
}

module.exports={
    authMiddleware
}