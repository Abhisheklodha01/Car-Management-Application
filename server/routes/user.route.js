import { Router } from "express";
import {
    ForgotPasswordController,
    GetUserProfileController,
    Logincontroller,
    Registercontroller,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";


const router = Router();

router.post("/signup", Registercontroller);
router.post("/login", Logincontroller);
router.put("/forgot-password", ForgotPasswordController);
router.get("/user-profile", isAuthenticated, GetUserProfileController);


export default router