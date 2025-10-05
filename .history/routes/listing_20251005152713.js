const express = require("express");
const router= express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing");
const { isLoggedIn, isOwner, validateListing, validateReview} = require("../middleware.js");

const  listingController = require("../controllers/listing.js")



// console.log("wrapAsync:", wrapAsync);
// console.log("isLoggedIn:", isLoggedIn);
// console.log("Listing:", Listing);



//Index Route
router.get("/", wrapAsync(listingController.index));
    
// New Route put this BEFORE the show route
router.get("/new", isLoggedIn, wrapAsync(listingController.renderNewForm));

//Show Route
router.get("/:id", wrapAsync(listingController.showListing));  

//Create Route
router.post("/",isLoggedIn, 
    validateListing,
     //let {title,description, image, price, country, location} = req.body;
    wrapAsync(listingController.createListing)
    
);


//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm));

//Update
router.put("/:id",
    isLoggedIn,
    isOwner,
    validateListing,
    wrapAsync(async(req,res) =>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    req.flash("success", "listing Updated !");
    res.redirect(`/listings/${id}`);
}));

//Delete Route
router.delete("/:id",isLoggedIn,isOwner, wrapAsync(async(req,res) =>{
    let {id} =req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "listing Deleted !");
    res.redirect("/listings");
}));

module.exports = router;
