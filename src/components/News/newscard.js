import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './style.css'
import { URL as Url } from '../../static/Const/vars';
import { Button } from '../Buttons/button';

export function NewsCard(props) {
    const navigate = useNavigate();
    const [showDelBut, setShowDelBut] = useState(false)
    return (

        <div className='h-40 m-3 position-relative col-newscard-3 overflow-hidden rounded cur-p' key={props.id}
            onMouseEnter={() => {
                if (props.isCustomer) {setShowDelBut(true)}
            }}
            onMouseLeave={() => {setShowDelBut(false)}}

            onClick={() => {
                navigate('/onenews/' + props.id.toString(), {replace: true})
            }}
        >
            <div className='title-news f-raleway-wt p-2'>
                {props.title}
            </div>
            {/* <div>
                {news.text}
            </div> */}
            <div className='h-100'>
                <img className='h-100 br-5' src={Url + '/static/uploads/' + props.img_url} alt='Новость'/>
            </div>
            {showDelBut ? (
                <div className='position-absolute top-0'>
                    <Button text={'Удалить'} handleClick={() => {props.handleDelNews(props.id)}}/>
                </div>                
            ): null}
        </div>
    )
}