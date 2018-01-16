'use strict'

// Application dependencies
const express = require('express');
const cors = require('cors');
const pg = require('pg');
const bodyParser = require('body-parser').urlencoded({ extended: true });

// Application Setup
const app = express();
const PORT = process.env.PORT || 3000
// const CLIENT_URL = process.env.CLIENT_URL;
const TOKEN = process.env.TOKEN;

// Database Setup
const conString = 'postgres://localhost:5432/books';
const client = new pg.Client(conString);
client.connect();
client.on('error', err => console.error(err));

// Application Middleware
app.use(cors());

// API Endpoints
app.get('/api/v1/admin', (req, res) => res.send(TOKEN === parseInt(req.query.token)))

app.get('/api/v1/books', (req, res) => {
  client.query(`SELECT book_id, title, author, image_url, isbn FROM books;`)
    .then(results => {
      console.log(results.rows);
      res.send(results.rows);
    })
    .catch(console.error);
});

app.get('/api/v1/books/:id', (req, res) => {
  client.query(`SELECT * FROM books WHERE book_id=${req.params.id}`)
    .then(results => {
      console.log(results.rows);
      res.send(results.rows)
    })
    .catch(console.error);
});

app.post('/api/v1/books', bodyParser, (req, res) => {
  let { title, author, isbn, image_url, description } = req.body;
  client.query(`
    INSERT INTO books(title, author, isbn, image_url, description) VALUES($1, $2, $3, $4, $5)`,
    [title, author, isbn, image_url, description]
  )
    .then(results => res.sendStatus(201))
    .catch(console.error);
});

app.put('/api/v1/books/:id', bodyParser, (req, res) => {
  let { title, author, isbn, image_url, description } = req.body;
  client.query(`
    UPDATE books
    SET title=$1, author=$2, isbn=$3, image_url=$4, description=$5
    WHERE book_id=$6`,
    [title, author, isbn, image_url, description, req.params.id]
  )
    .then(() => res.sendStatus(204))
    .catch(console.error)
})

app.delete('/api/v1/books/:id', (req, res) => {
  client.query('DELETE FROM books WHERE book_id=$1', [req.params.id])
    .then(() => res.sendStatus(204))
    .catch(console.error);
});

loadDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
  })
  .catch(err => console.error(err));
// app.get('*', (req, res) => res.redirect(CLIENT_URL));


function loadDB() {
  return client.query(`
    CREATE TABLE IF NOT EXISTS
    books (
      book_id SERIAL PRIMARY KEY,
      title VARCHAR(255),
      author VARCHAR(255) NOT NULL,
      isbn VARCHAR(255) UNIQUE NOT NULL,
      image_url VARCHAR(255),
      description VARCHAR(255) NOT NULL
    );`
  )
}

function fillDB() {
  return client.query(`
    INSERT INTO books ('Column Names')
    SELECT ${'data goes here'}
    WHERE NOT EXISTS (SELECT * FROM books)
  `)
}
