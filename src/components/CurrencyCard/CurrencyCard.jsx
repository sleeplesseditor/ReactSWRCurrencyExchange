import React from 'react';
import './CurrencyCard.scss';

const CurrencyCard = ({ handleChange, inputChange, inputValue, objectKey, optionValue, value }) => {
  console.log('KEY', objectKey)
  return (
    objectKey ? (
      <div className="currency-card">
        <input className="currency-card-input" value={inputValue} onChange={inputChange} />
        <select className="currency-card-select" value={value} onChange={handleChange}>
          <option value={`${optionValue}`}>{optionValue}</option>
          {Object.keys(objectKey.rates).map((rate, key) => (
            <option key={key} value={rate}>
              {rate}
            </option>
          ))}
        </select>
      </div>
    ): 'Loading...'
  )
}

export default CurrencyCard;