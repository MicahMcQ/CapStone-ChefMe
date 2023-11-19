# ChefMe

A Recipe searching app, capstone for SpringBoard (2023)

## Getting Started

These instructions will help you set up the project on your local machine.

### Prerequisites

Make sure you have the following software installed:

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/download/)

### Installing

We are going to install an test the server first. To make sure it's connected with your local database.
Once we've downloaded it we are going to close it and run a concurrent script from the "Client" folder that allows us to start the Front and Backend with one command.

Clone the repository to your local machine:

```bash
git clone https://github.com/MicahMcQ/CapStone-ChefMe.git
cd Capstone-ChefMe
```
## Backend

Let's go over to the "Server" folder:

```bash
cd server
```

Install Dependencies:

```bash
npm install
```

Configure PostgreSQL Connection

Create a PostgreSQL database and configure the connection in your project. Open the config.js file (or create it if it doesn't exist) and add the following:

```javascript

// config.js

module.exports = {
  dbConfig: {
    user: 'your_username',
    host: 'localhost', // or your database host
    database: 'chefme',
    password: 'your_password',
    port: 5432, // or your database port
  },
};
```
Replace 'your_username', 'your_database_name', 'your_password' with your actual PostgreSQL credentials.
Running the App

testing the server:

```bash

npm start
```
Visit <http://localhost:9000/recipes> in your browser.
Loading Recipe Data

The project includes a script to initialize the database with recipe data.
This script connects to the PostgreSQL database, creates a table, and loads recipe data from an external API.

Once youve confirmed the server is working we can close the server: 

"control C"

And now its time to switch to the frontend and run the exucute the full app.

```bash
cd ../client
```
Install client dependencies:

```bash
npm install
npm install concurrently
```
Concurrently is a npm package is used for running multiple commands in one. Allowing us to run the front and back end simultaneously.

after all is said and done run the final command:

```bash
npm start
```
Visit <http://localhost:3000> in your browser.

# Important information

### Frontend

- Language: JavaScript
- Framework: React
- Runtime Environment: Node.js

Description:
The frontend of our application is developed using JavaScript, with React as the chosen framework for building modern and responsive user interfaces. Node.js serves as the runtime environment, facilitating server-side rendering and other backend-related functionalities for our frontend.

### Backend

- Language: JavaScript 
- Framework: Express
- Runtime Environment: Node.js
- Databbase: PostgreSQL

Description:
Our backend is built using JavaScript, utilizing the Express framework to create a robust and scalable server. Node.js provides the runtime environment for our backend operations. We have integrated PostgreSQL as our database, leveraging its power and reliability for data storage and retrieval.

####Contributing

If you'd like to contribute to ChefMe, please fork the repository and create a pull request. Feel free to open issues for bug reports or feature requests.
