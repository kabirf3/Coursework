document.addEventListener("DOMContentLoaded", () => {
  const continentSelect = document.getElementById('continentSelect');
  const regionSelect = document.getElementById('regionSelect');
  const countrySelect = document.getElementById('countrySelect');
  const citySelect = document.getElementById('citySelect');
  const districtSelect = document.getElementById('districtSelect');

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

    
      fetchRegions(selectedContinent);
  });

  // Event listener for when a region is selected
  regionSelect.addEventListener('change', () => {
      const selectedRegion = regionSelect.value;

      fetchCountries(selectedRegion);
  });

  // Event listener for when a country is selected
  countrySelect.addEventListener('change', () => {
      const selectedCountry = countrySelect.value;

     
      fetchCities(selectedCountry);
  });

  // Event listener for when a city is selected
  citySelect.addEventListener('change', () => {
      const selectedCity = citySelect.value;


      fetchDistricts(selectedCity);
  });

 
  fetchCities('All');
});

// Fetch regions based on the selected continent
function fetchRegions(selectedContinent) {
  const regionSelect = document.getElementById('regionSelect');

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

          // Populate countries with 'All' as default
          fetchCountries('All');
      })
      .catch(error => console.error('Error fetching regions:', error));
}

// Fetch countries based on the selected region
function fetchCountries(selectedRegion) {
  const countrySelect = document.getElementById('countrySelect');


  fetch(`http://localhost:3000/countries?region=${selectedRegion}`)
      .then(response => response.json())
      .then(countries => {
       
          countrySelect.innerHTML = '';

      
          const defaultOptionAll = document.createElement('option');
          defaultOptionAll.value = 'All';
          defaultOptionAll.text = 'All Countries';
          countrySelect.appendChild(defaultOptionAll);

   
          countries.forEach(country => {
              const option = document.createElement('option');
              option.value = country.code;
              option.text = country.name;
              countrySelect.appendChild(option);
          });

     
          fetchCities('All');
      })
      .catch(error => console.error('Error fetching countries:', error));
}

// Fetch cities based on the selected country
function fetchCities(selectedCountry) {
  const citySelect = document.getElementById('citySelect');


  fetch(`http://localhost:3000/cities?country=${selectedCountry}`)
      .then(response => response.json())
      .then(cities => {
         
          citySelect.innerHTML = '';

          // Add default option for all cities
          const defaultOptionAll = document.createElement('option');
          defaultOptionAll.value = 'All';
          defaultOptionAll.text = 'All Cities';
          citySelect.appendChild(defaultOptionAll);

          // Add fetched cities to the city combobox
          cities.forEach(city => {
              const option = document.createElement('option');
              option.value = city.id;
              option.text = city.name;
              citySelect.appendChild(option);
          });

      
          fetchDistricts('All');
      })
      .catch(error => console.error('Error fetching cities:', error));
}

function fetchDistricts(selectedCity) {
  const districtSelect = document.getElementById('districtSelect');

  // Clear existing options
  districtSelect.innerHTML = '';

  // Add default option for all districts
  const defaultOptionAll = document.createElement('option');
  defaultOptionAll.value = 'All';
  defaultOptionAll.text = 'All Districts';
  districtSelect.appendChild(defaultOptionAll);

  // If selectedCity is 'All', exit the function
  if (selectedCity === 'All') {
      return;
  }

  // Fetch districts based on the selected city
  fetch(`http://localhost:3000/districts?city=${selectedCity}`)
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(districts => {
          console.log('Fetched districts:', districts); // Log the fetched districts
          // Add fetched districts to the district combobox
          districts.forEach(district => {
              const option = document.createElement('option');
              // Check if district is an object
              if (typeof district === 'object') {
                  // Extract the district name from the object
                  option.value = district.District;
                  option.text = district.District;
              } else {
                  // If district is not an object, assume it's a string
                  option.value = district;
                  option.text = district;
              }
              districtSelect.appendChild(option);
          });
      })
      .catch(error => console.error('Error fetching districts:', error));
}

// Selectors for Filter Button and Filter Modal
const filterButton = document.querySelector('.btnFilter');
const filterModal = document.getElementById('filterModal');
const applyFilterButton = document.querySelector('.btnApplyFilter');
const filterSelect = document.getElementById('filterSelect');

// Show the modal when Filter button is clicked
filterButton.addEventListener('click', () => {
  filterModal.style.display = 'block';
});

// Close the modal when the user clicks outside of it
window.addEventListener('click', (event) => {
  if (event.target === filterModal) {
      filterModal.style.display = 'none';
  }
});

// Apply the selected filter when "Apply" is clicked
applyFilterButton.addEventListener('click', () => {
  const selectedFilter = filterSelect.value;
  const selectedCity = citySelect.value;

  // Fetch data based on selected filter
  fetchData(selectedCity, selectedFilter);

  // Close the modal
  filterModal.style.display = 'none';
});

// Selectors for Sort Button and Sort Modal
const sortButton = document.querySelector('.btnSort');
const sortModal = document.getElementById('sortModal');
const applySortButton = document.querySelector('.btnApplySort');
const sortSelect = document.getElementById('sortSelect');

