require('dotenv').config();
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DATABASE_HOST || 'localhost',
  user: 'root',
  password: '',
  database: 'world',
  port: "3306",
  waitForConnections: true
});

module.exports = pool.promise();


const db = require('./db');

class City {
  static getAll() {
    const sql = 'SELECT * FROM city';
    return db.query(sql);
  }
}
module.exports = City;