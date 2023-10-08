const { Client } = require('pg');
const axios = require('axios'); // Import the axios library


// Configure the PostgreSQL connection
const dbConfig = {
  user: 'breeziestfish7',
  host: 'localhost', // or your database host
  database: 'postgres',
  password: 'micah7iscool',
  port: 5432, // or your database port
};


// async function createAndLoadDatabase() {
//   const client = new Client(dbConfig);

//   try {
//     // Connect to the PostgreSQL server
//     await client.connect();
//     console.log('Connected to the PostgreSQL server');

//     // Drop the existing 'chefme' database if it exists
//     await client.query('DROP DATABASE IF EXISTS chefme');
//     console.log('Dropped existing database: chefme');

//     // Create a new 'chefme' database
//     await client.query('CREATE DATABASE chefme');
//     console.log('Created new database: chefme');

//     // Disconnect from the PostgreSQL server
//     await client.end();

//     // Now that we have created the new database, let's connect to it
//     const chefmeConfig = { ...dbConfig, database: 'chefme' };
//     const chefmeClient = new Client(chefmeConfig);

//     // Connect to the 'chefme' database
//     await chefmeClient.connect();
//     console.log('Connected to the chefme database');

//     // Create the 'recipes' table
//     const createTableQuery = `
//       CREATE TABLE IF NOT EXISTS recipes (
//         recipes_id SERIAL PRIMARY KEY,
//         title VARCHAR(100)
//       )
//     `;
//     await chefmeClient.query(createTableQuery);
//     console.log('Table created successfully');

//     // Load data into the 'recipes' table (you can use your loadTable function here)
    
//     // Disconnect from the 'chefme' database
//     await chefmeClient.end();

//     console.log('Database setup completed');
//   } catch (error) {
//     console.error('An error occurred:', error);
//   }
// }

// // Call the createAndLoadDatabase function to set up the database
// createAndLoadDatabase();

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

async function createTable(recipes) {
  const client = await connectToDatabase(); // Connect to the database here

  try {
    // SQL statement to create a table
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS recipes (
        idMeal SERIAL PRIMARY KEY,
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

async function dropTable(recieps) {
  const client = await connectToDatabase(); // Connect to the database here

  try {
    await client.query('DROP TABLE IF EXISTS ' + 'recipes');

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
