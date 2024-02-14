const express = require("express");
const { UserModel } = require("../model/userModel");

const userRoute = express.Router()


userRoute.get("/userdata", async (req, res) => {
    try {
      const data = await UserModel.find();
  
      if (data.length === 0) {
        return res.status(400).send({ "message": "No User Data" });
      }
  
      // Extracting user IDs from the data
      const allUserIDs = data.map(user => user.userId);
  
      return res.status(200).send({ "userIDs": allUserIDs });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ "message": "Internal Server Error" });
    }
  });


  userRoute.post("/addUser" , async(req,res)=>{
    try {
        const {email , name , phone, website, city, company, userId} = req.body

        const user = new UserModel({email , name , phone, website, city, company, userId})

        await user.save()
        return res.status(500).send({ "message": "Data is added to Database" });

    } catch (error) {
        return res.status(500).send({ "message": "Internal Server Error" });
    }
  })


  userRoute.get("/user/:id", async (req, res) => {
    try {

        const { id } = req.params;
      const data = await UserModel.findOne({userId:id});
  
      if (!data) {
        return res.status(400).send({ "message": "No User Data" });
      }
  
      // Extracting user IDs from the data
      
  
      return res.status(200).send({ "data": data });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ "message": "Internal Server Error" });
    }
  });
  
module.exports ={userRoute}
