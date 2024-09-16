import React, { useState, useEffect } from "react";
import "./App.css";
import Table from "./Table.js";
import SearchBar from "./SearchBar.js"; // Import the SearchBar component

function App() {
  const [apiData, setApiData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Default = No search query
  const [pageNumber, setPageNumber] = useState(1); // Default = Page 1

  useEffect(() => {
    let apiQuery = "https://dhis2-app-course.ifi.uio.no/api?";

    if (searchQuery) {
      apiQuery = apiQuery + "&search=" + searchQuery;
    }

    apiQuery = apiQuery + "&page=" + pageNumber;

    fetch(apiQuery)
      .then((response) => response.json())
      .then((data) => setApiData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [searchQuery, pageNumber]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="App">
      <SearchBar onSearch={handleSearch} />
      <Table apiData={apiData} />
    </div>
  );
}

export default App;