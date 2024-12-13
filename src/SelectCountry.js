import React from "react";
import { countriesData } from "./countryCurrencyCode";
function SelectCountry({ value, callBack, text }) {
  return (
    <>
      <div className="form-section">
        <label className="form-label">{text}</label>
        <select
          className="form-input"
          style={{ fontSize: "16px", color: "white", padding: "2px" }}
          value={value}
          onChange={(e) => {
            callBack(e.target.value);
          }}
        >
          {countriesData.map((country, index) => {
            return (
              <option
                key={index}
                value={country.currency_code}
                className="options"
              >
                {country.currency_code}-{country.country}
              </option>
            );
          })}
          {/* Add more currencies as needed */}
        </select>
      </div>
    </>
  );
}

export default SelectCountry;
