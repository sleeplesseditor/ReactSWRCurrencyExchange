import React, { Fragment, useEffect, useState } from 'react';
import './App.scss';
import fetch from "unfetch";
import moment from 'moment';
import useSWR from "swr";
import Header from './components/Header/Header';
import CurrencyCard from './components/CurrencyCard/CurrencyCard';

const API_URL = "https://api.exchangeratesapi.io";

const fetcher = async path => {
  const res = await fetch(API_URL + path);
  const json = await res.json();
  return json;
};

const formattedDate = (date) => {
  return moment(date).format('dddd DD MMM yyyy')
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
    <Fragment>
    <Header />
    <div className="main-container">
      <div className="card-container">
        <div className="card-sub-container">
        <CurrencyCard 
          handleChange={handleFromCurrencyChange} 
          inputChange={handleFromValueChange}
          inputValue={fromValue}
          objectKey={currencies} 
          optionValue={'EUR'} 
          value={fromCurrency} 
        />
        <CurrencyCard 
          handleChange={handleToCurrencyChange}
          inputChange={handleToValueChange}
          inputValue={toValue}
          objectKey={currencies} 
          optionValue={'EUR'} 
          value={toCurrency} 
        />
        </div>
        <p>Prices accurate as of {formattedDate(currencies.date)}</p>
      </div>
    </div>
    </Fragment>
  );
}

export default App;
