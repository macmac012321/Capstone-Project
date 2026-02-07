CREATE DATABASE booknotes;

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255),
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  notes TEXT,
  cover_id VARCHAR(50),
  date_read DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
