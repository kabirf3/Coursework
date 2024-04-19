const City = require('../models/city');

async function listCities(req, res) {
  try {
    const [cities, _] = await City.getAll();
    res.render('cities', { cities });
  } catch (error) {
    res.status(500).send('Error retrieving cities');
  }
};

module.exports = {
  listCities
};

