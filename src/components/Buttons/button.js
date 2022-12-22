import React, { useState } from 'react';
import './style.css'

export function Button(props) {

    return (
        <div className='button-reg d-flex justify-content-center align-items-center px-3 py-0'
            onClick={props.handleClick}
        >
            <label className='label-button-reg'>{props.text}</label>
        </div>
    )
}