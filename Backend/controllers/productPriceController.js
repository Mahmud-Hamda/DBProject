import db from "../config/db.js";

export const updateProductPrice = async (req, res) => {
  const { product_id } = req.params;
  const { starting_price, price_range } = req.body;
  let connection;

  try {
    connection = await db.getConnection();

    const updateQuery = `
      UPDATE product_price
      SET starting_price = ?, price_range = ?
      WHERE product_id = ?
    `;

    await connection.execute(updateQuery, [
      starting_price,
      price_range,
      product_id,
    ]);

    res.send(
      `Price updated successfully for product ID [${product_id}]. New data: starting_price=${starting_price}, price_range=${price_range}`,
    );
  } catch (err) {
    console.error(
      `Error updating product price for product ID [${product_id}]:`,
      err,
    );
    res.send(
      `Error updating product price for product ID [${product_id}]: ${err.message}`,
    );
  } finally {
    if (connection) connection.release();
  }
};
