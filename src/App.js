import './App.css';
import React, { useState, useEffect } from "react";
import { URL_API, URL_DOLAR } from './utils';
import buttonImage from './img/Button.svg';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Autocomplete, TextField, InputAdornment } from "@mui/material"

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState('USD');
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

  function invertCurrency() {
    setToCurrency(fromCurrency);
    setFromCurrency(toCurrency);
  }

  return (
    <div className="app">
      <div className="currency-exchange">
        <p className='header-title'>Currency exchange</p>
      </div>
      <div>
        <div>
          <p>100 EUR to USD - Convert Euros to US Dollars</p>
        </div>
      </div>
      <div>
        <div>
          <TextField
            value={fromAmount}
            onChange={handleFromAmountChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  $
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div>
          <Autocomplete
            value={fromCurrency}
            disableClearable
            onChange={(evento) => setFromCurrency(evento)}
            popupIcon={<KeyboardArrowDownIcon />}
            options={currencyOptions}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" />
            )}
          />
        </div>
      </div>
      <div className="equals">
        <input type="image" src={buttonImage} alt='' onClick={invertCurrency} />
      </div>
      <div>
        <Autocomplete
          value={toCurrency}
          disableClearable
          onChange={(evento) => setToCurrency(evento)}
          popupIcon={<KeyboardArrowDownIcon />}
          options={currencyOptions}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" />
          )}
        />
        <p>{toAmount}</p>
      </div>
    </div>
  );
}

export default App;