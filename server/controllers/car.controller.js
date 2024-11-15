import Car from "../models/car.model.js";
import { cloudinary } from "../middlewares/cloudinary.js";

export const CreateCarController = async (req, res) => {
  try {
    const imageUrls = req.files.map((file) => file.path);
    const { title, description, tags } = req.body;
    let carId;
    for(let i = 0; i <7; i++) {
      
    }

    const car = await Car.create({
      userId: req.user._id,
      title,
      description,
      carId: carId,
      tags: tags.split(","),
      images: imageUrls,
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
    const cars = await Car.find({ userId: req.user._id });
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
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching car",
      error,
    });
  }
};

export const DeleteCarController = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    for (const image of car.images) {
      const publicId = image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId);
    }

    await car.deleteOne();
    res.status(200).json({
      success: true,
      message: "Car deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting car",
      error,
    });
  }
};
