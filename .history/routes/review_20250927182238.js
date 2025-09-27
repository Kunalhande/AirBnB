const express = require("express");
const router= express.Router();
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const { listingSchema, reviewSchema  } =require("../schema.js");
const Review = require("../models/review");


//reviews
//post review-route
router.post("/",validateReview, wrapAsync(async (req, res) => {
  let listing = await Listing.findById(req.params.id); // Use model 'Listing'
  let newReview = new Review(req.body.review);         // Use model 'Review'

  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();

  res.redirect(`/listings/${listing._id}`);
}));

//Delete  REview-Route
router.delete("/:reviewId", wrapAsync(async(req,res) =>{
    let {id, reviewId } =req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/listings/${id}`)
}));

module.exports = router;