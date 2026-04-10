const express = require("express");
const router = express.Router();
const Lost = require("../models/LostModel");

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

//  Cloudinary storage setup
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "returnMe",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });


//  GET ALL LOST ITEMS
router.get("/", async (req, res) => {
  try {
    const lostItems = await Lost.find();
    res.status(200).json(lostItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});



router.get("/:id", async (req, res) => {
  try {
    const item = await Lost.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});



router.post("/", upload.single("image"), async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    if (!req.file) {
      return res.status(400).json({ error: "Image not uploaded" });
    }

    const newLost = new Lost({
      LostBy: req.body.LostBy,
      itemName: req.body.itemName,
      description: req.body.description,
      location: req.body.location,
      Date: req.body.Date,
      contact: req.body.contact,
      image: req.file.path, 
    });

    await newLost.save();

    res.status(201).json({
      message: "Lost item added successfully",
      data: newLost,
    });

  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});


// UPDATE LOST ITEM
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

    //  only update image if new file uploaded
    if (req.file && req.file.path) {
      updatedData.image = req.file.path;
    }

    const updatedItem = await Lost.findByIdAndUpdate(
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


//  DELETE LOST ITEM
router.delete("/:id", async (req, res) => {
  try {
    const deletedItem = await Lost.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json({
      message: "Lost item deleted successfully",
    });

  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;