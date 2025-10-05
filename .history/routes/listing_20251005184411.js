const express = require("express");
const router= express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing");
const { isLoggedIn, isOwner, validateListing, validateReview} = require("../middleware.js");

const  listingController = require("../controllers/listing.js")



// console.log("wrapAsync:", wrapAsync);
// console.log("isLoggedIn:", isLoggedIn);
// console.log("Listing:", Listing);

router
.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn, 
    validateListing,
     //let {title,description, image, price, country, location} = req.body;
    wrapAsync(listingController.createListing)
);


//Show Route,Update,Delete Route
router.
route("/:id")
.get("/:id",
     wrapAsync(listingController.showListing))
.put("/:id",
    isLoggedIn,
    isOwner,
    validateListing,
    wrapAsync(listingController.updateListing)
)
.delete("/:id",
    isLoggedIn,
    isOwner, 
    wrapAsync(listingController.deleteListing)
);

// New Route put this BEFORE the show route
router.get("/new", isLoggedIn, wrapAsync(listingController.renderNewForm));


//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;
 