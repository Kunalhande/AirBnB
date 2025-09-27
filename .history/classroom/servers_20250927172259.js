const express = require("express");
const app = express();
const users = require("./routes/users.js");
const posts = require("./routes/posts.js");

app.get("/", (req,res) =>{
    res.send("Hi, welcome here man");
});

app.use("/users", users);
app.use("/posts", posts);


app.listen(3000, () =>{
    console.log("Server is listening on the port 3000");
})