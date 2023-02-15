import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '../Buttons/button';

import './style.css'


export function ObjectInfo(props) {
    const dispatch = useDispatch();

    const [fullText, setFullText] = useState(false)

    const handleClickReadFull = () => {
        setFullText(true)
    }

    return (
        <>
            <div className='obj-info-container'>
                <div className='f-raleway-xl'>{props.title1}</div>

                <div className='row obj-info-block1 mt-3'>
                    <div className='col-6'>
                        <div className='f-raleway-reg-pol mt-3'>{props.block1_title1}</div>

                        <div className='f-raleway-12 mt-3'>{props.block1_text1}</div>

                        <div className='f-raleway-reg-pol mt-3'>{props.block1_title2}</div>

                        <div className='f-raleway-12 mt-3'>{props.block1_text2}</div>

                        <div className='f-raleway-reg-pol mt-3'>{props.block1_title3}</div>

                        <div className='f-raleway-12 mt-3'>{props.block1_text3}</div>
                    </div>
                    <div className='col-6'>
                        <img alt='' className='w-100' src={props.img_url} />
                    </div>
                </div>

                
                <div className='f-raleway-xl mt-5'>{props.title2}</div>

                <div className='row obj-info-block1 mt-3'>
                    <div className='col-3'>
                        <div className='f-raleway-reg-pol mt-3'>{props.block2_title1}</div>
                        <div className='f-raleway-12 mt-3'>{props.block2_text1}</div>
                    </div>
                    <div className='col-3'>
                        <div className='f-raleway-reg-pol mt-3'>{props.block2_title2}</div>
                        <div className='f-raleway-12 mt-3'>{props.block2_text2}</div>
                    </div>
                    <div className='col-3'>
                        <div className='f-raleway-reg-pol mt-3'>{props.block2_title3}</div>
                        <div className='f-raleway-12 mt-3'>{props.block2_text3}</div>
                    </div>
                    <div className='col-3'>
                        <div className='f-raleway-reg-pol mt-3'>{props.block2_title4}</div>
                        <div className='f-raleway-12 mt-3'>{props.block2_text4}</div>
                    </div>

                    <div className={fullText ? 'f-raleway-15 mt-4 lh-lg': 'f-raleway-15 mt-4 lh-lg obj-info-text'}>
                        {props.text} 
                    </div>
                    <div className='d-flex justify-content-center'>
                        {!fullText ? <Button text={'Читать далее'} handleClick={handleClickReadFull} />: null}
                    </div>
                </div>
            </div>
        </>
    );
}
