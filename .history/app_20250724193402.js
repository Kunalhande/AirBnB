const express = require("express");
const app = express();
const mongoose = require("mongoose");
const listings = require("./models/listing")
const path = require("path");


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

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));  //to parse all data comes in request

app.get("/", (req,res) =>{
    res.send("Hi, I am root");
});


//Index Route
app.get("/listings",async (req,res) => {
    const allListings = await listings.find({});
    res.render("listings/index", {allListings})
    });

//Show Route
app.get("/listings/:id",async (req,res)=>{
    let {id} = req.params;
    const listing = await listings.findById(id);
    res.render("listings/show.ejs",{listing});
})    

app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});