import React, { useState } from 'react';
import './style.css'
import { Header } from '../Header/header';
import { ABOUT_COMPANY_TITLE, ABOUT_COMPANY_PARAGRAPH1, ABOUT_COMPANY_PARAGRAPH2,
ABOUT_COMPANY_PARAGRAPH3_T, ABOUT_COMPANY_PARAGRAPH3, ABOUT_COMPANY_PARAGRAPH4_T, ABOUT_COMPANY_PARAGRAPH4,
ABOUT_COMPANY_PARAGRAPH5_T, ABOUT_COMPANY_PARAGRAPH5, ABOUT_COMPANY_PARAGRAPH6 } from '../../static/Const/vars';
import { Footer } from '../Home/footer';

export function Company(props) {

    return (
        <>
            <Header 
                isCustomer={props.isCustomer}
                menuText={props.menuText} 
                menuItemText={props.menuItemText}
            />
            
            <div className='p-5 container_about'>
                <div className='mr-7 ml-7 p-3'>
                    <div className='f-raleway-m'>{ABOUT_COMPANY_TITLE}</div>
                    <div className='f-raleway-x-mini-g mt-2'>{ABOUT_COMPANY_PARAGRAPH1}</div>
                    <div className='f-raleway-x-mini-g'>{ABOUT_COMPANY_PARAGRAPH2}</div>
                    <div className='f-raleway-l mt-3'>{ABOUT_COMPANY_PARAGRAPH3_T}</div>
                    <div className='f-raleway-x-mini-g'>{ABOUT_COMPANY_PARAGRAPH3}</div>
                    <div className='f-raleway-l mt-3'>{ABOUT_COMPANY_PARAGRAPH4_T}</div>
                    <div className='f-raleway-x-mini-g'>{ABOUT_COMPANY_PARAGRAPH4}</div>
                    <div className='f-raleway-l mt-3'>{ABOUT_COMPANY_PARAGRAPH5_T}</div>
                    <div className='f-raleway-x-mini-g'>{ABOUT_COMPANY_PARAGRAPH5}</div>
                    <div className='f-raleway-x-mini-g'>{ABOUT_COMPANY_PARAGRAPH6}</div>
                </div>
            </div>

            <Footer/>
        </>
    )
}