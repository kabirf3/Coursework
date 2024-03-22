const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000; // Specify the port number where the server will run

// Configuration for MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  port: 8080, // MySQL port number
  user: 'user', // Database username
  password: 'password', // Database password
  database: 'world' // Database name
});

// Establish MySQL connection
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database successfully');
});


// CORS (Cross-Origin Resource Sharing) 
app.use(cors());

// Express JSON
app.use(express.json());

// Express middleware
app.use(express.static('src'));

// Define an endpoint to fetch continents
app.get('/continents', (req, res) => {
  // Query continents from the database
  connection.query('SELECT DISTINCT continent FROM country', (error, results, fields) => {
    if (error) {
      console.error('Database error:', error);
      res.status(500).send('Database error');
      return;
    }
    // If successful, send continents to the client
    const continents = results.map(result => result.continent);
    res.json(continents);
  });
});

// Start listening for requests
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
