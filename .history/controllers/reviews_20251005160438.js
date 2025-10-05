const Review = require("../models/review");
const Listing = require("../models/listing");

module.exports.createReviews = async (req, res) => {
  let listing = await Listing.findById(req.params.id); // Use model 'Listing'
  let newReview = new Review(req.body.review);         // Use model 'Review'
  newReview.author = req.user._id;
  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();
  req.flash("success", "New review created !");
  res.redirect(`/listings/${listing._id}`);
};