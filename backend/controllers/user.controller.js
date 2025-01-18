import User from "../models/user.model.js";
import { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

export const getUser = async (req, res) => {

    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).send(user)
    } catch (error) {
        res.status(400).json("user not found" + error);
    }
}

export const login = async (req, res) => {
    try {

        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid username or password" });
        }

        const isPasswordValid = compareSync(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid username or password" });
        }

        var token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: 90000 });
        res.status(200).json({ success: true, token });

    } catch (error) {
        res.status(400).json({ success: false, message: "An error occurred. Please try again later." });
    }
}
