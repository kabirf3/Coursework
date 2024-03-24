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
}
