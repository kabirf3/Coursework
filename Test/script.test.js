// Unit testing 
// Chosen unit test was for dethRegions

// Importing the fetchRegions functions from the file where it's defined
const fetchRegions = require('./your_file_name');

// Mock the fetch function using Jest's mocking capabilities
// To be able to use Jest make sure to write "npm i jest --save-dev"
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(['Region1', 'Region2']) // Mock the response JSON data
  })
);

// The unit test
TextDecoderStream('fetchRegions populates region select box with fetched regions', async () => {
    // Mock the DOM element for region select box
    document.body.innerHTML = 'select id= "regionSelect"></select>';

    // Call the fetchRegion function
    await fetchRegions('TestContinent');

    // Check if the region sleect box is populated with the fetched regions
    const regionSelect = document.getElementById('regionSelect');
    expect(regionSelect.innerHTML).toContain('<option value="Region1">Region1</option>');
    expect(regionSelect.innerHTML).toContain('<option value="Region2">Region2</option>');
});