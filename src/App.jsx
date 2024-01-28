import './App.css';
import React, { useState, useEffect } from "react";
import { validador, fetchData } from './utils';
import buttonImage from './img/Button.svg';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Autocomplete, TextField, InputAdornment } from "@mui/material";
import ConversorText from './components/conversorText/ConversorText';
import OtherConversion from './components/otherConversion/OtherConversion';
import InformationRectangle from './components/informationRectangle/InformationRectangle';
import CurrencyInfo from './components/currencyInfo/CurrencyInfo';

function App() {
  const [fromCurrency, setFromCurrency] = useState('Dollars');
  const [toCurrency, setToCurrency] = useState('Euro');
  const [exchangeRate, setExchangeRate] = useState();
  const [exchangeRateSecond, setExchangeRateSecond] = useState();
  const [amount, setAmount] = useState(1.00);
  const [fromAmount, setFromAmount] = useState(1);
  const [toAmount, setToAmount] = useState(1);
  const currencyOptions = ['Dollars', 'Euro'];

  useEffect(() => {
    setFromAmount(amount);
    setToAmount(amount * exchangeRate);
  }, [fromAmount, amount, exchangeRate]);

  function amountSetter(e) {
    setAmount(e.target.value);
  }

  function invertCurrency() {
    setToCurrency(fromCurrency);
    setFromCurrency(toCurrency);
  }

  useEffect(() => {
    const fromCurrencyValidated = validador(fromCurrency);
    const toCurrencyValidated = validador(toCurrency);
      fetchData({
        base: fromCurrencyValidated,
        symbols: toCurrencyValidated,
      }).then(result => setExchangeRate(result.rates[toCurrencyValidated]));

      fetchData({
        base: toCurrencyValidated,
        symbols: fromCurrencyValidated,
      }).then(result => setExchangeRateSecond(result.rates[fromCurrencyValidated]));
    
  }, [fromCurrency, toCurrency]);


  return (
    <div className="app">
      <div className="currency-exchange">
        <p className='header-title'>Currency exchange</p>
      </div>
      <div className='main-background'>
        <div className='main-title'>
          <p className='title'>100 EUR to USD - Convert Euros to US Dollars</p>
        </div>
        <div className='card'>
          <div className='field-currency'>
            <div className='specific-field'>
              <p className='specific-text'>Amount</p>
              <TextField
                sx={{
                  input: {
                    fontFamily: 'Inter',
                    fontSize: '16px',
                    fontWeight: 600,
                    lineHeight: '20px',
                    letterSpacing: '0em',
                    textAlign: 'left'
                  }
                }}
                value={fromAmount}
                onChange={amountSetter}
                fullWidth
                type='number'
                onKeyDown={(event) => {
                  if (event.key.match(/[+-]/)) {
                    event.preventDefault();
                  }
                }}
                InputProps={{
                  min: 0,
                  startAdornment: (
                    <InputAdornment position="start" style={{ fontWeight: '600' }}>
                      <p className='text-field'>$</p>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className='specific-field'>
              <p className='specific-text'>From</p>
              <Autocomplete
                sx={{
                  input: {
                    fontFamily: 'Inter',
                    fontSize: '16px',
                    fontWeight: 600,
                    lineHeight: '20px',
                    letterSpacing: '0em',
                    textAlign: 'left'
                  }
                }}
                value={fromCurrency}
                disableClearable
                onChange={(evento, nuevoValor) => {
                  setFromCurrency(nuevoValor);
                }}
                popupIcon={<KeyboardArrowDownIcon />}
                options={currencyOptions}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" />
                )}
              />
            </div>
            <div className="invert">
              <input type="image" src={buttonImage} alt='' onClick={invertCurrency} />
            </div>
            <div className='specific-field'>
              <p className='specific-text'>To</p>
              <Autocomplete
                sx={{
                  input: {
                    fontFamily: 'Inter',
                    fontSize: '16px',
                    fontWeight: 600,
                    lineHeight: '20px',
                    letterSpacing: '0em',
                    textAlign: 'left'
                  }
                }}
                value={toCurrency}
                disableClearable
                onChange={(evento, nuevoValor) => setToCurrency(nuevoValor)}
                popupIcon={<KeyboardArrowDownIcon />}
                options={currencyOptions}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" />
                )}
              />
            </div>
          </div>
          <div className='extra-components'>
            <div className='conversors-information'>
              <ConversorText fromCurrency={fromCurrency} toCurrency={toCurrency} amount={toAmount} value={fromAmount} />
              <OtherConversion fromCurrency={fromCurrency} toCurrency={toCurrency} exchangeRateSecond={exchangeRateSecond} value={fromAmount} />
            </div>
            <div className='conversors-information-second'>
              <InformationRectangle />
              <CurrencyInfo />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;