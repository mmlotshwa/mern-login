const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

module.exports = function(req,res,next){
    const token = req.header("Authorization");
  
    if(!token)
        return res.status(401).json({ error: "Authorization token required" });

    try{
        const decodeToken = jwt.verify(token, SECRET_KEY);
        req.userId = decodeToken.userId;
        next();
    }catch(error){
        return res.status(401).json({ error: "Token is not valid"});
    }
  }; 