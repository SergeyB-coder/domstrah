import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './style.css'
import backgroundNews1 from '../../static/news1.png'
import backgroundNews2 from '../../static/news2.png'
import backgroundNews3 from '../../static/news3.png'
import backgroundNews4 from '../../static/news4.png'
import { Button } from '../Buttons/button';
import { URL as Url } from '../../static/Const/vars';

export function HomeNews(props) {
    const navigate = useNavigate();
    const renderedListNews = props.listNews.slice(0, 3).map(news => {
        return (
            
                <div className='h-40 position-relative col-3 overflow-hidden rounded cur-p' key={news.id}
                    onClick={() => {
                        navigate('/onenews/' + news.id.toString(), {replace: true})
                    }}
                >
                    <div className='title-news f-raleway-wt p-2' 
                    
                >
                        {news.title}
                    </div>
                    {/* <div>
                        {news.text}
                    </div> */}
                    <div className='h-100'>
                        <img className='h-100 br-5' src={Url + '/static/uploads/' + news.img_url} alt='Новость'/>
                    </div>
                </div>
        
        )
    })
    const handleClickAllNews = () => {

    }

    return (
        <div className='news'
        >
                <div className='f-raleway-xl'>Новости</div>
                <div className='row container-news mt-4 d-flex justify-content-between'>
                    {renderedListNews}
                </div>
                <div className='d-flex justify-content-end'>
                    <div className='but-news'>
                        <Link className='person-page' to="/news">
                            <Button text={'Все новости'} handleClick={handleClickAllNews}/>
                        </Link>
                    </div>
                </div>
        </div>
    )
}