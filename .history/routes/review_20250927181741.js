const express = require("express");
const router= express.Router();


//reviews
//post review-route
router.post("/listings/:id/reviews",validateReview, wrapAsync(async (req, res) => {
  let listing = await Listing.findById(req.params.id); // Use model 'Listing'
  let newReview = new Review(req.body.review);         // Use model 'Review'

  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();

  res.redirect(`/listings/${listing._id}`);
}));

//Delete  REview-Route
router.delete("/listings/:id/reviews/:reviewId", wrapAsync(async(req,res) =>{
    let {id, reviewId } =req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/listings/${id}`)
}));

module.exports = router;