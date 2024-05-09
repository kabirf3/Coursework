import express from "express";
import path from "path"; // Import the path module
import cors from 'cors'; // Import the CORS middleware
import DatabaseService from "./services/database.service.mjs";



const app = express();
const port = 3000;

// Enable CORS
app.use(cors());

// Get the directory name of the current module file
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Set the static files directory
app.use(express.static(path.join(__dirname, "static")));


// Define route handler for the root URL
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "static", "index.html"));
});

// Serve the script.js file
app.get("/script.js", (req, res) => {
  res.sendFile(path.join(__dirname, "script.js"));
});

const db = await DatabaseService.connect();

app.get("/continents", async (req, res) => {
    const continents = await db.getCountinents();
    res.send(continents);
});

app.get("/regions", async (req, res) => {
  const selectedContinent = req.query.continent || 'All'; // Get selected continent from request query
  const regions = await db.getRegions(selectedContinent);
  res.send(regions);
});

app.get("/countries", async (req, res) => {
  const selectedRegion = req.query.region || 'All'; // Get selected region from request query
  const countries = await db.getCountries(selectedRegion);
  res.send(countries);
});

// Get cities for a country
app.get("/cities", async (req, res) => {
  const selectedCountry = req.query.country || 'All';
  const cities = await db.getCities(selectedCountry);
  res.send(cities);
});

// Get cities for a country
app.get("/districts", async (req, res) => {
  const selectedCity = req.query.city || 'All';
  const districts = await db.getDistricts(selectedCity);
  res.send(districts);
});





// Route to fetch population for a city
app.get("/population", async (req, res) => {
  const selectedCity = req.query.city || 'All';
  const population = await db.getPopulation(selectedCity);
  res.send({ population });
});

// Route to fetch country languages for a city
app.get("/countryLanguage", async (req, res) => {
  const selectedCity = req.query.city || 'All';
  const limit = req.query.limit || null; // Get the optional limit query parameter

  const countryLanguages = await db.getCountryLanguages(selectedCity, limit);
  res.send({ countryLanguages });
});




app.get("/report", async (req, res) => {
  const { continent, region, country, city, district, filter, sort, limit } = req.query;

  console.log('Received parameters:');
  console.log('Continent:', continent);
  console.log('Region:', region);
  console.log('Country:', country);
  console.log('City:', city);
  console.log('District:', district);
  console.log('Limit:', limit);

  // Use your database service methods to fetch the data based on the provided parameters
  const reportData = await db.generateReport(continent, region, country, city, district, filter, sort, limit);

  console.log('Generated report data:', reportData);

  res.json(reportData); // Send the fetched data as JSON
});





app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
