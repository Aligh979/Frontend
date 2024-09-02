document.getElementById('addButton').addEventListener('click', function() {
    const countryInput = document.getElementById('countryInput');
    const country = countryInput.value;

    if (country.trim() !== "") {
        addCountryToList(country);
        countryInput.value = ''; // Rens input-feltet etter at verdien er lagt til
    } else {
        alert('Please enter a country.');
    }
});

function addCountryToList(country) {
    const countryList = document.getElementById('countryList');

    // Opprett et nytt liste-element
    const listItem = document.createElement('li');
    listItem.textContent = country;

    // Opprett en slett-knapp
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-button';

    // Legg til en event listener for å fjerne liste-elementet når slett-knappen blir klikket
    deleteButton.addEventListener('click', function() {
        countryList.removeChild(listItem);
    });

    // Legg slett-knappen til liste-elementet
    listItem.appendChild(deleteButton);

    // Legg det nye liste-elementet til listen
    countryList.appendChild(listItem);
}
