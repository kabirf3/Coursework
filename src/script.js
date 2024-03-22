// Continents combobox element
const continentSelect = document.getElementById('continentSelect');

// Fetch continents from server
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
  })
  .catch(error => console.error('Error fetching continents:', error));
