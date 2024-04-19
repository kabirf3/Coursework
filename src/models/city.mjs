

const db = require('./db');

class City {
  static getAll() {
    const sql = 'SELECT * FROM city';
    return db.query(sql);
  }
}
module.exports = City;