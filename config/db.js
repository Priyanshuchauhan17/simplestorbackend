const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",       // XAMPP default
  password: "",       // XAMPP default blank
  database: "myshope"
});

db.connect((err) => {
  if (err) throw err;
  console.log("✅ MySQL Connected!!!!!!");
});
module.exports = db;
