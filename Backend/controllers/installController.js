import db from "../config/db.js";

const createTablesQueries = [
  `CREATE TABLE IF NOT EXISTS user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_url VARCHAR(512) NOT NULL,
    product_name VARCHAR(255) NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS product_description (
    description_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT UNIQUE,
    product_brief_description VARCHAR(255) NOT NULL,
    product_description TEXT NOT NULL,
    product_img VARCHAR(512) NOT NULL,
    product_link VARCHAR(512) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
  )`,
  `CREATE TABLE IF NOT EXISTS product_price (
    price_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT UNIQUE,
    starting_price VARCHAR(255) NOT NULL,
    price_range VARCHAR(255) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
  )`,
  `CREATE TABLE IF NOT EXISTS orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    user_id INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
  )`,
];

export const installTables = async (req, res) => {
  let connection;
  try {
    console.log("Initializing database tables...");
    connection = await db.getConnection();

    for (const sqlQuery of createTablesQueries) {
      await connection.execute(sqlQuery);
      console.log("Executed table creation query successfully.");
    }

    console.log("All Database Tables built successfully!");
    res.status(200).send("All Database Tables built successfully!");
  } catch (err) {
    console.error("Error creating tables:", err);
    res.status(500).send(`Error creating tables: ${err.message}`);
  } finally {
    if (connection) connection.release();
  }
};
