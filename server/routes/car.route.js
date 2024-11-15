import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/cloudinary.js";
import {
  CreateCarController,
  DeleteCarController,
  GetCarByIdController,
  GetCarsController,
} from "../controllers/car.controller.js";

const router = Router();

router.post(
  "/upload",
  isAuthenticated,
  upload.array("images", 10),
  CreateCarController
);
router.get("/getcars", isAuthenticated, GetCarsController);
router.get("/getcars:id", isAuthenticated, GetCarByIdController);
router.delete("/deletecars:id", isAuthenticated, DeleteCarController);

export default router;
