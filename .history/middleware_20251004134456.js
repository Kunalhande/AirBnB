const Listing = require("./models/listing");
const { listingSchema, reviewSchema  } =require("./schema.js");
const ExpressError = require("./utils/ExpressError");
const { listingSchema, reviewSchema  } =require("./schema.js");

const isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to create listing!")
        return res.redirect("/login")
    }
    next();
}

module.exports = isLoggedIn;

module.exports.saveRedirectUrl = (req,res,next) => {
    if(req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async(req,res,next) =>{
    let {id} = req.params;
    let Listing = await Listing.findById(id);
    if(currUser && !Listing.owner.equals(res.locals.currUser._id)){
        req.flash("error", "You are not the owner of the listing.");
        return res.redirect(`/listings/${id}`)
    }
    next();
};module.exports.validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(",");
    throw new ExpressError(400, msg);
  } else {
    next();
  }
};

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(",");
    throw new ExpressError(400, msg);
  } else {
    next();
  }
};


