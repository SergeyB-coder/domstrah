import React, { useState, useEffect } from 'react';
import { Outlet, Link, useRoutes, useParams } from "react-router-dom";
import './style.css'
import { sendOneNews } from './newsapi';
import { URL as Url } from '../../static/Const/vars';
import { Header } from '../Header/header';
import { Footer } from '../Home/footer';

export function OneNews(props) {
    let { newsId } = useParams();
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [imgURL, setImgURL] = useState('')

    function handleOneNews(news_id) {
        sendOneNews({id: newsId}, function(data) {
            setTitle(data.onenews[0].title)
            // setText(data.onenews[0].text)
            let el_text = document.getElementById('text')
            el_text.innerHTML = data.onenews[0].text
            setImgURL(data.onenews[0].img_url)
        })
    }

    useEffect(() => {
        handleOneNews(parseInt(newsId))
        document.title = 'Новость'
    }, [])
    return (
        <>
            <Header 
                menuText={props.menuText} 
                menuItemText={props.menuItemText}
            />
            <div className='my-3  f-raleway-xl ml-7'>
                {title}
            </div>
            <div className='onenews-container'>

                
                <img className='h-40 br-5 img-onenews' src={Url + '/static/uploads/' + imgURL} alt='Новость'/>
                
                <div className='mt-2'>
                    
                    <div id='text'></div>
                </div>
                
            </div>
            <Footer/>
        </>
    )
}