import React, { useState, useEffect } from 'react';
import { Outlet, Link, useRoutes, useParams } from "react-router-dom";
import './style.css'
import { sendOnePromo } from './promoapi';
import { URL as Url } from '../../static/Const/vars';
import { Header } from '../Header/header';
import { Footer } from '../Home/footer';

export function OnePromo(props) {
    let { promoId } = useParams();
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [imgURL, setImgURL] = useState('')

    function handleOnePromo() {
        sendOnePromo({id: promoId}, function(data) {
            // setTitle(data.onepromo[0].title)
            // setText(data.onepromo[0].text)
            setImgURL(data.onepromo[0].img_url)
            let el_text = document.getElementById('text')
            el_text.innerHTML = data.onepromo[0].text
            setImgURL(data.onepromo[0].img_url)
        })
    }

    useEffect(() => {
        handleOnePromo()
        document.title = 'Акция'
    }, [])
    return (
        <>
            <Header 
                menuText={props.menuText} 
                menuItemText={props.menuItemText}
            />
            {/* <div className='m-3 p-3 f-raleway'>
                {title}
            </div> */}
            <div className='row w-100 onepromo-container'>

                <div className='m-2 '>
                    <img className='br-5 img-promo' src={Url + '/static/uploads/' + imgURL} alt='Акция'/>
                </div>
                <div className='m-2'>
                    <div id='text'></div>
                </div>
            </div>
            <Footer/>
        </>
    )
}