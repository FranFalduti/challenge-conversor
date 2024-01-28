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
  const newSecondRate = exchangeRateSecond * value;
  const otherCurrency = validador(fromCurrency);

  return (
    <div className='other-conversion'>
         <p className='small-amount'>{value} {newCurrency} = {newSecondRate} {otherCurrency}</p>
    </div>
  )
}