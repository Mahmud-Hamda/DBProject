import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "myDBuser",
  password: process.env.DB_PASSWORD || "12345",
  database: process.env.DB_NAME || "myDB",
  waitForConnections: true,
  connectionLimit: 10,
});

export default db;
