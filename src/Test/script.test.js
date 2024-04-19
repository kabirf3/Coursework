// Unit testing
// Chosen unit test was for fetchRegions

// Importing the fetchRegions function from the file where it's defined
const fetchRegions = require('../script.js');

// Mock the fetch function using Jest's mocking capabilities
// To be able to use Jest, make sure to install it with "npm i jest --save-dev"
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([
      'Caribbean',
      'Southern Asia',
      'Northern Asia',
      'Central Asia',
      'Southern Europe',
      'Middle East',
      'Polynesia',
      'Antarctica',
      'Eastern Europe',
      'Western Africa',
      'Western Europe',
      'Eastern Africa',
      'Australia and New Zealand'
    ]) // Mock the response JSON data with the regions you mentioned
  })
);

// The unit test
test('fetchRegions populates region select box with fetched regions', async () => {
  // Mock the DOM element for the region select box
  document.body.innerHTML = '<select id="regionSelect"></select>';

  // Call the fetchRegions function
  await fetchRegions('TestContinent');

  // Check if the region select box is populated with the fetched regions
  const regionSelect = document.getElementById('regionSelect');

  // Expect the region select box to contain options for each region
  expect(regionSelect.innerHTML).toContain('<option value="Caribbean">Caribbean</option>');
  expect(regionSelect.innerHTML).toContain('<option value="Southern Asia">Southern Asia</option>');
  expect(regionSelect.innerHTML).toContain('<option value="Northern Asia">Northern Asia</option>');
  expect(regionSelect.innerHTML).toContain('<option value="Central Asia">Central Asia</option>');
  expect(regionSelect.innerHTML).toContain('<option value="Southern Europe">Southern Europe</option>');
  expect(regionSelect.innerHTML).toContain('<option value="Middle East">Middle East</option>');
  expect(regionSelect.innerHTML).toContain('<option value="Polynesia">Polynesia</option>');
  expect(regionSelect.innerHTML).toContain('<option value="Antarctica">Antarctica</option>');
  expect(regionSelect.innerHTML).toContain('<option value="Eastern Europe">Eastern Europe</option>');
  expect(regionSelect.innerHTML).toContain('<option value="Western Africa">Western Africa</option>');
  expect(regionSelect.innerHTML).toContain('<option value="Western Europe">Western Europe</option>');
  expect(regionSelect.innerHTML).toContain('<option value="Eastern Africa">Eastern Africa</option>');
  expect(regionSelect.innerHTML).toContain('<option value="Australia and New Zealand">Australia and New Zealand</option>');
});
