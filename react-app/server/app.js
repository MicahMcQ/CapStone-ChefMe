var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
const { Client } = require('pg');
var corsOptions = {
  origin: 'http://localhost:3000',
}

const { connectToDatabase, init, dbConfig } = require('./database.js');
const client = new Client(dbConfig);

// async function main() {
//   const client = await connectToDatabase();
//   init(client);
// }
init(client);

var app = express();

app.use(cors(corsOptions));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/login', (req, res) => {
  res.send({
    token:'test123'
  });
});

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

connectToDatabase(client);
app.get('/recipes', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM recipes');
    res.json(result.rows); // Sending the query result as JSON response
  } catch (err) {
    console.error('Error executing SQL query:', err);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
  //   client.release(); // Release the database client back to the pool
  }
});

app.get("/search", async (req, res) => {
  const searchQuery = req.body.q; // Get the search term from the query parameter 'q'
  
  try {
    const sql = `SELECT * FROM recipes WHERE name LIKE %${req.body.value}%`;
    const result = await client.query(sql, [`%${searchQuery}%`]);
    res.json(result.rows); // Sending the query result as JSON response
  } catch (err) {
    console.error("Error executing SQL query:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post('/recipes', async (req, res) => {
  console.log(req.body.name);
  try {
    let query = `INSERT INTO recipes (name, category, area)
    VALUES ('${req.body.name}', '${req.body.category}', '${req.body.area}');`
    console.log(query);
   let result =  await client.query(query);
   res.json("Inserted")
  } catch (err) {
    console.error('Error executing SQL query:', err);
    res.status(500).json({ error: 'Internal server error' });
  };
});

app.delete('/recipes', async (req, res) => {
  try {
    let query = `DELETE FROM recipes WHERE name = '${req.body.name}';`
    console.log(query);
  let result = await client.query(query);
  res.json(`${req.body.name} was deleted.`);
  } catch (err) {
    console.error('Error executing SQL query:', err);
    res.status(500).json({ error: 'Internal server error' });
  };
});

app.put('/recipes', async (req, res) => {
  try {
    let query = `UPDATE recipes SET name = '${req.body.newName}' 
    WHERE name = '${req.body.name}';`
    console.log(query);
  let result = await client.query(query);
  res.json(`${req.body.name} hase been switched to ${req.body.newName}.`);
  } catch (err) {
    console.error('Error executing SQL query:', err);
    res.status(500).json({ error: 'Internal server error' });
  };
});

app.get('/random', async (req, res) => {
  res.json('Random! ')
});

module.exports = app
