const express = require("express");
const router = express.Router();
const Found = require("../models/FoundModel");

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "returnMe",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });


//  GET ALL
router.get("/", async (req, res) => {
  try {
    const foundItems = await Found.find();
    res.status(200).json(foundItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//  GET BY ID
router.get("/:id", async (req, res) => {
  try {
    const item = await Found.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Item not found" });

    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// CREATE 
router.post("/", upload.single("image"), async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    if (!req.file) {
      return res.status(400).json({ error: "Image not uploaded" });
    }

    const newFound = new Found({
      FoundBy: req.body.FoundBy,
      itemName: req.body.itemName,
      description: req.body.description,
      location: req.body.location,
      Date: req.body.Date,
      contact: req.body.contact,
      image: req.file.path, 
    });

    await newFound.save();

    res.status(201).json({
      message: "Found item added",
      data: newFound,
    });

  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});


//  UPDATE
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const updatedData = {
      FoundBy: req.body.FoundBy,
      itemName: req.body.itemName,
      description: req.body.description,
      location: req.body.location,
      Date: req.body.Date,
      contact: req.body.contact,
    };

    if (req.file && req.file.path) {
      updatedData.image = req.file.path;
    }

    const updatedItem = await Found.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json(updatedItem);

  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});


//  DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deletedItem = await Found.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json({ message: "Item deleted successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;