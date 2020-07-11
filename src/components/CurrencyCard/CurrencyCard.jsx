import React from 'react';
import './CurrencyCard.scss';

const CurrencyCard = ({ handleChange, inputChange, inputValue, objectKey, optionValue, value }) => {

  const currencySymbolFormatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: `${value}`
  })
    
  return (
    objectKey ? (
      <div className="currency-card">
        <input className="currency-card-input" value={currencySymbolFormatter.format(inputValue)} onChange={inputChange} />
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