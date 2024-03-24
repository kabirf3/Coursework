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


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
