import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import './style.css'
import { LogoSVG, LogoSVGNY } from '../../static/Const/vars';
import { selectIsLogin, setIsLogin } from '../Login/loginSlice';

export function Header(props) {
    const dispatch = useDispatch();
    const isLogin = useSelector(selectIsLogin)
    const [showGoOut, setShowGoOut] = useState(false)

    const navigate = useNavigate();
    return (
        <div className='container'>
            <div className='d-flex justify-content-between align-items-center h-100'>
                <Link className='person-page' to="/" onClick={() => {
                    // props.setCalcStep('main')
                    }}>
                    {LogoSVGNY}
                </Link>                
                <div className='header-phone p-2  mobile-hide'>
                    8 ( 804 ) 700 - 42 - 30
                </div>

                <div className='position-relative mobile-hide'>
                    <div className='header-mort-insur' onClick={() => 
                        {
                            // setIsShowMenu(!isShowMenu)
                            navigate('/', {replace: true})
                            // props.setCalcStep('info')
                        }}
                    >
                        {'Страхование ипотеки'} 
                        <span className='ms-2'>
                            <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11 1L6 6L1 1" stroke="#2CA5EC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </span>
                        
                    </div>
                    {/* {isShowMenu ? 
                        <Link className='menu-item-insur person-page' to={menuItemText === 'Новостройки' ? "/objects": "/"}
                        >
                            <div className='person-page w-100'>
                                {menuItemText}
                            </div>
                        </Link>:
                        null
                    } */}
                    
                </div>
                
                <Link className='person-page mobile-hide' to="/company">
                    <div className='header-mort-insur'>
                        О компании
                    </div>
                </Link>
                <Link className='person-page mobile-hide' to="/news">
                    <div className='header-mort-insur'>
                        Новости
                    </div>
                </Link>
                {/* <div className='header-mort-insur'>
                    Информация 
                    <span className='ms-2'>
                        <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 1L6 6L1 1" stroke="#2CA5EC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </span>
                </div> */}
                <Link className='person-page mobile-hide' to="/contacts">
                    <div className='header-mort-insur'>
                        Контакты
                    </div>
                </Link>
                
                <div className='row d-flex align-items-center mobile-hide'>
                    <div className='col-4 mobile-hide'>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 32C24.8365 32 32 24.8365 32 16C32 7.16347 24.8365 0 16 0C7.16347 0 0 7.16347 0 16C0 24.8365 7.16347 32 16 32Z" fill="#2CA5EC" fillOpacity="0.1"/>
                            <path d="M5.95875 16.7826C7.82914 15.7523 9.91701 14.8924 11.8678 14.0282C15.2239 12.6126 18.5934 11.2215 21.9969 9.92645C22.6591 9.70578 23.8489 9.48998 23.9655 10.4713C23.9017 11.8604 23.6389 13.2413 23.4586 14.6222C23.0011 17.659 22.4723 20.6854 21.9566 23.7122C21.7789 24.7204 20.5159 25.2424 19.7078 24.5972C17.7657 23.2853 15.8086 21.9862 13.8913 20.644C13.2632 20.0058 13.8456 19.0893 14.4065 18.6336C16.0061 17.0572 17.7025 15.7178 19.2185 14.06C19.6275 13.0724 18.4192 13.9047 18.0207 14.1597C15.8308 15.6688 13.6945 17.27 11.3857 18.5962C10.2064 19.2454 8.83187 18.6906 7.65307 18.3284C6.59613 17.8908 5.04731 17.4499 5.95865 16.7826L5.95875 16.7826Z" fill="#2CA5EC"/>
                        </svg>
                    </div>
                    <div className='col-4 d-flex justify-content-center mobile-hide'>
                        <a target='_blank' href="https://vk.com/domstrakhovanie" className='mobile-hide'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" color='#2CA5EC'>
                                <path fill='#2CA5EC' d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.344 16.163h-1.867c-1.055 0-1.232-.601-2.102-1.469-.785-.785-1.22-.183-1.202.935.006.297-.141.534-.495.534-1.105 0-2.694.156-4.304-1.58-1.647-1.779-3.374-5.348-3.374-5.699 0-.208.172-.301.459-.301h1.898c.503 0 .545.249.686.568.584 1.331 1.981 4.002 2.354 2.511.214-.856.301-2.839-.615-3.01-.52-.096.396-.652 1.722-.652.33 0 .688.035 1.054.12.673.156.676.458.666.898-.034 1.666-.235 2.786.204 3.069.419.271 1.521-1.502 2.104-2.871.159-.378.191-.632.643-.632h2.322c1.216 0-.159 1.748-1.21 3.112-.847 1.099-.802 1.12.183 2.034.701.651 1.53 1.54 1.53 2.043 0 .238-.186.39-.656.39z"/>
                            </svg>
                        </a>
                    </div>
                    <div className='col-4 mobile-hide'>
                        <a href = "mailto: zakaz@домстрахование.рф">
                            <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.108398 16C0.108398 7.16344 7.27184 0 16.1084 0C24.945 0 32.1084 7.16344 32.1084 16C32.1084 24.8366 24.945 32 16.1084 32C7.27184 32 0.108398 24.8366 0.108398 16Z" fill="#2CA5EC" fillOpacity="0.1"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M6.77539 15.9736C6.77539 10.8418 10.9622 6.66675 16.1086 6.66675C21.255 6.66675 25.4418 10.8418 25.4418 15.9736C25.4418 16.7006 25.3812 17.2891 25.2452 17.8799L25.2432 17.8897C25.2429 17.8914 25.1754 18.1637 25.1382 18.2825C24.9075 19.0182 24.4899 19.6309 23.9304 20.0544C23.3878 20.4652 22.715 20.6915 22.0361 20.6915C21.9522 20.6915 21.8677 20.6881 21.785 20.6814C20.8208 20.6043 19.9731 20.0983 19.4533 19.2916C18.5592 20.1881 17.373 20.6813 16.1086 20.6813C13.5055 20.6813 11.3877 18.5694 11.3877 15.9736C11.3877 13.3778 13.5055 11.266 16.1086 11.266C18.7117 11.266 20.8295 13.3778 20.8295 15.9736V17.4911C20.8334 18.3766 21.4293 18.7385 21.9383 18.7795C22.4448 18.8185 23.1188 18.5243 23.3536 17.5641C23.4695 17.0375 23.5283 16.5023 23.5283 15.9736C23.5283 11.8939 20.1998 8.57483 16.1086 8.57483C12.0173 8.57483 8.68892 11.8939 8.68892 15.9736C8.68892 20.0533 12.0173 23.3724 16.1086 23.3724C17.5327 23.3724 18.9178 22.9668 20.114 22.1995L20.1354 22.1857L21.3928 23.6434L21.3658 23.6618C19.812 24.7208 17.994 25.2806 16.1086 25.2806C10.9622 25.2806 6.77539 21.1055 6.77539 15.9736ZM16.1087 18.7731C17.6567 18.7731 18.9161 17.5173 18.9161 15.9736C18.9161 14.43 17.6567 13.1742 16.1087 13.1742C14.5607 13.1742 13.3013 14.43 13.3013 15.9736C13.3013 17.5173 14.5607 18.7731 16.1087 18.7731Z" fill="#2CA5EC"/>
                            </svg>
                        </a>
                    </div>
                </div>
                {/* <Link className='person-page' to="/objects">
                    <div className='person-page'>
                        Новостройки
                    </div>
                </Link> */}
                {!isLogin ? (
                    <>
                        <div className=''>
                            <Link to="/login" className='d-flex justify-content-center align-items-center text-nodecor'>
                                <div className='container-logo d-flex justify-content-center align-items-center' 
                                    // onClick={handleLogin}
                                > 
                                    <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.4941 8.83833C10.9347 8.83833 12.9133 6.85981 12.9133 4.41918C12.9133 1.97854 10.9347 0 8.4941 0C6.05346 0 4.07493 1.97854 4.07493 4.41918C4.07493 6.85981 6.05346 8.83833 8.4941 8.83833Z" fill="#2CA5EC"/>
                                        <path d="M5.36983 10.8132H11.6252C13.0507 10.8132 14.4178 11.3795 15.4257 12.3874C16.4337 13.3954 17 14.7625 17 16.188C17 17.0299 16.6656 17.8374 16.0702 18.4327C15.4749 19.028 14.6675 19.3625 13.8256 19.3625H3.17445C2.33253 19.3625 1.5251 19.028 0.929779 18.4327C0.334455 17.8374 0 17.0299 0 16.188C0 14.7625 0.566274 13.3954 1.57425 12.3874C2.58223 11.3795 3.94935 10.8132 5.37485 10.8132H5.36983Z" fill="#2CA5EC"/>
                                    </svg>
                                    
                                </div>
                                <span className=' mobile-hide'>
                                    <div className='header-mort-insur ms-2' onClick={()=> {
                                            window.ym(90426649,'reachGoal','voyti')
                                        }}>
                                        Войти
                                    </div>
                                </span>
                                <div className='mobile-show ms-4'>
                                    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M-1.4669e-06 8.4413L-3.68981e-07 33.5587C-1.65198e-07 38.2207 3.77929 42 8.4413 42L33.5587 42C38.2207 42 42 38.2207 42 33.5587L42 8.4413C42 3.7793 38.2207 -1.67068e-06 33.5587 -1.4669e-06L8.44129 -3.68981e-07C3.77929 -1.65198e-07 -1.67068e-06 3.7793 -1.4669e-06 8.4413Z" fill="#2CA5EC" fillOpacity="0.1"/>
                                        <path d="M33.4643 31.0443C33.4643 31.4286 33.3116 31.7972 33.0398 32.069C32.768 32.3407 32.3994 32.4934 32.0151 32.4934L19.0742 32.4934C18.7313 32.4415 18.4184 32.2684 18.1923 32.0055C17.9661 31.7426 17.8418 31.4073 17.8418 31.0606C17.8418 30.7138 17.9661 30.3785 18.1923 30.1156C18.4184 29.8527 18.7313 29.6796 19.0742 29.6277L32.0296 29.6277C32.4058 29.6314 32.7659 29.7812 33.0336 30.0456C33.3014 30.31 33.4558 30.6681 33.4643 31.0443Z" fill="#2CA5EC"/>
                                        <path d="M33.5005 20.9979C33.5005 21.3823 33.3478 21.7509 33.0761 22.0226C32.8043 22.2944 32.4357 22.4471 32.0514 22.4471L9.99892 22.4471C9.79264 22.4783 9.58205 22.4646 9.38155 22.4069C9.18105 22.3492 8.99536 22.2489 8.83719 22.1129C8.67902 21.9769 8.5521 21.8083 8.46508 21.6186C8.37807 21.429 8.33301 21.2229 8.33301 21.0142C8.33301 20.8056 8.37807 20.5994 8.46508 20.4098C8.5521 20.2202 8.67902 20.0516 8.83719 19.9156C8.99536 19.7795 9.18105 19.6792 9.38155 19.6216C9.58205 19.5639 9.79264 19.5502 9.99892 19.5814L32.055 19.5814C32.4331 19.5822 32.7959 19.7308 33.066 19.9955C33.3361 20.2602 33.492 20.6199 33.5005 20.9979Z" fill="#2CA5EC"/>
                                        <path d="M33.5357 10.8524C33.5357 11.2368 33.383 11.6054 33.1112 11.8771C32.8395 12.1489 32.4709 12.3016 32.0865 12.3016L10.0341 12.3016C9.8278 12.3328 9.61721 12.3191 9.41671 12.2614C9.21621 12.2037 9.03052 12.1034 8.87235 11.9674C8.71417 11.8313 8.58726 11.6628 8.50024 11.4731C8.41322 11.2835 8.36816 11.0774 8.36816 10.8687C8.36816 10.6601 8.41322 10.4539 8.50024 10.2643C8.58726 10.0747 8.71417 9.90609 8.87235 9.77005C9.03052 9.63401 9.21621 9.53372 9.41671 9.47604C9.61721 9.41837 9.8278 9.40467 10.0341 9.43587L32.0902 9.43587C32.4683 9.43672 32.8311 9.58533 33.1012 9.84999C33.3712 10.1146 33.5272 10.4744 33.5357 10.8524Z" fill="#2CA5EC"/>
                                    </svg>
                                </div>
                            </Link>
                        </div>
                    </>
                    
                ): (
                    <>
                        <div>
                        <Link className='person-page' to="/person">
                            <div className='person-page' 
                                // onClick={handleLogin}
                                onMouseEnter={() => {
                                    setShowGoOut(true)
                                }}
                                onMouseLeave={() => {
                                    setShowGoOut(false)
                                }}
                            > 
                                Личный кабинет
                            </div>
                            
                        </Link>
                        {showGoOut ? (
                                <div className='position-absolute text-goout' 
                                    onMouseEnter={() => {
                                        setShowGoOut(true)
                                    }}
                                    onMouseLeave={() => {
                                        setShowGoOut(false)
                                    }}
                                    onClick={() => {
                                        dispatch(setIsLogin(false))
                                        navigate('/', {replace: true})
                                    }}
                                >
                                    Выйти
                                </div>
                            ): null}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
