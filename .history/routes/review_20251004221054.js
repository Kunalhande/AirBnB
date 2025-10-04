const express = require("express");
const router= express.Router({ mergeParams: true});
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const Review = require("../models/review");
const Listing = require("../models/listing");
const { validateReview,isLoggedIn } = require("../middleware.js");


//reviews
//post review-route
router.post("/",validateReview,isLoggedIn, wrapAsync(async (req, res) => {
  let listing = await Listing.findById(req.params.id); // Use model 'Listing'
  let newReview = new Review(req.body.review);         // Use model 'Review'
  newReview.author = req.user._id;
  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();
  req.flash("success", "New review created !");
  res.redirect(`/listings/${listing._id}`);
}));

//Delete  REview-Route
router.delete("/:reviewId", wrapAsync(async(req,res) =>{
    let {id, reviewId } =req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "review Deleted !");
    res.redirect(`/listings/${id}`)
}));

module.exports = router;