// Show the sort modal when Sort button is clicked
sortButton.addEventListener('click', () => {
  sortModal.style.display = 'block';
});

// Apply the selected sorting when "Apply" is clicked
applySortButton.addEventListener('click', () => {
  const selectedSort = sortSelect.value;
  const selectedCity = citySelect.value;


  fetchSortedData(selectedCity, selectedSort);


  sortModal.style.display = 'none';
});

// Function to fetch data based on sorting
function fetchSortedData(selectedCity, selectedSort) {
  let url;
  if (selectedSort === 'lowToHigh') {
      url = `http://localhost:3000/population?city=${selectedCity}&sort=asc`;
  } else if (selectedSort === 'highToLow') {
      url = `http://localhost:3000/population?city=${selectedCity}&sort=desc`;
  }

  fetch(url)
      .then(response => response.json())
      .then(data => {
          // Handle the fetched data, e.g., display or process it
          console.log(data);
      })
      .catch(error => console.error('Error fetching sorted data:', error));
}
// Selector for Result per line button and modal
const resultPerLineButton = document.querySelector('.btnResultPP');
const resultPerLineModal = document.getElementById('ResultPPModal');
const applyResultButton = document.querySelector('.btnApplyResult');
const lineInput = document.getElementById('lineInput');

// Show the modal when Result per line button is clicked
resultPerLineButton.addEventListener('click', () => {
  resultPerLineModal.style.display = 'block';
});

// Apply the selected number of lines when "Apply" is clicked
applyResultButton.addEventListener('click', () => {
  const numLines = parseInt(lineInput.value);
  if (isNaN(numLines) || numLines <= 0) {
      alert('Please enter a valid number of lines.');
      return;
  }

  const selectedCity = citySelect.value;
  const selectedFilter = filterSelect.value; 

  // Fetch data based on selected city, filter, and the number of lines
  fetchData(selectedCity, selectedFilter, numLines);
});

async function fetchData(selectedCity, selectedFilter, numLines) {
  let url;

  if (selectedFilter === 'population') {
      url = `http://localhost:3000/population?city=${selectedCity}&limit=${numLines}`;
  } else if (selectedFilter === 'countryLanguage') {
      url = `http://localhost:3000/countryLanguage?countryCode=${selectedCity}&limit=${numLines}`;

  }

  fetch(url)
      .then(response => response.json())
      .then(data => {
          // Handle the fetched data, e.g., display or process it
          console.log(data);

          // Close the modal
          resultPerLineModal.style.display = 'none'; // Add this line to close the modal
      })
      .catch(error => console.error('Error fetching data:', error));
}





// Selector for Get Report button
const getReportButton = document.querySelector('.btnReport');
const reportContainer = document.getElementById('reportContainer');
const reportTable = document.getElementById('reportTable');

getReportButton.addEventListener('click', () => {
  const selectedContinent = continentSelect.value;
  const selectedRegion = regionSelect.value;
  const selectedCountry = countrySelect.value;
  const selectedCity = citySelect.value;
  const selectedDistrict = districtSelect.value;
  const selectedFilter = filterSelect.value;
  const selectedSort = sortSelect.value;

  // Fetch data based on selected criteria
  fetch(`/report?continent=${selectedContinent}&region=${selectedRegion}&country=${selectedCountry}&city=${selectedCity}&district=${selectedDistrict}&filter=${selectedFilter}&sort=${selectedSort}`)
      .then(response => response.json())
      .then(data => {
          // Populate the table with fetched data
          populateTable(data);
          // Show the report container
          reportContainer.style.display = 'block';
      })
      .catch(error => console.error('Error fetching report data:', error));
});

function populateTable(data) {
  const tbody = reportTable.querySelector('tbody');
  tbody.innerHTML = ''; // Clear existing rows

  data.forEach(rowData => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${rowData.continent}</td>
          <td>${rowData.region}</td>
          <td>${rowData.country}</td>
          <td>${rowData.city}</td>
          <td>${rowData.district}</td>
          <td>${rowData.population}</td>
          <td>${rowData.language}</td>
      `;
      tbody.appendChild(row);
  });
}

$(document).ready(function () {
  // Event listener for the Get Report button
  $('.btnReport').click(function () {
      // Show the report container when button is clicked
      $('#reportContainer').css('display', 'block');
  });




  // User Icon Menu
  const userIcon = document.getElementById("userIcon");
  const userMenu = document.getElementById("userMenu");

  userIcon.addEventListener("click", function(event) {
    console.log("User icon clicked");
    userMenu.classList.toggle("show");
    event.stopPropagation(); // Stop propagation to prevent the window click event
});

window.addEventListener("click", function(event) {
    console.log("Window clicked");
    if (!event.target.matches("#userIcon") && !event.target.matches("#userMenu")) {
        userMenu.classList.remove("show");
    }
});

userMenu.addEventListener("click", function(event) {
    console.log("User menu clicked");
    event.stopPropagation();
});
});
