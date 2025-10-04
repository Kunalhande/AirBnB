const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing");
const User = require("../models/user");

const MONGO_URL = "mongodb://127.0.0.1:27017/test";

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("✅ Connected to DB");

  await initDB();
  mongoose.disconnect();
}

async function initDB() {
  // Clear existing data
  await Listing.deleteMany({});
  await User.deleteMany({});

  // Create a default user
  const defaultUser = new User({
    username: "admin",
    email: "admin@example.com",
  });
  await User.register(defaultUser, "123456"); // if using passport-local-mongoose
  console.log("✅ Default user created:", defaultUser.username);

  // Assign the user's _id as owner for each listing
  const listingsWithOwner = initData.data.map((obj) => ({
    ...obj,
    owner: defaultUser._id,
  }));

  // Insert listings
  await Listing.insertMany(listingsWithOwner);
  console.log("✅ Listings initialized with valid owner");
}

main().catch((err) => console.log("❌ Error:", err));
