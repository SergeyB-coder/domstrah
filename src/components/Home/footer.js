import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './style.css'
import { LogoSVGfooter } from '../../static/Const/vars';
import { URL } from '../../static/Const/vars';
import { cardsSVG, cardsSVGmir } from '../../static/Svg/paykeeper';

export function Footer(props) {
    const handleScrollToCalc = () => {
        window.scrollTo(0, 0)
    }

    const navigate = useNavigate();
    return (
        <div className='prefooter-include-mortgage'>
            <div className='d-flex row container-footer'>
                <div className='footer-block4'>
                    <div>
                        {LogoSVGfooter}
                        <div className='f-raleway-xs mt-3'>
                            Предлагаем минимальную цену на ипотечное страхование.<br></br>
                            Лучшее предложение на страховку квартиры и жизни.
                        </div>
                        <div className='row mt-2 w-50'>
                            <div className='col-4'>
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 32C24.8365 32 32 24.8365 32 16C32 7.16347 24.8365 0 16 0C7.16347 0 0 7.16347 0 16C0 24.8365 7.16347 32 16 32Z" fill="white" fillOpacity="0.1"/>
                                    <path d="M5.95875 16.7826C7.82914 15.7523 9.91701 14.8924 11.8678 14.0282C15.2239 12.6126 18.5934 11.2215 21.9969 9.92645C22.6591 9.70578 23.8489 9.48998 23.9655 10.4713C23.9017 11.8604 23.6389 13.2413 23.4586 14.6222C23.0011 17.659 22.4723 20.6854 21.9566 23.7122C21.7789 24.7204 20.5159 25.2424 19.7078 24.5972C17.7657 23.2853 15.8086 21.9862 13.8913 20.644C13.2632 20.0058 13.8456 19.0893 14.4065 18.6336C16.0061 17.0572 17.7025 15.7178 19.2185 14.06C19.6275 13.0724 18.4192 13.9047 18.0207 14.1597C15.8308 15.6688 13.6945 17.27 11.3857 18.5962C10.2064 19.2454 8.83187 18.6906 7.65307 18.3284C6.59613 17.8908 5.04731 17.4499 5.95865 16.7826L5.95875 16.7826Z" fill="white"/>
                                </svg>
                            </div>
                            <div className='col-4 ps-3 m-0'>
                                <a className='p-0 m-0' target='_blank' href="https://vk.com/domstrakhovanie">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" color='#2CA5EC'>
                                        <path fill='#c3c0c0' d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.344 16.163h-1.867c-1.055 0-1.232-.601-2.102-1.469-.785-.785-1.22-.183-1.202.935.006.297-.141.534-.495.534-1.105 0-2.694.156-4.304-1.58-1.647-1.779-3.374-5.348-3.374-5.699 0-.208.172-.301.459-.301h1.898c.503 0 .545.249.686.568.584 1.331 1.981 4.002 2.354 2.511.214-.856.301-2.839-.615-3.01-.52-.096.396-.652 1.722-.652.33 0 .688.035 1.054.12.673.156.676.458.666.898-.034 1.666-.235 2.786.204 3.069.419.271 1.521-1.502 2.104-2.871.159-.378.191-.632.643-.632h2.322c1.216 0-.159 1.748-1.21 3.112-.847 1.099-.802 1.12.183 2.034.701.651 1.53 1.54 1.53 2.043 0 .238-.186.39-.656.39z"/>
                                    </svg>
                                </a>
                            </div>
                            <div className='col-4'>
                                <a href = "mailto: zakaz@домстрахование.рф">
                                    <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.108398 16C0.108398 7.16344 7.27184 0 16.1084 0C24.945 0 32.1084 7.16344 32.1084 16C32.1084 24.8366 24.945 32 16.1084 32C7.27184 32 0.108398 24.8366 0.108398 16Z" fill="white" fillOpacity="0.1"/>
                                        <path fillRule="evenodd" clipRule="evenodd" d="M6.77539 15.9734C6.77539 10.8415 10.9622 6.6665 16.1086 6.6665C21.255 6.6665 25.4418 10.8415 25.4418 15.9734C25.4418 16.7004 25.3812 17.2889 25.2452 17.8796L25.2432 17.8894C25.2429 17.8912 25.1754 18.1635 25.1382 18.2823C24.9075 19.0179 24.4899 19.6307 23.9304 20.0542C23.3878 20.465 22.715 20.6912 22.0361 20.6912C21.9522 20.6912 21.8677 20.6879 21.785 20.6812C20.8208 20.604 19.9731 20.0981 19.4533 19.2914C18.5592 20.1878 17.373 20.681 16.1086 20.681C13.5055 20.681 11.3877 18.5692 11.3877 15.9734C11.3877 13.3776 13.5055 11.2658 16.1086 11.2658C18.7117 11.2658 20.8295 13.3776 20.8295 15.9734V17.4909C20.8334 18.3763 21.4293 18.7383 21.9383 18.7792C22.4448 18.8182 23.1188 18.524 23.3536 17.5639C23.4695 17.0373 23.5283 16.502 23.5283 15.9734C23.5283 11.8936 20.1998 8.57459 16.1086 8.57459C12.0173 8.57459 8.68892 11.8936 8.68892 15.9734C8.68892 20.0531 12.0173 23.3722 16.1086 23.3722C17.5327 23.3722 18.9178 22.9666 20.114 22.1992L20.1354 22.1854L21.3928 23.6431L21.3658 23.6616C19.812 24.7206 17.994 25.2803 16.1086 25.2803C10.9622 25.2803 6.77539 21.1052 6.77539 15.9734ZM16.1087 18.7729C17.6567 18.7729 18.9161 17.517 18.9161 15.9733C18.9161 14.4297 17.6567 13.1739 16.1087 13.1739C14.5607 13.1739 13.3013 14.4297 13.3013 15.9733C13.3013 17.517 14.5607 18.7729 16.1087 18.7729Z" fill="white"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='footer-block2'>
                    <div>
                        <div className='f-raleway-wt'>Услуги</div>
                        <Link className='person-page' to="/">
                            <div className='f-raleway-xs mt-3' onClick={handleScrollToCalc}>
                                Страхование ипотеки
                            </div>
                        </Link>
                        <Link className='person-page' to="/person">
                            <div className='f-raleway-xs'>Личный кабинет</div>  
                        </Link>
                        <Link className='person-page' to="/objects">
                            <div className='f-raleway-xs'>Новостройки</div>
                        </Link>
                    </div>
                </div>
                <div className='footer-block2'>
                    <div>
                        <div className='f-raleway-wt'>Информация</div>
                        <Link className='person-page' to="/company">
                            <div className='f-raleway-xs mt-3'>О компании</div>
                        </Link>
                        <Link className='person-page' to="/news">
                            <div className='f-raleway-xs'>Новости</div>
                        </Link>
                        <Link className='person-page' to="/contacts">
                            <div className='f-raleway-xs'>Контакты</div>
                        </Link>
                    </div>
                    <div className='mt-4'>
                        {cardsSVGmir}
                    </div>
                </div>
                <div className='footer-block3'>
                    <div>
                        <div className='f-raleway-xs-h cookie'>
                            Сайт использует файлы «cookie» с целью персонализации<br></br>
                            сервисов и повышения удобства пользования веб-сайтом.<br></br>
                            Если вы не хотите использовать файлы «cookie», измените<br></br>
                            настройки браузера.
                        </div>
                    </div>
                    <div className='d-flex footer-docs'>
                        <a target='_blank' href={URL + '/static/docs/agreement.html'} className='f-raleway-xs-blue cur-p mt-2 dec-no w-100'>Обработка персональных данных</a>
                    </div>
                    <div className='d-flex footer-docs'>
                        <a target='_blank' href={URL + '/static/docs/politic.html'} className='f-raleway-xs-blue cur-p mt-2 dec-no w-100'>Политика конфеденциальности</a>
                    </div>
                    <div className='d-flex footer-docs'>
                        <div target='_blank' href={URL + '/static/docs/politic.html'} className='f-raleway-xs-blue cur-p mt-2 dec-no w-100'
                            onClick={() => {navigate('/legal', {replace: true})}}
                        >
                            Правовая информация
                        </div>
                    </div>
                </div>
            </div>
            <div className='footer-include-mortgage'>
                © 2022 «ДомСтрахование» 
            </div>
        </div>
    )
}