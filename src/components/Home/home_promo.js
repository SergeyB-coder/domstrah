import React, { useState } from 'react';
import './style.css'
import { Link, useNavigate } from "react-router-dom";
import { URL as Url } from '../../static/Const/vars';

import backgroundPromCard1 from '../../static/include-promotion-card1.png'
import backgroundPromCard2 from '../../static/include-promotion-card2.png'

export function Promo(props) {
    const navigate = useNavigate();
    const renderedListPromo = props.listPromo.slice(0, 2).map(promo => {
        return (
            
                <div className={
                        'h-27 position-relative col-3 overflow-hidden rounded cur-p include-prom-card p-0  ' + 
                        (props.listPromo.indexOf(promo) === 1 ? 'end-block-promo': 'start-block')
                    }
                    key={promo.id}
                    onClick={() => {
                        navigate('/onepromo/' + promo.id.toString(), {replace: true})
                    }}
                >
                    
                    <div className='h-100 rounded'>
                        <img className='w-100 rounded' src={Url + '/static/uploads/' + promo.img_url} alt='Акция'/>
                    </div>
                </div>
            
        )
    })
    return (
        <div className=''>
        <div className='title-include-morgage'>Акции</div>
        <div className=' conrainer-include-card'>
            <div className='d-flex row w-100'>
                {renderedListPromo}
            </div>
        </div>
    </div>
    )
}