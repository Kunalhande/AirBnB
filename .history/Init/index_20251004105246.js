const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/test";

async function initDB() {
  await Listing.deleteMany({});

  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: mongoose.Types.ObjectId("68dedfe8ceac16f22b653810"),
  }));

  console.log("Sample before insert:", initData.data[0]); // debug
  await Listing.insertMany(initData.data);
  console.log("data was initialized ✅");
}

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("connected to DB");

  await initDB(); // only run after connection
  mongoose.disconnect();
}

main().catch((err) => console.log(err));
