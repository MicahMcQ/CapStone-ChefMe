var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

const { connectToDatabase, init } = require('./database.js');

async function main() {
  const client = await connectToDatabase();
  init(client);
}

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


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


app.get('/recipes', async (req, res) => {
  const client = await connectToDatabase(); // Assuming connectToDatabase returns a database client
  try {
    const result = await client.query('SELECT * FROM recipes');
    res.json(result.rows); // Sending the query result as JSON response
  } catch (err) {
    console.error('Error executing SQL query:', err);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.release(); // Release the database client back to the pool
  }
});

module.exports = app