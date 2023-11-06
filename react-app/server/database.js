const { Client } = require('pg');
const axios = require('axios'); // Import the axios library


// Configure the PostgreSQL connection
const dbConfig = {
  user: 'breeziestfish7',
  host: 'localhost', // or your database host
  database: 'chefme',
  password: 'micah7iscool',
  port: 5432, // or your database port
};

async function init(client) {
  await dropTable("recipes", client);
  await createTable("recipes", client);
  await loadTable("recipes", client);
}

async function loadTable(tableName, client) {
  try {
    for (let i = 0; i < 150; i++) {
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
      const mealData = response.data.meals[0];
      // Insert data into the database
      const insertQuery = `INSERT INTO ${tableName} (name, category, area, image, source) VALUES ($1, $2, $3, $4, $5)`;

      await client.query(insertQuery, [
        mealData.strMeal,
        mealData.strCategory,
        mealData.strArea,
        mealData.strMealThumb,
        mealData.strSource
      ]);

      console.log(`Inserted: ${mealData.strMeal}`);
    }
  } catch (error) {
    console.error('Error loading table:', error);
  }
}


// Function to establish a database connection
async function connectToDatabase(client) {
  // const client = new Client(dbConfig);
  try {
    // Connect to the database
    await client.connect();
    console.log('Connected to the database');
    return client; // Return the database client for use in other functions
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error; // Rethrow the error for error handling at a higher level
  }
}

async function createTable(tableName, client) {
  try {
    // SQL statement to create a table
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS ${tableName} (
        idMeal SERIAL PRIMARY KEY,
        name VARCHAR(100),
        category VARCHAR(100),
        area VARCHAR(100),
        image VARCHAR(100),
        source VARCHAR(500)
      )
    `;
    // Execute the SQL query
    await client.query(createTableQuery);

    console.log('Table created successfully');
  } catch (error) {
    console.error('Error creating table:', error);
  } finally {
    // Close the database connection
  }
}

async function dropTable(tableName, client) {
  try {
    await client.query('DROP TABLE IF EXISTS ' + `${tableName}`);
    console.log('Table dropped successfully');
  } catch (error) {
    console.error('Error dropping table:', error);
  } finally {
    // Close the database connection
  }
}


// // Call the init function to start the process
// connectToDatabase()
//   .then(init)
//   .catch((error) => {
//     console.error('An error occurred:', error);
//   });

module.exports = {
  init,
  connectToDatabase,
  dbConfig
}