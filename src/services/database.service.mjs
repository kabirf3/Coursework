//DatabaseService class for interacting with the MySQL database
import mysql from "mysql2/promise";
import Country from "../models/country.mjs";

export default class DatabaseService {
    conn;

    constructor(conn) {
        this.conn = conn;
    }

    /* Establish database connection and return the instance */
    static async connect() {
        const conn = await mysql.createConnection({
            host: process.env.DATABASE_HOST || "localhost",
            port: 8080, // MySQL port number
            user: "root",
            password: "",
            database: "world",
        });
//Return a new instance of databaseservice with the connection
        return new DatabaseService(conn);
    }
       /* Get a list of continents */
       async getCountinents() {
        const sql = `SELECT DISTINCT continent FROM country`; // SQL query to retrieve distinct continents
        const [rows, fields] = await this.conn.execute(sql); // Execute the SQL query
        const continents = rows.map(row => row.continent); // Extract continents from query result
        return continents; // Return the list of continents
    }

    /* Get a list of regions for a specific continent */
    async getRegions(continent = 'All') {
        let sql;
        let params;

        if (continent === 'All') {
            sql = `SELECT DISTINCT region FROM country`; // SQL query to retrieve distinct regions for all continents
            params = [];
        } else {
            sql = `SELECT DISTINCT region FROM country WHERE continent = ?`; // SQL query to retrieve distinct regions for a specific continent
            params = [continent];
        }

        const [rows, fields] = await this.conn.execute(sql, params); // Execute the SQL query
        const regions = rows.map(row => row.region); // Extract regions from query result
        return regions; // Return the list of regions
    }

     /* Get a list of cities */
     async getCity (city = 'All') {
        let sql;
        let params;

        if (city === 'All') {
            sql = 'SELECT * FROM `city` ORDER BY `Population` DESC LIMIT 10;' ; // SQL query to retrieve cities ordered by population
            params = [];
        } else {
            sql = `SELECT DISTINCT city FROM country WHERE continent = ?`; // SQL query to retrieve distinct cities for a specific continent
            params = [continent];
        }

        const [rows, fields] = await this.conn.execute(sql, params); // Execute the SQL query
        const cities = rows.map(row => row.city); // Extract cities from query result
        return cities; // Return the list of cities
    }

     /* Get a list of countries */
     async getcountry (country = 'All') {
        let sql;
        let params;

        if (country === 'All') {
            sql = 'SELECT * FROM country' ; // SQL query to retrieve all countries
            params = [];
        } else {
            sql = `SELECT DISTINCT country FROM country  WHERE continent = ?`; // SQL query to retrieve distinct countries for a specific continent
            params = [continent];
        }

        const [rows, fields] = await this.conn.execute(sql, params); // Execute the SQL query
        const countries = rows.map(row => row.country); // Extract countries from query result
        return countries; // Return the list of countries
    }
}