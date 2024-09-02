const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const cors = require("cors"); // Import the CORS middleware
const dotenv  =require("dotenv");
dotenv.config();

const app = express();

mongoUri = process.env.MONGO_URI;
port = process.env.PORT;

mongoose.connect("mongodb://localhost:27017/mernlogin").then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

app.use(cors()); // Use CORS middleware to allow requests from the frontend
app.use(express.json());
app.use("/api/auth", authRoutes); 
// All the routes defined in auth.js will be prefixed with /api/auth

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 

