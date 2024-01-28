import React from 'react'
import './styles.css';

export default function ConversorText(props) {
  const {
    fromCurrency,
    toCurrency,
    amount, 
    value
  } = props;

  const newCurrency = fromCurrency === 'Euro' ? 'Euro' : 'US Dollars'; 

  const otherCurrency = toCurrency === 'Euro' ? 'Euro' : 'US Dollars'; 

  return (
    <div className='real-conversion'>
         <p className='amount'>{value} {newCurrency} = {amount} {otherCurrency}</p>
    </div>
  )
}