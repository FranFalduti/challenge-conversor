import './App.css';
import React, { useState, useEffect } from "react";
import CurrencyRow from './CurrencyRow'
import { URL_API } from './utils';

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
        /*         setCurrencyOptions([respuesta.base, ...Object.keys(respuesta.rates)]) */
        const numerosFiltrados = [respuesta.base, ...Object.keys(respuesta.rates).filter((pais) => {
          return pais === 'EUR' || pais === 'USD'
        })];

        const resultado = [
          ...new Set(numerosFiltrados)
        ];

        setCurrencyOptions(resultado);
        setFromCurrency(respuesta.base)
        setToCurrency(firstCurrency)
        setExchangeRate(respuesta.rates[firstCurrency])
      })
  }, []);

  console.log('currencyOptions', currencyOptions);

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
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={e => setFromCurrency(e.target.value)}
        onChangeAmount={handleFromAmountChange}
        amount={fromAmount}
      />
      <div className="equals">=</div>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={e => setToCurrency(e.target.value)}
        onChangeAmount={handleToAmountChange}
        amount={toAmount}
      />
    </div>
  );
}

export default App;