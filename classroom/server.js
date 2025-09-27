const express = require("express");
const app = express();

app.get("/", (req,res) =>{
    res.send("Hi, welcome here man");
});

//Routes for users
//index route
app.get("/user", (req,res) =>{
    res.send("GET for user ");
});

//show - users
app.get("/user/:id", (req,res) =>{
    res.send("GET for show user id");
})

//POST - user
app.post("/user", (req,res) =>{
    res.send("POST for users");
});

//new - user
app.delete("/user/:id", (req,res) =>{
    res.send("DELETE for users id");
});


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