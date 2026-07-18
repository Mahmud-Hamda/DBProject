import db from "../config/db.js";

export const getUserData = async (req, res) => {
  let connection;

  try {
    connection = await db.getConnection();
    const [rows] = await connection.execute("SELECT * FROM user");
    res.status(200).json(rows);
  } catch (err) {
    console.error("Error fetching user data:", err);
    res.status(500).send("Error fetching user data from the database.");
  } finally {
    if (connection) connection.release();
  }
};
