const axios = require('axios');
const { Client } = require('pg');

let DB_URL;

if (process.enc.NODE_ENV ==="test") {
    DB_URL = "postgresql:///"
}else {
    DB_URL = "postgresql:///"
}

let db = new Client({
    connectionString: DB_URL
});

db.connect();

module.exports = db;

// Make 100 API requests
async function makeRequests() {
  await db.connect();
  for (let i = 0; i < 100; i++) {
    try {
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
      const mealData = response.data.meals[0];

      // Insert data into the database
      await db.query('INSERT INTO meals (meal_name) VALUES ($1)', [mealData.strMeal]);
      console.log(`Inserted: ${mealData.strMeal}`);
    } catch (error) {
      console.error(error);
    }
  }
  db.end();
}

// Connect to the database and start making requests
makeRequests().catch((err) => {
  console.error('Error:', err);
});
