import db from "../config/db.js";

export const insertData = async (req, res) => {
  const { action } = req.body;
  let connection;

  try {
    connection = await db.getConnection();

    switch (action) {
      case "insert_user": {
        const { user_name, user_password } = req.body;
        const insertUserQuery =
          "INSERT INTO user (user_name, user_password) VALUES (?, ?)";
        await connection.execute(insertUserQuery, [user_name, user_password]);

        return res.send(
          `<h2>User ${user_name} inserted successfully!</h2> <a href="/">Go Back</a>`,
        );
      }

      case "insert_product": {
        const { product_url, product_name } = req.body;
        const insertProductQuery =
          "INSERT INTO products (product_url, product_name) VALUES (?, ?)";
        await connection.execute(insertProductQuery, [
          product_url,
          product_name,
        ]);

        return res.send(
          `<h2>Product ${product_name} inserted successfully!</h2> <a href="/">Go Back</a>`,
        );
      }

      case "insert_description": {
        const {
          product_id,
          product_brief_description,
          product_description,
          product_img,
          product_link,
        } = req.body;
        const insertDescriptionQuery =
          "INSERT INTO product_description (product_id, product_brief_description, product_description, product_img, product_link) VALUES (?, ?, ?, ?, ?)";

        await connection.execute(insertDescriptionQuery, [
          product_id,
          product_brief_description,
          product_description,
          product_img,
          product_link,
        ]);

        return res.send(
          `<h2>Product Description for product ID ${product_id} inserted successfully!</h2> <a href="/">Go Back</a>`,
        );
      }

      case "insert_price": {
        const { product_id, starting_price, price_range } = req.body;
        const insertPriceQuery =
          "INSERT INTO product_price (product_id, starting_price, price_range) VALUES (?, ?, ?)";
        await connection.execute(insertPriceQuery, [
          product_id,
          starting_price,
          price_range,
        ]);

        return res.send(
          `<h2>Product Price for product ID ${product_id} inserted successfully!</h2> <a href="/">Go Back</a>`,
        );
      }

      case "insert_order": {
        const { product_id, user_id } = req.body;
        const insertOrderQuery =
          "INSERT INTO orders (product_id, user_id) VALUES (?, ?)";
        await connection.execute(insertOrderQuery, [product_id, user_id]);

        return res.send(
          '<h2>Order successfully placed!</h2> <a href="/">Go Back</a>',
        );
      }

      default:
        return res.status(400).send("Invalid database action specified.");
    }
  } catch (err) {
    console.error(`Error during action [${action}]:`, err);
    return res
      .status(500)
      .send(
        `<h2>Database Error:</h2> <p>${err.message}</p> <a href="/">Go Back</a>`,
      );
  } finally {
    if (connection) connection.release();
  }
};
