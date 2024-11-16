import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import multer from 'multer';
import { uploadToCloudinary } from '../middlewares/cloudinary.js';
import {
  CreateCarController,
  DeleteCarController,
  GetCarByIdController,
  GetCarsController,
} from "../controllers/car.controller.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
    '/upload',
    isAuthenticated,
    upload.array('files', 10),
    uploadToCloudinary, 
    CreateCarController
);

router.get("/getcars", isAuthenticated, GetCarsController);
router.get("/getcars:id", GetCarByIdController);
router.delete("/deletecar/:id", DeleteCarController);

export default router;
