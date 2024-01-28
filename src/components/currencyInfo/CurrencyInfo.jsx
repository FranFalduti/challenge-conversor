import React from 'react'
import './styles.css';
import { LINK_DOLLAR, LINK_EURO } from '../../utils';

export default function CurrencyInfo() {

    return (
        <div className='currency-info'>
            <p className='currency-text'>
                <a href={LINK_EURO} target="_blank" className='currency-text'>Euro </a>
                &nbsp;to&nbsp;
                <a href={LINK_DOLLAR} target="_blank" className='currency-text'>
                    US Dollar&nbsp;
                </a>
                conversion — Last updated Dec 15, 2022, 19:17 UTC
            </p>
        </div>
    )
}