const Inappropriate = require("../models/inappropriate");

module.exports = (async function(req, res, next) {
    try{
      const {username} = req.body;
      const words = await Inappropriate.find({word: {$regex: new RegExp(username,'i') }});
        console.log(`We have this username name: ${username} and the words found are: ${words}`);
      if(words.length > 0){
        return res.status(400).json({ error: "Username contains an inappropriate word!" });
      }else{
        next();
      }
    }catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
      }
 });
