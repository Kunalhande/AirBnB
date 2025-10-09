const express = require("express");
const router= express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing");
const { isLoggedIn, isOwner, validateListing, validateReview} = require("../middleware.js");
const multer = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

const  listingController = require("../controllers/listing.js")



// console.log("wrapAsync:", wrapAsync);
// console.log("isLoggedIn:", isLoggedIn);
// console.log("Listing:", Listing);  

router
.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn, 
    
    upload.single("listing[image]"),
    validateListing,
     //let {title,description, image, price, country, location} = req.body;
    wrapAsync(listingController.createListing)
)


// New Route put this BEFORE the show route
router.get("/new", isLoggedIn, wrapAsync(listingController.renderNewForm));


//Show Route,Update,Delete Route
router.
route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,
    isOwner,
    validateListing,
    wrapAsync(listingController.updateListing)
)
.delete(isLoggedIn,
    isOwner, 
    wrapAsync(listingController.deleteListing)
);


//Edit Route
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditForm));

module.exports = router;
 