import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import db from "./config/db.js";
import healthRoutes from "./routes/healthRoutes.js";
import insertRoutes from "./routes/insertRoutes.js";
import installRoutes from "./routes/installRoutes.js";
import productPriceRoutes from "./routes/productPriceRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();
const port = Number(process.env.PORT) || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDir = path.join(__dirname, "..", "Frontend");

app.use(express.static(frontendDir));

app.use(healthRoutes);
app.use(installRoutes);
app.use(insertRoutes);
app.use(userRoutes);
app.use(productPriceRoutes);

// ***************************************************
// Async function to connect to the database
// ***************************************************
async function startServer() {
  try {
    // Test pool connection
    const connection = await db.getConnection();
    console.log("Connected to the database successfully!");
    connection.release();

    app.listen(port, () => {
      console.log(`Express server running!`);
      console.log(`Link to create Tables: http://localhost:${port}/install`);
      console.log(`Link to insert into Tables: http://localhost:${port}/`);
    });
  } catch (err) {
    console.error("Error connecting to the database on startup:", err);
    process.exit(1);
  }
}

startServer();
