import React, { useState } from 'react';
import './style.css'
import { URL } from '../../static/Const/vars';

export function Rules(props) {

    return (
        <div>
            <div className='mt-4'>
                <a className='rules-link' target="_blank" href={URL + '/static/docs/rules.pdf'} rel='noreferrer'>
                    СК Абсолют
                </a>
            </div>
            <div className='mt-4'>
                <a className='rules-link' target="_blank" href='https://zettains.ru/upload/rules/Pravila_AIZK_13_07_2021.pdf?t=1672153647694' rel='noreferrer'>
                    Зетта Страхование 1
                </a>
            </div>
            <div className='mt-4'>
                <a className='rules-link' target="_blank" href='https://zettains.ru/upload/rules/Pravila_ISS_new.pdf?t=1672153647694' rel='noreferrer'>
                    Зетта Страхование 2
                </a>
            </div>
            <div className='mt-4'>
                <a className='rules-link' target="_blank" href='https://zettains.ru/upload/rules/%D0%9F%D1%80%D0%B0%D0%B2%D0%B8%D0%BB%D0%B0%20%D0%B7%D0%B0%D0%B5%D0%BC%D1%89%D0%B8%D0%BA%20%D0%BA%D1%80%D0%B5%D0%B4%D0%B8%D1%82%D0%B0%20%D0%B4%D0%B5%D0%B9%D1%81%D1%82%D0%B2%D0%B8%D0%B5%20%D1%81%202019.pdf?t=1672153647694' rel='noreferrer'>
                    Зетта Страхование 3
                </a>
            </div>
            <div className='mt-4'>
                <a className='rules-link' target="_blank" href='https://zettains.ru/upload/rules/%D0%9F%D1%8041%20-%2006.05.2019%20-%20%D0%9A%D0%98%D0%A1%D0%BE%D0%B3%D1%80_%D0%9F%D1%80%D0%B0%D0%B2%D0%B8%D0%BB%D0%B0.pdf?t=1672153647694' rel='noreferrer'>
                    Зетта Страхование 4
                </a>
            </div>
            
        </div>
    )
}