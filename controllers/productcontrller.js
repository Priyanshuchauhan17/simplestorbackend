const db = require("../config/db");
 
exports.addProduct = (req, res) => {
  const { title, price, description, category, image } = req.body;
  const sql = "INSERT INTO products (title, price, description, category, image) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [title, price, description, category, image], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Product added successfully!", id: result.insertId });
    });
};
exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const { title, price, description, category, image } = req.body;
  const sql = "UPDATE products SET title=?, price=?, description=?, category=?, image=? WHERE id=?";
  db.query(sql, [title, price, description, category, image, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Product updated successfully!" });
  });
};
 
exports.getProducts = (req, res) => {
  const sql = "SELECT * FROM products";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
 
exports.getProductById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM products WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(404).json({ message: "Product not found" });
    res.json(result[0]);
  });
};
 
exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM products WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully!" });
  });
};