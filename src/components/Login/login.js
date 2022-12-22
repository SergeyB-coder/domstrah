import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import ym from 'react-yandex-metrika';
import './style.css'
import { sendReg, sendForgetPassword, sendLogin, sendSiteMap } from './loginapi';
import { LogoSVG } from '../../static/Const/vars';
import { setIsLogin } from '../Login/loginSlice';

export function Login(props) {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showFormForgetPassword, setShowFormForgetPassword] = useState(false)
    const [showElementsReg, setShowElementsReg] = useState(false)
    const [statusResMessage, setStatusResMessage] = useState('')
    

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }
    
    const handleChangeUsername = (e) => {
        setEmail(e.target.value)
    }

    const handleRegistration = () => {
        sendReg({email: email, password: password}, function(data) {
            if (data) {
                setShowElementsReg(false)
            }
            else {
                alert('Ошибка сервера')
            }
          })
    }

    const handleLogin = () => {
        window.ym(90426649,'reachGoal','voyty1') 
        sendLogin({email: email, password: password}, 
            function(data) {
                if (data.res) {
                    window.ym(90426649,'reachGoal','voyty_ok')
                    dispatch(setIsLogin(true))
                    props.setUserId(data.user_id)
                    props.setIsCustomer(data.customer)
                    handleOnClick()
                }
                else {
                    alert('Неверные данные')
                }
            }
        )
    }

    const handleForgetPassword = () => {
        sendForgetPassword({email: email}, function(data) {
            if (data) {
                setStatusResMessage('Пароль отправлен')
            }
            else {
                setStatusResMessage('Неверная почта')
            }
          }
        )
    }

    const navigate = useNavigate();
    const handleOnClick = useCallback(() => navigate('/', {replace: true}), [navigate]);

    return (
        <div className='d-flex justify-content-center '>
            <div className='bg-container overflow-hidden'>
                <img className='bg-img' src='https://images.unsplash.com/photo-1502246170363-97cb63f36c81?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'/>
            </div>
            
            <div className='container-login '>
                <div className='ww'>
                    <div className='mt-3 d-flex justify-content-center '>
                        {/* <img className='logo-login' src="https://xn--80aafgiryleculn8b.xn--p1ai/wp-content/plugins/custom-elementor-widgets/./assets/img/logo.svg" alt="страховая"/> */}
                        {LogoSVG}                        
                    </div>
                </div>
                {/* <button onClick={() => {
                    sendSiteMap()
                }}>SiteMap</button> */}
                <div className='mx-3 mt-5'>
                    <label className='title-input'>Email</label>
                    <input type="text" className="form-control" placeholder="Email" aria-label="Username" aria-describedby="basic-addon1"
                        onChange={handleChangeUsername}
                    />
                </div>
                {!showFormForgetPassword ? 
                    (    
                        <>
                            <div className='mx-3 mt-3'>
                                <label className='title-input'>Пароль</label>
                                <div className='position-relative'>
                                    
                                    
                                            <input type="password" className="form-control" placeholder="Password" aria-label="Username" aria-describedby="basic-addon1"
                                                onChange={handleChangePassword}
                                            />
                                            <div className='eye'>
                                                <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                                                </svg>
                                            </div>
                                        
                                </div>
                            </div>

                            { !showElementsReg ? (
                                <>
                                    <div className='button-login mx-3 mt-5 d-flex justify-content-center align-items-center'
                                        onClick={handleLogin}
                                    >
                                        <label className='label-button-login'>Войти</label>
                                    </div>

                                    <div className='mx-3 mt-4 d-flex justify-content-center'
                                        onClick={() => setShowFormForgetPassword(true)}
                                    >
                                        <label className='label-forget'>Забыли пароль</label>
                                    </div>

                                    {/* <div className='mx-3 mt-4 d-flex justify-content-center'
                                        onClick={() => setShowElementsReg(true)}
                                    >
                                        <label className='label-reg'>Зарегестрироваться</label>
                                    </div> */}
                                </>
                            ): (
                                <>
                                    <div className='button-login mx-3 mt-5 d-flex justify-content-center align-items-center'
                                        onClick={handleRegistration}
                                    >
                                        <label className='label-button-login'>Регистрация</label>
                                    </div>
                                    
                                    <div className='mx-3 mt-4 d-flex justify-content-center'
                                        onClick={() => setShowElementsReg(false)}
                                    >
                                        <label className='label-back'>{'Назад'}</label>
                                    </div>  
                                </>
                            )}
                        </>
                    )
                    : 
                    (
                        <>
                            <div className='button-login mx-3 mt-5 d-flex justify-content-center align-items-center'
                                onClick={handleForgetPassword}
                            >
                                <label className='label-button-login'>Восстановить</label>
                            </div>  
                            <div className='mx-3 mt-4 d-flex justify-content-center'>
                                <label className='label-forget'>{statusResMessage}</label>
                            </div>  
                            <div className='mx-3 mt-4 d-flex justify-content-center'
                                onClick={() => setShowFormForgetPassword(false)}
                            >
                                <label className='label-back'>{'Назад'}</label>
                            </div>                          
                        </>
                    )}
            </div>
            

            
        </div>
    );
}
