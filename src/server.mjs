import express from "express";
import path from "path"; // Import the path module
import cors from 'cors'; // Import the CORS middleware
import DatabaseService from "./services/database.service.mjs";


//Setting up express
const app = express();
const port = 3000;

// Configure the Express application
app.set('view engine', 'pug'); // Set the view engine to Pug
app.set('views','./views'); // Set the directory for views

// Enable CORS
app.use(cors());

// Get the directory name of the current module file
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Set the static files directory for serving static
app.use(express.static(path.join(__dirname, "static")));

// Define route handler for the root URL, rendering the 'home' view
app.get("/", (req, res) => {
  res.render('home');
});

// Serve the script.js file
app.get("/script.js", (req, res) => {
  res.sendFile(path.join(__dirname, "script.js"));
});

//Establish connection with database
const db = await DatabaseService.connect();

// Define route handler to get continents data
app.get("/continents", async (req, res) => {
  const continents = await db.getCountinents(); // Retrieve continents data from the database
  res.render("continents", {'data': continents}); // Render the 'continents' view with the data
});
// Define route handler to get regions data based on selected continent
app.get("/regions", async (req, res) => {
  const selectedContinent = req.query.continent || 'All'; // Get selected continent from request query or default to 'All'
  const regions = await db.getRegions(selectedContinent); // Retrieve regions data from the database based on the selected continent
  res.render("regions", {'data': regions}); // Render the 'regions' view with the data
});

// Define route handler to get cities data
app.get("/city", async (req, res) => {
  const selectedCity = req.query.city || 'All'; // Get selected city from request query or default to 'All'
  const cities = await db.getCity(selectedCity); // Retrieve cities data from the database
  res.render("city", {'data': cities}); // Render the 'city' view with the data
});

// Define route handler to get countries data
app.get("/country", async (req, res) => {
  const selectedCountry = req.query.country || 'All'; // Get selected country from request query or default to 'All'
  const countries = await db.getcountry(selectedCountry); // Retrieve countries data from the database
  res.render("country", {'data': countries}); // Render the 'country' view with the data
});

// Start the Express server and listen on the defined port
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

