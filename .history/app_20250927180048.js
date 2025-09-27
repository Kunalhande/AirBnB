const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing")
const path = require("path");
const method = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync");
const ExpressError = require("./utils/ExpressError");
const { listingSchema, reviewSchema  } =require("./schema.js");
const Review = require("./models/review")

const listings = require("./routes/listing.js");


const MONGO_URL ="mongodb://127.0.0.1:27017/test";

main().then(() =>{
    console.log("connected to DB");
}).catch(() =>{
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}



// app.get("/testListing", async(req,res) =>{
//      let sampleListing = new Listing ( {
//         title: "my new villa",
//         description:"its good",
//         price: 1200,
//         location: "Akole, maharashtra",
//         contry: "India",
//      });

//      await sampleListing.save();
//      console.log("Sample was saved");
//      res.send("successful testing");
// });

app.engine('ejs' ,ejsMate);
app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));  //to parse all data comes in request
app.use(method("_method"));
app.use(express.static(path.join(__dirname,"/public")));


app.get("/", (req,res) =>{
    res.send("Hi, I am root");
});



const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(",");
    throw new ExpressError(400, msg);
  } else {
    next();
  }
};


app.use("/listings", listings);


//reviews
//post review-route
app.post("/listings/:id/reviews",validateReview, wrapAsync(async (req, res) => {
  let listing = await Listing.findById(req.params.id); // Use model 'Listing'
  let newReview = new Review(req.body.review);         // Use model 'Review'

  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();

  res.redirect(`/listings/${listing._id}`);
}));

//Delete  REview-Route
app.delete("/listings/:id/reviews/:reviewId", wrapAsync(async(req,res) =>{
    let {id, reviewId } =req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/listings/${id}`)
}));

// app.use((err,req,res,next) =>{
//     console.log("-------------error---------")
//     next(err);
// })
  
app.all("*", (req,res,next) => {
    next(new ExpressError(404, "Page Not found"));
})

app.use((err,req,res,next) =>{
    let{ statusCode = 500, message ="Something went wrong"} = err;
    res.status(statusCode).render("error.ejs", { message });
    // res.status(statusCode).send(message); 
})


app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});