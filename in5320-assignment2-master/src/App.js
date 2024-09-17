import React, { useState, useEffect } from "react";
import "./App.css";
import Table from "./Table.js";
import SearchBar from "./SearchBar.js";
import PageSizeSelector from "./PageSizeSelector.js";
import Pagination from "./Pagination.js";
import ContinentSelector from "./ContinentSelector.js"; // Importer ContinentSelector-komponenten

function App() {
  const [apiData, setApiData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Standardverdi: Ingen søkespørring
  const [pageNumber, setPageNumber] = useState(1); // Standardverdi: Side 1
  const [pageSize, setPageSize] = useState(10); // Standardverdi: 10 resultater per side
  const [totalPages, setTotalPages] = useState(1); // Standardverdi: 1 side
  const [sortColumn, setSortColumn] = useState(null); // Standardverdi: Ingen sortering
  const [sortOrder, setSortOrder] = useState("asc"); // Standardverdi: Stigende rekkefølge
  const [selectedContinents, setSelectedContinents] = useState([]); // Standardverdi: Ingen valgte kontinenter

  useEffect(() => {
    let apiQuery = "https://dhis2-app-course.ifi.uio.no/api?";

    if (searchQuery) {
      apiQuery += "&search=" + searchQuery;
    }

    apiQuery += "&page=" + pageNumber + "&pageSize=" + pageSize;

    if (selectedContinents.length > 0) {
      const continentCodes = selectedContinents.map(continent => {
        switch (continent) {
          case "Asia": return "AS";
          case "Europa": return "EU";
          case "Afrika": return "AF";
          case "Oseania": return "OC";
          case "Nord-Amerika": return "NA";
          case "Sør-Amerika": return "SA";
          default: return "";
        }
      });

      apiQuery += "&ContinentCode=" + continentCodes.join(",");
    }

    fetch(apiQuery)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setApiData(data.results);
        setTotalPages(data.pager.pageCount);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [searchQuery, pageNumber, pageSize, selectedContinents]);


  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  return (
    <div className="App">
      <div className="container">
      <SearchBar onSearch={handleSearch} />
      <ContinentSelector
        selectedContinents={selectedContinents}
        setSelectedContinents={setSelectedContinents}
      />
      
      <Table
        apiData={apiData}
        sortColumn={sortColumn}
        sortOrder={sortOrder}
        onSort={handleSort}
      />
      <PageSizeSelector pageSize={pageSize} setPageSize={setPageSize} />
      {totalPages > 1 && (
        <Pagination
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          totalPages={totalPages}
        />
      )}
      </div>
    </div>
  );
}

export default App;
