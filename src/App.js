import { useEffect, useState, useRef } from "react";
import SelectCountry from "./SelectCountry";
import "./App.css";
function App() {
  const [inputValue, setInputValue] = useState();
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [exchangeRate, setExchangeRate] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);

  const API_KEY = "d01727d85bb2f8dcd3795a08"; // Replace with your actual API key

  const InputRF = useRef(null);

  useEffect(() => {
    InputRF.current.focus();
  }, []);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency}`
        );
        const data = await response.json();
        if (data.result === "success") {
          setExchangeRate(data.conversion_rates[toCurrency]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchExchangeRate();
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    if (inputValue === exchangeRate) return;
    if (exchangeRate !== null) {
      setConvertedAmount(inputValue * exchangeRate);
    }
  }, [inputValue, exchangeRate]);

  function handleChange() {
    setToCurrency(fromCurrency);
    setFromCurrency(toCurrency);
  }
  function handleInput(e) {
    const value = e.target.value;

    // Allow only empty input or values greater than or equal to 1
    if (value === "" || Number(value) >= 1) {
      setInputValue(value); // Update state for valid input
    } else {
      setInputValue(""); // Clear the input if invalid
      console.log("Value must be 1 or greater"); // Optional: log an error
    }
  }

  return (
    <div className="currency-converter">
      <h2 className="converter-title">Currency Converter</h2>
      <div className="converter-form">
        <div className="form-group">
          <label className="form-label">Enter Amount</label>
          <input
            className="form-input"
            type="number"
            placeholder={`Enter Amount in ${fromCurrency}`}
            value={inputValue}
            onChange={(e) => handleInput(e)}
            ref={InputRF}
          />
        </div>

        <div className="form-group form-currency-group">
          <SelectCountry
            value={fromCurrency}
            callBack={setFromCurrency}
            text={"From"}
          />
          <div className="swap-icon">
            <svg
              width="20"
              viewBox="0 0 20 19"
              xmlns="http://www.w3.org/2000/svg"
              onClick={handleChange}
            >
              <path
                d="M19.13 11.66H.22a.22.22 0 0 0-.22.22v1.62a.22.22 0 0 0 .22.22h16.45l-3.92 4.94a.22.22 0 0 0 .17.35h1.97c.13 0 .25-.06.33-.16l4.59-5.78a.9.9 0 0 0-.7-1.43zM19.78 5.29H3.34L7.26.35A.22.22 0 0 0 7.09 0H5.12a.22.22 0 0 0-.34.16L.19 5.94a.9.9 0 0 0 .68 1.4H19.78a.22.22 0 0 0 .22-.22V5.51a.22.22 0 0 0-.22-.22z"
                fill="#fff"
              />
            </svg>
          </div>

          <SelectCountry
            value={toCurrency}
            callBack={setToCurrency}
            text={"To"}
          />
        </div>

        <div className="result">
          <p className="exchange-rate-result">
            {/* Display the conversion result */}
            {`${(convertedAmount || 0).toFixed(2)} ${toCurrency}`}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
