const express = require("express");
const router= express.Router({ mergeParams: true});
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const Review = require("../models/review");
const Listing = require("../models/listing");
const { isLoggedIn, isOwner, validateListing, validateReview, isReviewAuthor } = require("../middleware.js");

const reviewController =require("../controllers/reviews.js");




//reviews
//post review-route
router.post("/",validateReview,isLoggedIn, wrapAsync(reviewController.createReviews));

//Delete  REview-Route
router.delete("/:reviewId",
   isLoggedIn,
   isReviewAuthor,
    wrapAsync(reviewController.deleteReview));

module.exports = router;