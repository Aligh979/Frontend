import React from 'react';

function Table({ apiData, sortColumn, sortOrder, onSort }) {
  console.log(apiData);

  const handleSort = (column) => {
    onSort(column);
  };

  const sortedData = [...apiData].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) {
      return sortOrder === "asc" ? -1 : 1;
    }
    if (a[sortColumn] > b[sortColumn]) {
      return sortOrder === "asc" ? 1 : -1;
    }
    return 0;
  });

  if (!apiData || apiData.length === 0) {
    // If the API request isn't completed or no results, return "loading..."
    return <p>Loading...</p>;
  } else {
    // Create table headers
    return (
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("Country")}>Country</th>
            <th onClick={() => handleSort("Continent")}>Continent</th>
            <th onClick={() => handleSort("Population")}>Population</th>
            <th onClick={() => handleSort("PopulationGrowth")}>Population Growth</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((country, index) => (
            <tr key={index}>
              <td>{country.Country}</td>
              <td>{country.Continent}</td>
              <td>{country.Population}</td>
              <td>{country.PopulationGrowth}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Table;