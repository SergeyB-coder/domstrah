import React, { useState, useEffect } from 'react';
import './style.css'
import { sendBannerPromo } from './bannerpromoapi';
import { URL as Url } from '../../static/Const/vars';
import { Header } from '../Header/header';
import { Footer } from '../Home/footer';

export function BannerPromo() {
    const [imgURL, setImgURL] = useState('')

    function handleBannerPromo() {
        sendBannerPromo( function(data) {
            setImgURL(data.bannerpromo[0].img_url)
            let el_text = document.getElementById('textbannerpromo')
            el_text.innerHTML = data.bannerpromo[0].text
            setImgURL(data.bannerpromo[0].img_url)
        })
    }

    useEffect(() => {
        handleBannerPromo()
        document.title = 'Акция'
    }, [])
    return (
        <>
            <Header />
            <div className='row w-100 onepromo-container'>
                <div className='m-2 '>
                    <img className='br-5 img-promo' src={Url + '/static/uploads/' + imgURL} alt='Акция'/>
                </div>
                <div className='m-2'>
                    <div id='textbannerpromo'></div>
                </div>
            </div>
            <Footer/>
        </>
    )
}