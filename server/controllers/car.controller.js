import Car from "../models/car.model.js";
import { v2 as cloudinary } from "cloudinary";

export const CreateCarController = async (req, res) => {
  try {
    const files = req.files;
    const { title, description, tags } = req.body;

    const car = await Car.create({
      userId: req.user._id,
      user: req.user.name,
      title,
      description,
      carId: Date.now(),
      tags: tags.split(","),
      images: files,
    });

    return res.status(200).json({
      success: true,
      message: "Car details added successfully",
      car,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error creating car",
      error,
    });
  }
};

export const GetCarsController = async (req, res) => {
  try {
    const cars = await Car.find({ userId: req.user._id }).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "Car details fechted successfully",
      cars,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching cars",
      error,
    });
  }
};

export const GetCarByIdController = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car details not found",
      });
    }
    return res.status(200).json({
      success: false,
      message: "Car details fetched successfully",
      car,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching car",
      error,
    });
  }
};

export const DeleteCarController = async (req, res) => {
  const id = req.params.id;

  try {
    const car = await Car.findById(id);
    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    for (const image of car.images) {
      const publicId = image.split("/").slice(-1)[0].split(".")[0];
      await cloudinary.uploader.destroy(`cars/${publicId}`);
    }

    await car.deleteOne();
    return res.status(200).json({
      success: true,
      message: "Car deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while deleting a car",
      error,
    });
  }
};

export const UpdateCarDetails = async (req, res) => {
  const files = req.files;
  const { title, description, tags } = req.body;
  const id = req.params.id;
  try {
    const car = await Car.findById(id);
    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    if (title) car.title = title;
    if (description) car.description = description;
    if (tags) car.tags = tags.split(",");

    if (req.files && req.files.length > 0) {
      for (const image of car.images) {
        const publicId = image.split("/").slice(-1)[0].split(".")[0];
        await cloudinary.uploader.destroy(`cars/${publicId}`);
      }
      car.images = files;
    }
    const updatedCar = await car.save();
    return res.status(200).json({
      message: "Car details updated successfully",
      car: updatedCar,
      body: req.body,
      files: req.files,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while updateing a car details ",
      error,
    });
  }
};

export const GetAllCars = async (req, res) => {
  try {
    const cars = await Car.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "Cars find successfully",
      cars,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error while fetching cars",
      error,
    });
  }
};

export const GetCarsByQuery = async (req, res) => {
  const query = req.params.query;
  try {
    const filter = {
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { tags: { $regex: query, $options: "i" } },
      ],
    };
    const cars = await Car.find(filter).sort({ createdAt: -1 })
    if (cars.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Matching Cars found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Cars found Successfully",
      cars,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching cars",
      error,
    });
  }
};
