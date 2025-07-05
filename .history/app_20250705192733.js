const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing")

const MONGO_URL ="mongodb://127.0.0.1:27017/test";

main().then(() =>{
    console.log("connected to DB");
}).catch(() =>{
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

// app.get("testListing", async(req,res) =>{
//      let sampleListing = new Listing ( {
//         title: "my new villa",
//         description:"its good",
//         price: 1200,
//         location: "Akole, maharashtra",
//      });

//      await sampleListing.save();
//      console.log("Sample was saved");
//      res.send("successful testing");
// });

app.get("/", (req,res) =>{
    res.send("Hi, I am root");
});

app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});