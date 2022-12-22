import React, {useState} from 'react';
import backgroundIncludeCard1 from '../../static/include-morgage-card1.png'
import backgroundIncludeCard2 from '../../static/include-morgage-card2.png'
export function HowReg() {
    const [showRegInfo1, setShowRegInfo1] = useState(false)
    const [showRegInfo2, setShowRegInfo2] = useState(false)
    const [showRegInfo3, setShowRegInfo3] = useState(false)
    const [showRegInfo4, setShowRegInfo4] = useState(false)
    const [showRegInfo5, setShowRegInfo5] = useState(false)
    const [showRegInfo6, setShowRegInfo6] = useState(false)
    return (
        <>
            <div className='how-reg-insur'
                            // style={{
                            //     backgroundImage: `url(${backgroundHowRegInsur})`, 
                            //     backgroundRepeat: 'no-repeat',
                            //     backgroundSize: 'contain'
                            // }}
            >
                <div className='row container-how-reg-content'>
                    <div className='col-6 px-0 pt-20'>
                        <iframe className='rounded' width="560" height="315" src="https://www.youtube.com/embed/MXMNq0QWmQY" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                    <div className='col-6 px-0 pt-18'>
                        <div className='f-raleway-xl'>FAQ</div>
                        <div className='f-raleway-l mt-4 cur-p' onClick={() => {
                            setShowRegInfo1(!showRegInfo1)
                        }}>
                            <span className='me-2'>
                                {!showRegInfo1 ? (
                                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21.125 9.75L13 17.875L4.875 9.75" stroke="#3F3F3F" strokeWidth="2.4375" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                ):(
                                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.875 16.25L13 8.125L21.125 16.25" stroke="#2CA5EC" strokeWidth="2.4375" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                )}
                            </span>
                            Зачем нужна страховка?
                        </div>
                        {showRegInfo1 ? (
                            <div className='overflow-hidden'>
                                <div className='f-raleway-x-mini mrg-reg-info'>
                                    Ипотечное страхование — это обязательная процедура при оформлении жилищного<br></br> 
                                    кредита. Страховка при ипотеке даёт защиту не только кредитной организации, но и<br></br>
                                    заёмщику.
                                </div>
                            </div>
                        ): null}

                        <div className='f-raleway-l mt-4 cur-p' onClick={() => {
                            setShowRegInfo2(!showRegInfo2)
                        }}>
                            <span className='me-2'>
                                {!showRegInfo2 ? (
                                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21.125 9.75L13 17.875L4.875 9.75" stroke="#3F3F3F" strokeWidth="2.4375" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                ):(
                                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.875 16.25L13 8.125L21.125 16.25" stroke="#2CA5EC" strokeWidth="2.4375" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                )}
                            </span>
                            Какие данные нужны для оформления страховки?
                        </div>
                        {showRegInfo2 ? (
                            <div className='overflow-hidden'>
                                <div className='f-raleway-x-mini mrg-reg-info'>
                                    Для покупки онлайн, нам потребуются: номер ипотечного договора, остаток долга,<br></br> 
                                    паспортные данные и информация об объекте недвижимости.<br></br>
                                </div>
                            </div>
                        ): null}

                        <div className='f-raleway-l mt-4 cur-p' onClick={() => {
                            setShowRegInfo3(!showRegInfo3)
                        }}>
                            <span className='me-2'>
                                {!showRegInfo3 ? (
                                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21.125 9.75L13 17.875L4.875 9.75" stroke="#3F3F3F" strokeWidth="2.4375" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                ):(
                                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.875 16.25L13 8.125L21.125 16.25" stroke="#2CA5EC" strokeWidth="2.4375" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                )}
                            </span>
                            Цены действительно ниже, чем у других компаний?
                        </div>
                        {showRegInfo3 ? (
                            <div className='overflow-hidden'>
                                <div className='f-raleway-x-mini mrg-reg-info'>
                                    Воспользуйтесь нашим калькулятором —  заполните все поля нужными данными, он<br></br> 
                                    произведет расчет и в режиме онлайн сравнит цены с другими конкурентами.
                                </div>
                            </div>
                        ): null}

                        <div className='f-raleway-l mt-4 cur-p' onClick={() => {
                            setShowRegInfo4(!showRegInfo4)
                        }}>
                            <span className='me-2'>
                                {!showRegInfo4 ? (
                                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21.125 9.75L13 17.875L4.875 9.75" stroke="#3F3F3F" strokeWidth="2.4375" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                ):(
                                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.875 16.25L13 8.125L21.125 16.25" stroke="#2CA5EC" strokeWidth="2.4375" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                )}
                            </span>
                            Будет ли действителен электронный полис в отличие от бумажного?
                        </div>
                        {showRegInfo4 ? (
                            <div className='overflow-hidden'>
                                <div className='f-raleway-x-mini mrg-reg-info'>
                                    Электронные полисы принимают банки, ведь они ничем отличаются от бумажных.<br></br> 
                                    Более 12 лет организуем страхование и обеспечиваем выплаты по обязательствам.
                                </div>
                            </div>
                        ): null}

                        <div className='f-raleway-l mt-4 cur-p' onClick={() => {
                            setShowRegInfo5(!showRegInfo5)
                        }}>
                            <span className='me-2'>
                                {!showRegInfo5 ? (
                                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21.125 9.75L13 17.875L4.875 9.75" stroke="#3F3F3F" strokeWidth="2.4375" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                ):(
                                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.875 16.25L13 8.125L21.125 16.25" stroke="#2CA5EC" strokeWidth="2.4375" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                )}
                            </span>
                            Сколько времени нужно на оформление полиса и где будет доступен документ?
                        </div>
                        {showRegInfo5 ? (
                            <div className='overflow-hidden'>
                                <div className='f-raleway-x-mini mrg-reg-info'>
                                    Покупка страховки займёт всего 5 минут, а полис придет вам на электронную почту,<br></br> 
                                    также полис сохранится и в личном кабинете нашего сайта.
                                </div>
                            </div>
                        ): null}

                        <div className='f-raleway-l mt-4 cur-p' onClick={() => {
                            setShowRegInfo6(!showRegInfo6)
                        }}>
                            <span className='me-2'>
                                {!showRegInfo6 ? (
                                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21.125 9.75L13 17.875L4.875 9.75" stroke="#3F3F3F" strokeWidth="2.4375" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                ):(
                                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.875 16.25L13 8.125L21.125 16.25" stroke="#2CA5EC" strokeWidth="2.4375" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                )}
                            </span>
                            Какой вид страхования вы предоставляете?
                        </div>
                        {showRegInfo6 ? (
                            <div className='overflow-hidden'>
                                <div className='f-raleway-x-mini mrg-reg-info'>
                                    Оформляйте любой тип недвижимости и имущества, застрахуйте свою жизнь и<br></br> 
                                    здоровье. В любом из этих случаев страхования компания полностью погасит банку<br></br>
                                    остаток задолженности по ипотеке.
                                </div>
                            </div>
                        ): null}
                    </div>
                </div>
            </div>
        </>
    )
}