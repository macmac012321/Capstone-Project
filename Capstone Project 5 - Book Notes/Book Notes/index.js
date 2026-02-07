const express = require("express");
const axios = require("axios");
const pool = require("./db");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

/* READ */
app.get("/", async (req, res) => {
  try {
    const sort = req.query.sort || "created_at";
    const books = await pool.query(
      `SELECT * FROM books ORDER BY ${sort} DESC`
    );
    res.render("index", { books: books.rows });
  } catch (err) {
    console.error(err);
    res.send("Error loading books");
  }
});

/* ADD FORM */
app.get("/add", (req, res) => {
  res.render("add");
});

/* CREATE */
app.post("/add", async (req, res) => {
  const { title, author, rating, notes, cover_id, date_read } = req.body;
  try {
    await pool.query(
      "INSERT INTO books (title, author, rating, notes, cover_id, date_read) VALUES ($1,$2,$3,$4,$5,$6)",
      [title, author, rating, notes, cover_id, date_read]
    );
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.send("Error adding book");
  }
});

/* EDIT FORM */
app.get("/edit/:id", async (req, res) => {
  try {
    const book = await pool.query(
      "SELECT * FROM books WHERE id=$1",
      [req.params.id]
    );
    res.render("edit", { book: book.rows[0] });
  } catch (err) {
    console.error(err);
    res.send("Error loading edit page");
  }
});

/* UPDATE */
app.post("/edit/:id", async (req, res) => {
  const { title, author, rating, notes, cover_id, date_read } = req.body;
  try {
    await pool.query(
      `UPDATE books 
       SET title=$1, author=$2, rating=$3, notes=$4, cover_id=$5, date_read=$6
       WHERE id=$7`,
      [title, author, rating, notes, cover_id, date_read, req.params.id]
    );
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.send("Error updating book");
  }
});

/* DELETE */
app.post("/delete/:id", async (req, res) => {
  try {
    await pool.query(
      "DELETE FROM books WHERE id=$1",
      [req.params.id]
    );
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.send("Error deleting book");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
