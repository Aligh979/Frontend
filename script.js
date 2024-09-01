document.getElementById('addButton').addEventListener('click', function() {
    // Hent verdien fra input-boksen
    const countryInput = document.getElementById('countryInput');
    const country = countryInput.value;

    // Sjekk om input-feltet ikke er tomt
    if (country.trim() !== "") {
        addCountryToList(country);
        countryInput.value = ''; // Rens input-feltet etter at verdien er lagt til
    } else {
        alert('Please enter a country.');
    }
});

function addCountryToList(country) {
    // Finn listen der vi skal legge til et nytt element
    const countryList = document.getElementById('countryList');

    // Opprett et nytt liste-element
    const listItem = document.createElement('li');
    listItem.textContent = country;

    // Legg til det nye liste-elementet i listen
    countryList.appendChild(listItem);
}
