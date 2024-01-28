import React from 'react'
import './styles.css';
import { validador } from '../../utils';

export default function OtherConversion(props) {
  const {
    value,
    fromCurrency,
    exchangeRateSecond,
    toCurrency
  } = props;

  const newCurrency = validador(toCurrency);
  const otherCurrency = validador(fromCurrency);

  return (
    <div className='other-conversion'>
         <p className='small-amount'>{value} {newCurrency} = {exchangeRateSecond} {otherCurrency}</p>
    </div>
  )
}