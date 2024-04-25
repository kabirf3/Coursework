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
  
      // Fetch regions based on the selected continent
      fetchRegions(selectedContinent);
    });
  
    // Event listener for when a region is selected
    regionSelect.addEventListener('change', () => {
      const selectedRegion = regionSelect.value;
  
      // Fetch countries based on the selected region
      fetchCountries(selectedRegion);
    });
  
    // Event listener for when a country is selected
    countrySelect.addEventListener('change', () => {
      const selectedCountry = countrySelect.value;
  
      // Fetch cities based on the selected country
      fetchCities(selectedCountry);
    });
  
    // Event listener for when a city is selected
    citySelect.addEventListener('change', () => {
      const selectedCity = citySelect.value;
  
      // Fetch districts based on the selected city
      fetchDistricts(selectedCity);
    });
  
    // Fetch all cities initially
    fetchCities('All');
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
  
        // Populate countries with 'All' as default
        fetchCountries('All');
      })
      .catch(error => console.error('Error fetching regions:', error));
  }
  
  // Fetch countries based on the selected region
  function fetchCountries(selectedRegion) {
    const countrySelect = document.getElementById('countrySelect');
  
    // Fetch countries based on the selected region
    fetch(`http://localhost:3000/countries?region=${selectedRegion}`)
      .then(response => response.json())
      .then(countries => {
        // Clear existing options
        countrySelect.innerHTML = '';
  
        // Add default option for all countries
        const defaultOptionAll = document.createElement('option');
        defaultOptionAll.value = 'All';
        defaultOptionAll.text = 'All Countries';
        countrySelect.appendChild(defaultOptionAll);
  
        // Add fetched countries to the country combobox
        countries.forEach(country => {
          const option = document.createElement('option');
          option.value = country.code;
          option.text = country.name;
          countrySelect.appendChild(option);
        });
  
        // Populate cities with 'All' as default
        fetchCities('All');
      })
      .catch(error => console.error('Error fetching countries:', error));
  }
  
  // Fetch cities based on the selected country
  function fetchCities(selectedCountry) {
    const citySelect = document.getElementById('citySelect');
  
    // Fetch cities based on the selected country
    fetch(`http://localhost:3000/cities?country=${selectedCountry}`)
      .then(response => response.json())
      .then(cities => {
        // Clear existing options
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
  
        // Populate districts with 'All' as default
        fetchDistricts('All');
      })
      .catch(error => console.error('Error fetching cities:', error));
  }
  
  // Fetch districts based on the selected city
  function fetchDistricts(selectedCity) {
    const districtSelect = document.getElementById('districtSelect');
  
    // Fetch districts based on the selected city
    fetch(`http://localhost:3000/districts?city=${selectedCity}`)
      .then(response => response.json())
      .then(districts => {
        // Clear existing options
        districtSelect.innerHTML = '';
  
        // Add default option for all districts
        const defaultOptionAll = document.createElement('option');
        defaultOptionAll.value = 'All';
        defaultOptionAll.text = 'All Districts';
        districtSelect.appendChild(defaultOptionAll);
  
        // Add fetched districts to the district combobox
        districts.forEach(district => {
          const option = document.createElement('option');
          option.value = district.District;
          option.text = district.District;
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
  
    // Fetch data based on selected sorting
    fetchSortedData(selectedCity, selectedSort);
  
    // Close the modal
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
  
  // Function to fetch data based on filter
  function fetchData(selectedCity, selectedFilter) {
    let url;
    if (selectedFilter === 'population') {
      url = `http://localhost:3000/population?city=${selectedCity}`;
    } else if (selectedFilter === 'countryLanguage') {
      url = `http://localhost:3000/countryLanguage?city=${selectedCity}`;
    }
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Handle the fetched data, e.g., display or process it
        console.log(data);
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
          `;
          tbody.appendChild(row);
      });
  }
  
  $(document).ready(function() {
    // Event listener for the Get Report button
    $('.btnReport').click(function() {
        // Show the report container when button is clicked
        $('#reportContainer').css('display', 'block');
    });
  });