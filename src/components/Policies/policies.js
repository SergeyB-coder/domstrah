import React, { useState } from 'react';
import './style.css'
import { Header } from '../Header/header';
import backgroundPolicyFramed from '../../static/policy-framed.png'

export function Policies(props) {
    return (
        <>
            <Header setUserId={props.setUserId}/>
            <div className='policy-body'>
                <div className='policy-info position-relative' 
                    style={{
                        backgroundImage: `url(${backgroundPolicyFramed})`, 
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain'
                    }}
                >
                    <div className='row w-25 d-flex align-items-center container-policy-framed' >
                        <p className='col-7 label-policy-framed m-0 p-0'>Ваш полис</p>
                        <div className='col-5 policy-framed d-flex justify-content-center align-items-center'>
                            <p className='text-policy-framed m-0 p-2'>Оформлен</p>
                        </div>
                    </div>
                    
                    <div className='pt-10 ps-4 f-raleway-12'>
                        Мы получили оплату и уже оформляем Ваш полис<br></br>
                        Данные полиса мы сохраним в ашем личном кабинете,<br></br>
                        доступ к которуму мы направили Вам на электронную почту.<br></br>
                        Электронную версию полиса мы напраим на Вашу электронную почту.<br></br>
                        <br></br>
                        С уважением,<br></br>
                        Команда ДомСтрахование.рф                        
                    </div>
                </div>
            </div>
            
        </>
    );
}
