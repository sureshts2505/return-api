const express = require("express");
const router = express.Router();
const Lost = require("../models/LostModel");


const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "returnMe",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });



router.get("/", async (req, res) => {
  try {
    const lostItems = await Lost.find();
    res.status(200).json(lostItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const item = await Lost.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post("/", upload.single("image"), async (req, res) => {
  try {
    const newLost = new Lost({
      LostBy: req.body.LostBy,
      itemName: req.body.itemName,
      description: req.body.description,
      location: req.body.location,
      Date: req.body.Date,
      contact: req.body.contact,
      image: req.file ? req.file.path : "", // 🔥 URL save
    });

    await newLost.save();
    res.status(201).json(newLost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const updatedData = {
      LostBy: req.body.LostBy,
      itemName: req.body.itemName,
      description: req.body.description,
      location: req.body.location,
      Date: req.body.Date,
      contact: req.body.contact,
    };

    if (req.file) {
      updatedData.image = req.file.path; // 🔥 URL update
    }

    const updatedItem = await Lost.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!updatedItem) return res.status(404).json({ error: "Item not found" });

    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const deletedItem = await Lost.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ error: "Item not found" });

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;