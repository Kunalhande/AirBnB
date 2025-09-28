const express = require("express");
const app = express();
const users = require("./routes/users.js");
const posts = require("./routes/posts.js");
const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.get("getsignedcookie", (req,res) =>{
    res.cookie("made-in", "india", {signed: true}),
    res.send("signed cookie sent");
});

app.get("/verify", (req,res) =>{
    console.log(req.signedCookies);
    res.send("verified");
})

app.get("/greet", (req,res) =>{
    let { name ="anonymous"} = req.cookies;
    res.send(`Hi, ${name}`);
})

app.get("/getcookies", (req,res) =>{
    res.cookie("greet", "hello");
    res.cookie("madein", "India");
    res.send("send you some cookies!");
})

app.get("/", (req,res) =>{
    console.dir(req.cookies);
    res.send("Hi, welcome here man");
});

app.use("/users", users);
app.use("/posts", posts);


app.listen(3000, () =>{
    console.log("Server is listening on the port 3000");
})