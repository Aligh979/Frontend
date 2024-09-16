document.getElementById('addButton').addEventListener('click', function() {
    const countryInput = document.getElementById('countryInput');
    const country = countryInput.value.trim();

    if (country === "") {
        alert('Please enter a country.');
        return;
    }

    if (!supportedCountries.includes(country.toLowerCase())) {
        alert('Country not recognized. Please enter a valid country name.');
        return;
    }

    fetchPopulationData(country);
    countryInput.value = '';
    updateCountryList(); 
});

// Funksjon for å hente befolkningsdata fra API
function fetchPopulationData(country) {
    const apiUrl = `https://d6wn6bmjj722w.population.io/1.0/population/${country}/today-and-tomorrow/`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.total_population && data.total_population.length > 0) {
                const population = data.total_population[0].population;
                addCountryToList(country, population);
            } else {
                alert('No population data found for the specified country.');
            }
        })
        .catch(error => console.error('Error fetching population data:', error));
}

function addCountryToList(country, population) {
    const countryList = document.getElementById('countryList');
    const listItem = document.createElement('li');
    listItem.textContent = `${country} - Population: ${population}`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button';

    deleteButton.addEventListener('click', function() {
        countryList.removeChild(listItem);
        updateCountryList(); 
    });

    listItem.appendChild(deleteButton);
    countryList.appendChild(listItem);
}

// Funksjon for å oppdatere listen basert på søkeord
function updateCountryList() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const countryList = Array.from(document.querySelectorAll('#countryList li'));

    countryList.forEach(function(listItem) {
        const countryName = listItem.firstChild.textContent.toLowerCase();
        if (countryName.startsWith(searchInput)) {
            listItem.style.display = ''; 
        } else {
            listItem.style.display = 'none'; 
        }
    });
}

// Legg til event listener for søkefeltet
document.getElementById('searchInput').addEventListener('input', updateCountryList);

let supportedCountries = [];

// Funksjon for å hente støttede land fra API ved sideinnlasting
window.onload = function() {
    fetch('https://d6wn6bmjj722w.population.io/1.0/countries/')
        .then(response => response.json())
        .then(data => {
            supportedCountries = data.countries.map(country => country.toLowerCase());
        })
        .catch(error => console.error('Error fetching supported countries:', error));
};

