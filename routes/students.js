const express = require("express");
const router = express.Router();
const db = require("../config/config");

// Create
router.post("/", (req, res) => {
  const { name, age, major } = req.body;
  db.query(
    "INSERT INTO students (name, age, major) VALUES (?, ?, ?)",
    [name, age, major],
    (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(201).send("Student added.");
    }
  );
});

// Read
router.get("/", (req, res) => {
  db.query("SELECT * FROM students", (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// Update
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, age, major } = req.body;
  db.query(
    "UPDATE students SET name = ?, age = ?, major = ? WHERE id = ?",
    [name, age, major, id],
    (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send("Student updated.");
    }
  );
});

// Delete
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM students WHERE id = ?", [id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send("Student deleted.");
  });
});

module.exports = router;
