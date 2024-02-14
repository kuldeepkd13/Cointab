const express = require("express");

const app =  express()


app.use(express.json());


app.get('/',(req,res)=>{
    res.send("hello")
})

app.listen(4500,()=>{
    console.log("server is running");
})