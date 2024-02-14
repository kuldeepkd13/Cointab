const express = require("express");
const { connection } = require("./config/db")
const cors = require("cors");
const { userRoute } = require("./route/userRoute");
const { postRoute } = require("./route/postRoute");

require('dotenv').config();

const app =  express()

app.use(express.json());
app.use(cors())


app.get("/",(req,res)=>{
    res.send("hello")
})

app.use("/user" , userRoute)
app.use("/post", postRoute)

app.listen(4500,async()=>{
    try {
        await connection
        console.log("connected to mongoose")
    } catch (error) {
        console.log("not connected")
    }
    console.log("server is running");
})