const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title:{
        type : String,
        require: true,
    },
    description: String,
    image:{
        default:"https://unsplash.com/photos/the-andromeda-galaxy-shines-brightly-among-stars-cEn8-KuGLiIdefault link",
        type:String,
        set: (v) => v === "" ? "https://unsplash.com/photos/the-andromeda-galaxy-shines-brightly-among-stars-cEn8-KuGLiIdefault link" : v,
    },
    price: Number,
    location: String,
    contry: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;