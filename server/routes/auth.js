const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const inappropriateWords = require("..//middleware/inappropriateWords")
const router = express.Router();
const bcrypt = require("bcrypt");
const auth = require("..//middleware/auth");
const dotenv = require("dotenv");
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    
    const user = await User.findOne({ username });
  
    if (!user) return res.status(400).send("Invalid username or password.");
  
    const validPassword = await bcrypt.compare(password, user.password);
  
    if (!validPassword)
      return res.status(400).send("Invalid username or password.");
  
    const token = jwt.sign({ userId: user.id }, SECRET_KEY);

    res.send({ token });
});

router.post("/register", inappropriateWords, async (req, res) => {
    try {
      const { username, password, email } = req.body;
  
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists." });
      }

      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ error: "Email address already exists." });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const user = new User({
        username,
        password: hashedPassword,
        email,
      });
  
      const savedUser = await user.save();
      res.json({
        message: "User registered successfully",
        userId: savedUser._id,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  router.get("/userdetails",auth,async (req,res) => {
    try{
      const user = await User.findById(req.userId).select("-password");
      console.log(`User Details: ${user}.` );
      res.json(user);
    }catch(error){
      console.log(error);
      res.status(500).send({error: "Internal server error"});
    }
  });
  
  module.exports = router;