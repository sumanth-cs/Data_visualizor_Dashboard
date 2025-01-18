import express from "express";
import { login, getUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/login", login);
router.get("/user/:id", getUser);

export default router;