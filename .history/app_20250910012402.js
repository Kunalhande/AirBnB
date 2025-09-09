const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing")
const path = require("path");
const method = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync");



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


//Index Route
app.get("/listings",async (req,res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", {allListings})
    });
    
// New Route put this BEFORE the show route
app.get("/listings/new", async(req,res) => {
    res.render("listings/new.ejs");
});

//Show Route
app.get("/listings/:id",async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show",{listing});
});  

//Create Route
app.post("/listings", 
     //let {title,description, image, price, country, location} = req.body;
    wrapAsync(async (req,res) =>{
        const newListing = new Listing(req.body.listing);
        await newListing.save();
        res.redirect("/listings");
    })
    
);

//Edit Route
app.get("/listings/:id/edit", async(req,res)=>{
     let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit",{listing})
})

//Update
app.put("/listings/:id", async(req,res) =>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
});

//Delete Route
app.delete("/listings/:id", async(req,res) =>{
    let {id} =req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
});

app.use((err,req,res,next) =>{
    console.log("-------------error---------")
    next(err);
})

app.use((err,req,res,next) =>{
    res.send("Something went wrong!")
})


app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});