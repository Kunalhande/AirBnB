const require = require("express");
const router = express.Router();


//Routes for users
//index route
router.get("/user", (req,res) =>{
    res.send("GET for user ");
});

//show - users
router.get("/user/:id", (req,res) =>{
    res.send("GET for show user id");
})

//POST - user
router.post("/user", (req,res) =>{
    res.send("POST for users");
});

//new - user
router.delete("/user/:id", (req,res) =>{
    res.send("DELETE for users id");
});

module.exports = router ;
