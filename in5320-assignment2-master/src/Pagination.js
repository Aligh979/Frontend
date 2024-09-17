import React from 'react';

function Pagination({ pageNumber, setPageNumber, totalPages }) {
  const handlePrevious = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleNext = () => {
    if (pageNumber < totalPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  return (
    <div className="pagination">
      {pageNumber > 1 && (
        <button onClick={handlePrevious}>Previous</button>
      )}
      <span>Page {pageNumber} of {totalPages}</span>
      {pageNumber < totalPages && (
        <button onClick={handleNext}>Next</button>
      )}
    </div>
  );
}

export default Pagination;