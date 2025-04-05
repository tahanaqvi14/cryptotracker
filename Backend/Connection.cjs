require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Joi = require('joi');
const bcrypt = require('bcrypt');
const app = express();

app.use(cors({
  origin: "http://localhost:5173",  // Replace with your frontend URL
  credentials: true
}));

app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("Error: MONGO_URI is not defined in the environment variables.");
  process.exit(1);
}

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

const countrySchema = new mongoose.Schema({
    continent:String,
    description:String,
    name: String,
    image: String,
    capital: String,
    attractions: [String],
    travelCost: Number
});

const Country = mongoose.model('Country', countrySchema);


app.get("/trip/:id", async (req, res) => {
    try {
      const budget = parseInt(req.params.id); // Convert budget (id) to a number
      if (isNaN(budget)) {
        return res.status(400).json({ error: "Invalid budget value" });
      }
              // Hash the password

      const countries = await Country.find({travelCost: { $lte: budget }}); // Fetch all countries from the database

      res.json(countries); // Return an array of countries
    } catch (error) {
        console.error("Error fetching countries:", error);
        res.status(500).json({ error: "Error fetching countries" });
    }
});

// const destinations = [
//   {
//     "continent": "Asia",
//     "description": "The UAE is a dazzling blend of futuristic cities, desert adventures, and rich cultural heritage. From the world's tallest skyscrapers to golden sand dunes, it offers luxury shopping, thrilling experiences, and traditional Arabian hospitality.",
//     "name": "United Arab Emirates",
//     "image": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c", // Burj Khalifa
//     "capital": "Abu Dhabi",
//     "attractions": [
//       "Burj Khalifa",
//       "Palm Jumeirah",
//     ],
//     "travelCost": 2500 
//   }
  
//   // Add other countries here...
// ];

// // Insert into MongoDB
// Country.insertMany(destinations)
//   .then(() => {
//       console.log("Data inserted successfully!");
//       mongoose.connection.close();
//   })
//   .catch((err) => {
//       console.error("Error inserting data:", err);
//   });



// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
