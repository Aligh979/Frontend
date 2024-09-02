document.getElementById('addButton').addEventListener('click', function() {
    const countryInput = document.getElementById('countryInput');
    const country = countryInput.value;

    if (country.trim() !== "") {
        addCountryToList(country);
        countryInput.value = ''; 
        updateCountryList(); 
    } else {
        alert('Please enter a country.');
    }
});

function addCountryToList(country) {
    const countryList = document.getElementById('countryList');
    const listItem = document.createElement('li');
    listItem.textContent = country;

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
