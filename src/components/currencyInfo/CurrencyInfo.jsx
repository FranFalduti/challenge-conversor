import React from 'react'
import './styles.css';

export default function CurrencyInfo() {

    return (
        <div className='currency-info'>
            <p className='currency-text'>
                <a href="https://www.xe.com/currency/eur-euro/" target="_blank" className='currency-text'>Euro </a>
                &nbsp;to&nbsp;
                <a href="https://www.xe.com/currency/usd-us-dollar/" target="_blank" className='currency-text'>
                    US Dollar&nbsp;
                </a>
                conversion — Last updated Dec 15, 2022, 19:17 UTC
            </p>
        </div>
    )
}