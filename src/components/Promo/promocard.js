import React, { useState } from 'react';
import './style.css'
import { URL as Url } from '../../static/Const/vars';
import { Button } from '../Buttons/button';

export function PromoCard(props) {
    const [showDelBut, setShowDelBut] = useState(false)
    return (
        <div className='h-40 m-3 position-relative' key={props.id}
            onMouseEnter={() => {
                if (props.isCustomer) setShowDelBut(true)
            }}
            onMouseLeave={() => {setShowDelBut(false)}}
        >
            {/* <div className='title-news f-raleway-wt p-2'>
                {props.title}
            </div> */}
            <div className='position-absolute bottom-0 f-raleway-wt p-2'>
                {props.text}
            </div>
            <div className='h-100'>
                <img className='h-100 br-5' src={Url + '/static/uploads/' + props.img_url} alt='Акция'/>
            </div>
            {showDelBut ? (<Button text={'Удалить'} handleClick={() => {props.handleDelPromo(props.id)}}/>): null}
        </div>
    )
}