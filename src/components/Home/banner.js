import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { URL } from '../../static/Const/vars';
import './style.css'
import { setBannerIsOn } from './homeSlice';

export function Banner(props) {
    const dispatch = useDispatch();
    const banner_url = props.banner_url
    const banner_url_mobile = props.banner_url_mobile
    const navigate = useNavigate();
    // const [showButtonClose, setShowButtonClose] = useState(false)
    // const handleMouseEnter = () => {
    //     setShowButtonClose(true)
    // }
    // const handleMouseLeave = () => {
    //     setShowButtonClose(false)
    // }
    return (
        <div className='container-banner' 
            // onMouseEnter={handleMouseEnter} 
            // onMouseLeave={handleMouseLeave}
            
        >
            <img onClick={() => {navigate('/bannerpromo', {replace: true})}} className='banner' src={URL + '/static/uploads/' + banner_url}  alt=''/>
            <img onClick={() => {navigate('/bannerpromo', {replace: true})}} className='banner-mobile' src={URL + '/static/uploads/' + banner_url_mobile}  alt=''/>
            <div className='button-close'>
                <svg onClick={() => {dispatch(setBannerIsOn(false))}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                </svg>
            </div>
        </div>
    )
}