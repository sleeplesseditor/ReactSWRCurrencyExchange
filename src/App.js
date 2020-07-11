import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import fetch from "unfetch";
import useSWR from "swr";

const API_URL = "https://api.exchangeratesapi.io";

const fetcher = async path => {
  const res = await fetch(API_URL + path);
  const json = await res.json();
  return json;
};

function App() {
  const { data: currencies } = useSWR("/latest?base=EUR", fetcher);

  const [fromValue, setFromValue] = useState(1);
  const [toValue, setToValue] = useState(1);

  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("EUR");

  const handleFromCurrencyChange = e => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = e => {
    setToCurrency(e.target.value);
  };

  const handleFromValueChange = e => {
    setFromValue(parseFloat(e.target.value));
  };

  const handleToValueChange = e => {
    setToValue(parseFloat(e.target.value));
  };

  const convertFromTo = () => {
    const fromRate =
      fromCurrency === "EUR" ? 1 : currencies.rates[fromCurrency];
    const valueInEur = fromValue / fromRate;
    const toRate = toCurrency === "EUR" ? 1 : currencies.rates[toCurrency];
    setToValue(valueInEur * toRate);
  };

  const convertToFrom = () => {
    const toRate = toCurrency === "EUR" ? 1 : currencies.rates[toCurrency];
    const valueInEur = toValue / toRate;
    const fromRate =
      fromCurrency === "EUR" ? 1 : currencies.rates[fromCurrency];
    setFromValue(valueInEur * fromRate);
  };

  useEffect(() => {
    convertFromTo();
  }, [fromValue, toCurrency]);

  useEffect(() => {
    convertToFrom();
  }, [toValue, fromCurrency]);

  if (!currencies) {
    return null;
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div>
        <div>
          <input value={fromValue} onChange={handleFromValueChange} />
        </div>
        <div>
          <input value={toValue} onChange={handleToValueChange} />
        </div>
        <div>
          <select value={fromCurrency} onChange={handleFromCurrencyChange}>
            <option value={'EUR'}>EUR</option>
            {Object.keys(currencies.rates).map((rate, key) => (
              <option key={key} value={rate}>
                {rate}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select value={toCurrency} onChange={handleToCurrencyChange}>
            <option value={'EUR'}>EUR</option>
            {Object.keys(currencies.rates).map((rate, key) => (
              <option key={key} value={rate}>
                {rate}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default App;
