const Listing = require("./models/listing");

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
};