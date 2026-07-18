import express from "express";
import { insertData } from "../controllers/insertController.js";

const router = express.Router();

router.post("/insert", insertData);

export default router;
