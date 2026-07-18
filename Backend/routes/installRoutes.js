import express from "express";
import { installTables } from "../controllers/installController.js";

const router = express.Router();

router.get("/install", installTables);

export default router;
