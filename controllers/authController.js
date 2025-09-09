const db = require("../config/db");

// ✅ Signup Controller
const signup = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  db.query(
    "INSERT INTO login (username, password) VALUES (?, ?)",
    [username, password],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Signup failed" });
      }
      res.json({ success: true, message: "Signup successful" });
    }
  );
};

// ✅ Login Controller
const login = (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM login WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Login error" });

      if (result.length > 0) {
        res.json({ success: true, message: "Login successful" });
      } else {
        res.json({ success: false, message: "Invalid credentials" });
      }
    }
  );
};

module.exports = { signup, login };
