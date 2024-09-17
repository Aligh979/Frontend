import React from 'react';

function Table({ apiData }) {
  console.log(apiData);

  if (!apiData || apiData.length === 0) {
    // If the API request isn't completed or no results, return "loading..."
    return <p>Loading...</p>;
  } else {
    // Create table headers
    return (
      <table>
        <thead>
          <tr>
            <th>Country</th>
            <th>Continent</th>
            <th>Population</th>
            <th>Population Growth</th>
          </tr>
        </thead>
        <tbody>
          {apiData.map((country, index) => (
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