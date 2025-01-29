import express from "express";
import users from "../controllers/user.controller.js";
const router = express.Router();

router.get("/api/v1/users", users);

export default router;
