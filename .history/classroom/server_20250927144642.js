const express = require("express");
const app = express();
const user = require("./routes/user.js");

app.get("/", (req,res) =>{
    res.send("Hi, welcome here man");
});

app.use("/user", user);

//Routes for posts
//index route -post 
app.get("/posts", (req,res) =>{
    res.send("GET for posts");
});

//show - post
app.get("/posts/:id", (req,res) =>{
    res.send("GET for show posts id");
})

//POST - post 
app.post("/posts", (req,res) =>{
    res.send("POST for possts");
});

//new - post
app.delete("/posts/:id", (req,res) =>{
    res.send("DELETE for posts id");
});


app.listen(3000, () =>{
    console.log("Server is listening on the port 3000");
})