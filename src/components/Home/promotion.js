import React, { useState } from 'react';
import './style.css'
import { Header } from '../Header/header';
import { Footer } from './footer';

export function Promotion(props) {

    return (
        <>
            <Header  
                setUserId={props.setUserId} 
                menuText={props.menuText} 
                menuItemText={props.menuItemText}
            />
            <div className='m-5 container-promo'
            >
                <h2>Черная пятница</h2>
                <h4>Скидки до 30%</h4>
            </div>

            <Footer/>
        </>
    )
}