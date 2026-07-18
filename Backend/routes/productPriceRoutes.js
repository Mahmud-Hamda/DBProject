import express from "express";
import { updateProductPrice } from "../controllers/productPriceController.js";

const router = express.Router();

router.patch("/updateproduct_price/:product_id", updateProductPrice);

export default router;
