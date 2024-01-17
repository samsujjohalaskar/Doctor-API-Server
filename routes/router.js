const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctorModel");

// Route to add a new doctor
router.post("/add-doctor", async (req, res) => {
  try {
    const { email, name, contact, city, expertise } = req.body;

    // Validate request body
    if (!email || !name || !contact || !city || !expertise) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if the email already exists
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res
        .status(400)
        .json({ message: "Doctor with this email already exists." });
    }

    // Create a new doctor instance
    const newDoctor = new Doctor({
      email,
      name,
      contact,
      city,
      expertise,
    });

    // Save the doctor to the database
    const savedDoctor = await newDoctor.save();

    res.status(201).json({ message: "Doctor added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to get doctors by city
router.get("/get-doctors/:city", async (req, res) => {
  try {
    const city = req.params.city;

    // Validate city parameter
    if (!city) {
      return res.status(400).json({ message: "City parameter is required." });
    }

    // Find doctors in the specified city
    const doctors = await Doctor.find({ city });

    res.status(200).json({ data: doctors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
