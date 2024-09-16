// in5320-assignment2-master/src/App.js
import React, { useState, useEffect } from "react";
import "./App.css";
import Table from "./Table.js";
import SearchBar from "./SearchBar.js";
import PageSizeSelector from "./PageSizeSelector.js"; // Import the PageSizeSelector component

function App() {
  const [apiData, setApiData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Default = No search query
  const [pageNumber, setPageNumber] = useState(1); // Default = Page 1
  const [pageSize, setPageSize] = useState(10); // Default = 10 results per page

  useEffect(() => {
    let apiQuery = "https://dhis2-app-course.ifi.uio.no/api?";

    if (searchQuery) {
      apiQuery = apiQuery + "&search=" + searchQuery;
    }

    apiQuery = apiQuery + "&page=" + pageNumber + "&pageSize=" + pageSize;

    fetch(apiQuery)
      .then((response) => response.json())
      .then((data) => setApiData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [searchQuery, pageNumber, pageSize]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="App">
      <SearchBar onSearch={handleSearch} />
      <PageSizeSelector pageSize={pageSize} setPageSize={setPageSize} />
      <Table apiData={apiData} />
    </div>
  );
}

export default App;