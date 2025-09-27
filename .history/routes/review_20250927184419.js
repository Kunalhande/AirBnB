const express = require("express");
const router= express.Router({ mergeParams: true});
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const { listingSchema, reviewSchema  } =require("../schema.js");
const Review = require("../models/review");
const Listing = require("../models/listing");

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(",");
    throw new ExpressError(400, msg);
  } else {
    next();
  }
};

//reviews
//post review-route
router.post("/",validateReview, wrapAsync(async (req, res) => {
    console.log(req.params.id);
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