const express = require('express');
const { PostModel } = require('../model/postModel');
const postRoute = express.Router();

// POST route to add bulk post data
postRoute.post('/addBulkPosts', async (req, res) => {
    try {
        const postsData = req.body; 

      
        const insertedPosts = await PostModel.insertMany(postsData);

        
        return res.status(200).send({ message: "Bulk posts added successfully", insertedPosts });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
});


postRoute.get('/checkUserId/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

       
        const user = await PostModel.findOne({ userId });

        if (user) {
            
            return res.status(200).send({ exists: true, message: "User ID exists in the database" });
        } else {
           
            return res.status(404).send({ exists: false, message: "User ID does not exist in the database" });
        }
    } catch (error) {
        console.error(error);
        
        return res.status(500).send({ exists: false, message: "Internal Server Error" });
    }
});

module.exports = {postRoute};
