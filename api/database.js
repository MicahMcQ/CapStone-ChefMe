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
  await dropTable("recipes");
  await createTable("recipes");
  await loadTable(client);
}

async function loadTable(client) {
  try {
    for (let i = 0; i < 4; i++) {
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
      const mealData = response.data.meals[0];

      // Insert data into the database
      await client.query('INSERT INTO recipes (title) VALUES ($1)', [mealData.strMeal]);
      console.log(`Inserted: ${mealData.strMeal}`);
    }
  } catch (error) {
    console.error('Error loading table:', error);
  }
}

// Function to establish a database connection
async function connectToDatabase() {
  const client = new Client(dbConfig);
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

async function createTable(table_name) {
  const client = await connectToDatabase(); // Connect to the database here

  try {
    // SQL statement to create a table
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS recipes (
        recipes_id SERIAL PRIMARY KEY,
        title VARCHAR(100)
      )
    `;

    // Execute the SQL query
    await client.query(createTableQuery);

    console.log('Table created successfully');
  } catch (error) {
    console.error('Error creating table:', error);
  } finally {
    // Close the database connection
    await client.end();
  }
}

async function dropTable(table_name) {
  const client = await connectToDatabase(); // Connect to the database here

  try {
    await client.query('DROP TABLE IF EXISTS ' + table_name);

    console.log('Table dropped successfully');
  } catch (error) {
    console.error('Error dropping table:', error);
  } finally {
    // Close the database connection
    await client.end();
  }
}

// Call the init function to start the process
connectToDatabase()
  .then(init)
  .catch((error) => {
    console.error('An error occurred:', error);
  });
