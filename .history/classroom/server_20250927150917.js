const express = require("express");
const app = express();
const user = require("./user.js");
const posts = require("./post.js");

app.get("/", (req,res) =>{
    res.send("Hi, welcome here man");
});

app.use("/user", user);
app.use("/posts", posts);


app.listen(3000, () =>{
    console.log("Server is listening on the port 3000");
})