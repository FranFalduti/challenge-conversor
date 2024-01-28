import React from 'react'
import './styles.css';

export default function OtherConversion(props) {
  const {
    value,
    fromCurrency,
    exchangeRateSecond,
  } = props;

  const newCurrency = fromCurrency === 'EUR' ? 'USD' : 'EUR'; 

  const otherCurrency = fromCurrency === 'EUR' ? 'EUR' : 'USD'; 


  return (
    <div className='other-conversion'>
         <p className='small-amount'>{value} {newCurrency} = {exchangeRateSecond} {otherCurrency}</p>
    </div>
  )
}