const express = require("express");
const router = express.Router();



//Routes for users
//index route
router.get("/", (req,res) =>{
    res.send("GET for user ");
});

//show - users
router.get("/:id", (req,res) =>{
    res.send("GET for show user id");
})

//POST - user
router.post("/new", (req,res) =>{
    res.send("POST for users");
});

//new - user
router.delete("/:id/edit", (req,res) =>{
    res.send("DELETE for users id");
});

module.exports = router ;
