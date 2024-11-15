import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";


const Registercontroller = async (req, res) => {

    const { name, email, password, phoneNumber } = req.body;
    console.log(name, email, password, phoneNumber);

    try {
        if (!name || !email || !password || !phoneNumber) {
            return res.status(400).json({
                success: false,
                message: "All field are required",
            });
        }

        const existedUser = await User.findOne({ email });
        if (existedUser) {
            return res.status(400).json({
                success: false,
                message: "Email already registered",
            });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        const user = await User.create({
            name,
            email,
            phoneNumber,
            password: hashedPassword,
        });

        const options = {
            secure: true,
            httpOnly: true,
        };
        const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);
        return res.status(200).cookie("JobPortal-Auth_token", token, options).json({
            success: true,
            message: "Registered successfully",
            user,
            token,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "internal server error please try again later",
        });
    }
};


export default Registercontroller;