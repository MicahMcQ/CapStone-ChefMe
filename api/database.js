const { Client } = require('pg');

// Configure the PostgreSQL connection
const dbConfig = {
    user: 'breeziestfish7',
    host: 'localhost', // or your database host
    database: 'chefme',
    password: 'micah7iscool',
    port: 5432, // or your database port
  };

export async function init(client) {
    dropTable("receipes");
    createTable("receipes");
    loadTable(client);
}

async function loadTable(client) {
    for (let i = 0; i < 100; i++) {
        try {
          const response = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
          const mealData = response.data.meals[0];
    
          // Insert data into the database
          await client.query('INSERT INTO receipes (title) VALUES ($1)', [mealData.strMeal]);
          console.log(`Inserted: ${mealData.strMeal}`);
        } catch (error) {
          console.error(error);
        }
      }
}

// Function to establish a database connection
export async function connectToDatabase(dbClient) {
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
  try {
    // SQL statement to create a table
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS receipes (
        receipes_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(50)
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
    try {
      await client.none('DROP TABLE IF EXISTS $1:name', [tableName]);
  
      console.log('Table dropped successfully');
    } catch (error) {
      console.error('Error creating table:', error);
    } finally {
      // Close the database connection
      await client.end();
    }
  }