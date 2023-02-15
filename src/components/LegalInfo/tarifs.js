import React, { useState } from 'react';
import './style.css'
import { URL } from '../../static/Const/vars';

export function Tarifs(props) {

    return (
        <div>
            <div className='mt-4'>
                <a className='rules-link' target="_blank" href={URL + '/static/docs/TarifsAbsolute.pdf'} rel='noreferrer'>
                    СК Абсолют
                </a>
            </div>
            <div className='mt-4'>
                <a className='rules-link' target="_blank" href='https://zettains.ru/upload/rules/ipoteka-tarif.pdf?t=1672153626620#_ga=2.228500573.1768210846.1672153544-1332968066.1671794007' rel='noreferrer'>
                    Зетта Страхование
                </a>
            </div>
            
        </div>
    )
}