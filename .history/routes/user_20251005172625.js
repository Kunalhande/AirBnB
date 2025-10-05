const express = require("express");
const router= express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { isLoggedIn, isOwner, validateListing, validateReview,saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js");


router.get("/signup", (req,res)=>{
    res.render("users/signup.ejs");
});

router.post("/signup" , wrapAsync());

router.get("/login", (req,res) =>{
    res.render("users/login.ejs")
});

router.post("/login",saveRedirectUrl, passport.authenticate("local",{ failureRedirect: `/login`, failureFlash: true }), async(req,res)=>{
    req.flash("success","Welcome back to Herapheri !");
    let redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl);
});

router.get("/logout", (req,res,next) =>{
    req.logout((err) =>{
        if(err){
          return next(err)
        }
        req.flash("success", "you are logged out now");
        res.redirect("/listings");
    })
})



module.exports = router;