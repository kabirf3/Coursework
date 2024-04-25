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
            user: "user",
            password: "password",
            database: "world",
        });

        return new DatabaseService(conn);
    }

    /* Get a list of countinents */
    async getCountinents() {
        const sql = `SELECT DISTINCT continent FROM country`;
        const [rows, fields] = await this.conn.execute(sql);
        const continents = rows.map(row => row.continent);
        return continents;
    }

    /* Get a list of regions for a specific continent */
    async getRegions(continent = 'All') {
        let sql;
        let params;

        if (continent === 'All') {
            sql = `SELECT DISTINCT region FROM country`;
            params = [];
        } else {
            sql = `SELECT DISTINCT region FROM country WHERE continent = ?`;
            params = [continent];
        }

        const [rows, fields] = await this.conn.execute(sql, params);
        const regions = rows.map(row => row.region);
        return regions;
    }

    /* Get a list of countries for a specific region */
    async getCountries(region = 'All') {
        let sql;
        let params;
  
        if (region === 'All') {
          sql = `SELECT code, name FROM country`;
          params = [];
        } else {
          sql = `SELECT code, name FROM country WHERE region = ?`;
          params = [region];
        }
  
        const [rows, fields] = await this.conn.execute(sql, params);
        return rows;
    }

    /* Get a list of cities for a specific country */
    async getCities(countryCode = 'All') {
        let sql;
        let params;

        if (countryCode === 'All') {
            sql = `SELECT id, name FROM city`;
            params = [];
        } else {
            sql = `SELECT id, name FROM city WHERE countrycode = ?`;
            params = [countryCode];
        }

        const [rows, fields] = await this.conn.execute(sql, params);
        return rows;
    }

    /* Get a list of districts for a specific city */
    async getDistricts(cityID = 'All') {
        let sql;
        let params;

        if (cityID === 'All') {
            sql = `SELECT DISTINCT district FROM city`;
            params = [];
        } else {
            sql = `SELECT DISTINCT district FROM city WHERE name = ?`;
            params = [city.Name];
        }

        //console.log("SQL Query:", sql); // Log the SQL query before execution

        const [rows, fields] = await this.conn.execute(sql, params);
        //console.log("Returned Rows:", rows); // Log the returned rows

        return rows;
    }

    /* Get population for a specific city */
    async getPopulation(cityID) {
        const sql = `SELECT population FROM city WHERE ID = ?`;
        const [rows, fields] = await this.conn.execute(sql, [cityID]);
        if (rows.length === 0) {
            return null; // City not found
        }
        return rows[0].population;
    }

    async generateReport(continent, region, country, city, district, filter, sort) {
        let sql = `
            SELECT 
                city.Name AS city, 
                city.population AS population, 
                city.District AS district,
                country.Name AS country, 
                country.Continent AS continent, 
                country.Region AS region
            FROM 
                city
            INNER JOIN 
                country 
            ON 
                city.CountryCode = country.Code
            WHERE 
                1=1
        `;
    
        if (continent !== 'All') {
            sql += ` AND country.Continent = '${continent}'`;
        }
        if (region !== 'All') {
            sql += ` AND country.Region = '${region}'`;
        }
        if (country !== 'All') {
            sql += ` AND country.Name = '${country}'`;
        }
        if (city !== 'All') {
            sql += ` AND city.Name = '${city}'`;
        }
        if (district !== 'All') {
            sql += ` AND city.District = '${district}'`;
        }
    
        if (sort === 'lowToHigh') {
            sql += ` ORDER BY city.population ASC`;
        } else if (sort === 'highToLow') {
            sql += ` ORDER BY city.population DESC`;
        }
    
        console.log("Generated SQL:", sql); // Print the generated SQL
    
        const [rows, fields] = await this.conn.execute(sql);
        return rows;
    }
    
    
    
    
    
    
}
