import React from 'react'
import './styles.css';

export default function OtherConversion(props) {
  const {
    amount, 
    value,
    fromCurrency,
    toCurrency,
  } = props;

  const newCurrency = fromCurrency === 'EUR' ? 'USD' : 'EUR'; 

  const otherCurrency = toCurrency === 'EUR' ? 'USD' : 'EUR'; 

  return (
    <div className='other-conversion'>
         <p className='small-amount'>{amount} {newCurrency} = {value} {otherCurrency}</p>
    </div>
  )
}