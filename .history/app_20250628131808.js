const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.get("/", (req,res) =>{
    res.send("Hi, I am root");
})

app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});