const Car = require("../models/Car");
const cloudinary = require("cloudinary").v2;

exports.createCar = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const imageUrls = [];

    if (req.files) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path);
        imageUrls.push(result.secure_url);
      }
    }

    const car = new Car({
      userId: req.user.id,
      title,
      description,
      tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
      images: imageUrls,
    });

    await car.save();
    res.status(201).json(car);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};

exports.getCars = async (req, res) => {
  try {
    const cars = await Car.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(cars);
  } catch (error) {
    console.log(error.message);

    res.status(500).json({ error: error.message });
  }
};

exports.searchCars = async (req, res) => {
  try {
    const { keyword } = req.query;
    let cars;
    if (keyword.trim()) {
      cars = await Car.find({
        userId: req.user.id,
        $text: { $search: keyword },
      }).sort({ score: { $meta: "textScore" } });
    } else {
      cars = await Car.find({});
    }
    res.json(cars);
  } catch (error) {
    console.log(error.message);

    res.status(500).json({ error: error.message });
  }
};

exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }
    res.json(car);
  } catch (error) {
    console.log(error.message);

    res.status(500).json({ error: error.message });
  }
};

exports.updateCar = async (req, res) => {
  try {
    const { title, description, tags } = req.body;

    const updates = {};

    if (title && title.trim()) updates.title = title.trim();
    if (description && description.trim())
      updates.description = description.trim();

    if (tags) {
      if (Array.isArray(tags)) {
        const validTags = tags.map((tag) => tag.trim()).filter((tag) => tag);
        if (validTags.length > 0) updates.tags = validTags;
      } else if (typeof tags === "string") {
        const validTags = tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag);
        if (validTags.length > 0) updates.tags = validTags;
      }
    }
    console.log(req.files?.length);
    if (req.files?.length) {
      console.log("object");
      const imageUrls = [];
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path);
        imageUrls.push(result.secure_url);
      }
      updates.images = imageUrls;
    }

    console.log(updates);

    const car = await Car.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      updates,
      { new: true }
    );

    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }

    res.json(car);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }

    for (const imageUrl of car.images) {
      const publicId = imageUrl.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId);
    }

    res.json({ message: "Car deleted successfully" });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({ error: error.message });
  }
};
