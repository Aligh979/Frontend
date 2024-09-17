import React from "react";

const continents = ["Asia", "Europa", "Afrika", "Oseania", "Nord-Amerika", "Sør-Amerika"];

const ContinentSelector = ({ selectedContinents, setSelectedContinents }) => {
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    
    if (checked) {
      setSelectedContinents([...selectedContinents, value]);
    } else {
      setSelectedContinents(selectedContinents.filter((continent) => continent !== value));
    }
  };

  return (
    <div>
      <h3>Velg kontinenter:</h3>
      <div className="checkbox-container">
      {continents.map((continent) => (
        <div key={continent}>
          <label>
            <input
              type="checkbox"
              value={continent}
              checked={selectedContinents.includes(continent)}
              onChange={handleCheckboxChange}
            />
            {continent}
          </label>
        </div>
      ))}
    </div>
    </div>
  );
};

export default ContinentSelector;
