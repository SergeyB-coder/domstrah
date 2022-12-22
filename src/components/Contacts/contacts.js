import React, { useState } from 'react';
import './style.css'
import { Header } from '../Header/header';
import { COMPANY, EMAIL, ADDRESS, PHONE1, PHONE2 } from '../../static/Const/vars';
import { Footer } from '../Home/footer';

export function Contacts(props) {

    return (
        <>
            <Header 
                isCustomer={props.isCustomer}
                menuText={props.menuText} 
                menuItemText={props.menuItemText}
            />
            
            <div className='container-contacts'>
                <div className='ml-7 f-raleway-x-mini-g font-bold'>
                    <h6 className='fw-bold'>{COMPANY}</h6>
                    <p>{ADDRESS}</p>
                    <p>{EMAIL}</p>
                    <p>{PHONE1}</p>
                    <p>{PHONE2}</p>
                </div>
                {/* <div className='bg-grey'>
                    <div className='row'>
                        <div className='max-w-45'>TEST</div>
                        <div className='max-w-45'>TEST2</div>
                    </div>
                </div> */}
                
            </div>
            <Footer/>
        </>
    )
}