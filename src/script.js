document.addEventListener("DOMContentLoaded", () => {
  const continentSelect = document.getElementById('continentSelect');
  const regionSelect = document.getElementById('regionSelect');

  // Fetch continents from server and populate continent select box
  fetch('http://localhost:3000/continents')
    .then(response => response.json())
    .then(continents => {
      // Clear existing options
      continentSelect.innerHTML = '';

      // Add default option
      const defaultOption = document.createElement('option');
      defaultOption.value = 'All';
      defaultOption.text = 'All Continents';
      continentSelect.appendChild(defaultOption);

      // Add fetched continents to the combobox
      continents.forEach(continent => {
        const option = document.createElement('option');
        option.value = continent;
        option.text = continent;
        continentSelect.appendChild(option);
      });

      // Populate regions with 'All' as default on DOMContentLoaded
      fetchRegions('All');
    })
    .catch(error => console.error('Error fetching continents:', error));

  // Event listener for when a continent is selected
  continentSelect.addEventListener('change', () => {
    const selectedContinent = continentSelect.value;

    // Fetch regions based on the selected continent
    if (selectedContinent === 'All') {
      // If 'All' continents selected, populate all regions
      fetchRegions('All');
    } else {
      // Otherwise, fetch regions for the selected continent
      fetchRegions(selectedContinent);
    }
  });
});

// Fetch regions based on the selected continent
function fetchRegions(selectedContinent) {
  const regionSelect = document.getElementById('regionSelect');

  // Fetch regions based on the selected continent
  fetch(`http://localhost:3000/regions?continent=${selectedContinent}`)
    .then(response => response.json())
    .then(regions => {
      // Clear existing options
      regionSelect.innerHTML = '';

      // Add default option
      const defaultOption = document.createElement('option');
      defaultOption.value = 'All';
      defaultOption.text = 'All Regions';
      regionSelect.appendChild(defaultOption);

      // Add fetched regions to the region combobox
      regions.forEach(region => {
        const option = document.createElement('option');
        option.value = region;
        option.text = region;
        regionSelect.appendChild(option);
      });
    })
    .catch(error => console.error('Error fetching regions:', error));
}
