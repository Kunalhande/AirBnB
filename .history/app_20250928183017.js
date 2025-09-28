const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const method = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const session = require("express-session");
const flash = require("connect-flash");


const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");


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

const sessionOption = {
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() * 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
};

app.use(session(sessionOption));

app.get("/", (req,res) =>{
    res.send("Hi, I am root");
});


app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews)


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