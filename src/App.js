import './App.css';
import React, { useState, useEffect } from "react";
import { URL_API, URL_DOLAR } from './utils';
import buttonImage from './img/Button.png'

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1.00);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }

  useEffect(() => {
    fetch(URL_API)
      .then(res => res.json())
      .then(respuesta => {
        const firstCurrency = Object.keys(respuesta.rates)[0]
        const numerosFiltrados = [respuesta.base, ...Object.keys(respuesta.rates).filter((pais) => {
          return pais === 'EUR' || pais === 'USD'
        })];

        const resultado = [
          ...new Set(numerosFiltrados)
        ];
        setCurrencyOptions(resultado);
        setToCurrency(firstCurrency)
        setExchangeRate(respuesta.rates[firstCurrency])
      })
  }, []);

  useEffect(() => {
    fetch(URL_DOLAR)
      .then(res => res.json())
      .then(respuesta => {
        setFromCurrency(respuesta.base)
      })
  }, []);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${URL_API}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(res => res.json())
        .then(resultado => setExchangeRate(resultado.rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency])

  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

  function invertCurrency() {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }

  return (
    <div className="app">
      <header className="currencyExchange">
        <p>Currency exchange</p>
      </header>
      <div>
        <div>
          <p>100 EUR to USD - Convert Euros to US Dollars</p>
        </div>
      </div>
      <div>
        <input type="number" className="input" value={fromAmount} onChange={handleFromAmountChange} />
        <select value={fromCurrency} onChange={e => setFromCurrency(e.target.value)}>
          {currencyOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
      <div className="equals">
      <input type="image" src={buttonImage} onClick={invertCurrency}/>
        </div>
      <div>
        <select value={toCurrency} onChange={e => setToCurrency(e.target.value)}>
          {currencyOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <p>{toAmount}</p>
      </div>
    </div>
  );
}

export default App;