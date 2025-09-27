const express = require("express");
const router= express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { listingSchema, reviewSchema  } =require("../schema.js");
const ExpressError = require("../utils/ExpressError");
const Listing = require("../models/listing");

const wrapAsync = require("../utils/wrapAsync");
console.log(wrapAsync);  // should print [Function: wrapAsync]



const validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(",");
    throw new ExpressError(400, msg);
  } else {
    next();
  }
};

//Index Route
router.get("/", wrapAsync(async (req,res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", {allListings})
    }));
    
// New Route put this BEFORE the show route
router.get("/new", wrapAsync(async(req,res) => {
    res.render("listings/new.ejs");
}));

//Show Route
router.get("/:id", wrapAsync(async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate("reviews"); 
    res.render("listings/show",{listing});
}));  

//Create Route
router.post("/", 
    validateListing,
     //let {title,description, image, price, country, location} = req.body;
    wrapAsync(async (req,res) =>{
        const newListing = new Listing(req.body.listing);
        await newListing.save();
        res.redirect("/listings");
    })
    
);


//Edit Route
router.get("/:id/edit", wrapAsync(async(req,res)=>{
     let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit",{listing})
}))

//Update
router.put("/:id",
    validateListing,
     wrapAsync(async(req,res) =>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
}));

//Delete Route
router.delete("/:id", wrapAsync(async(req,res) =>{
    let {id} =req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
}));

module.exports = router;
