import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import './style.css'
import { MainCalc } from '../Calc/maincalc';
import { InfoCalc } from '../Calc/infocalc';
import { Header } from '../Header/header';
import { RegPolice } from '../RegPolice/regpolice';
import { getBanner, getSettings } from '../Person/personapi';
import { OnlineMinuts5 } from '../Objects/onlineminuts5';
import { Button } from '../Buttons/button';
import { LogoSVGfooter } from '../../static/Const/vars';
import { Promo } from './home_promo';
import { FormManager } from '../FormManager/formmanager';
import { HomeNews } from './home_news';
import { Footer } from './footer';
import backgroundHomeBlock1 from '../../static/main-block1.png'
import { sendGetNews } from '../News/newsapi';
import { getToken, getCostPolicy } from './homeapi';
import { sendGetPromo } from '../Promo/promoapi';
import { Confidence } from './confidence';
import { Included } from './included';
import { HowReg } from './howreg';
import { selectLifeOption, selectPropertyOption, selectBannerUrl, selectBannerUrlMobile, selectBannerIsOn, setBannerUrlMobile, selectPremiumSum, selectMortgageBalance } from './homeSlice';
import { setBannerUrl, setBannerIsOn, setPremiumSum, setToken } from './homeSlice';
import { Banner } from './banner';


export function Home(props) {
    const dispatch = useDispatch();
    const banner_url = useSelector(selectBannerUrl)
    const banner_url_mobile = useSelector(selectBannerUrlMobile)
    const banner_is_on = useSelector(selectBannerIsOn)
    const lifeOption = useSelector(selectLifeOption)
    const propertyOption = useSelector(selectPropertyOption)
    const premiumSum = useSelector(selectPremiumSum)
    const [calcStep, setCalcStep] = useState('main') // main, info
    const mortgageBalance = useSelector(selectMortgageBalance)
    // const [premiumSum, setPremiumSum] = useState(0)
    // const [discount, setDiscount] = useState(0)
    
    const [isLoadCost, setIsLoadCost] = useState(false)
    const [showCostPolicy, setShowCostPolicy] = useState(true)
    // const [lifeOption, setLifeOption] = useState(false)
    // const [propertyOption, setPropertyOption] = useState(true)
    const [showFormManager, setShowFormManager] = useState(false)
    // const [promt, setPromt] = useState('')
    // const [promtProperty, setPromtProperty] = useState('')
    const [listNews, setListNews] = useState([])
    const [listPromo, setListPromo] = useState([])
    const [another_bank, setAnother_bank] = useState(false)
    
    
    const handleClickSendToManager = () => {
        setShowFormManager(true)
    }


    function handleGetToken() {
        getToken({}, function(token) {
            dispatch(setToken(token))
            if (mortgageBalance === 0 || mortgageBalance === '0') {
                dispatch(setPremiumSum(0))
                setIsLoadCost(false)
                setShowCostPolicy(true)
            }
            else {
                getCostPolicy({token: token, limit_sum: mortgageBalance.replace(/ /g, '') }, function(data) {
                    dispatch(setPremiumSum(data.res.result.data.premium_sum))
                    setIsLoadCost(false)
                    setShowCostPolicy(true)
                })
            }
        })
    }


    

    const closeModalFormManager = () => {
        setShowFormManager(false)
    }

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
    };

    const handleGetNews = () => {
        sendGetNews({}, function(data) {
            setListNews(data.news)
        })
    }

    const handleGetPromo = () => {
        
        sendGetPromo({}, function(data) {
            setListPromo(data.promo)
        })
    }

    const handleGetBanner = () => {
        console.log('handleGetBanner')
        getBanner(function(data) {
            console.log('data', data)
            dispatch(setBannerUrl(data.banner_url))
            dispatch(setBannerUrlMobile(data.banner_url_mobile))
            dispatch(setBannerIsOn(data.is_on))
        })
    }

    useEffect(() => {
        handleGetNews()
        handleGetPromo()
        handleGetBanner()
        props.setMenuText('Страхование ипотеки')
        props.setMenuItemText('Новостройки')
    }, [])
    return (
        <>
            <Modal
                isOpen={showFormManager}
                // onAfterOpen={afterOpenModal}
                // onRequestClose={closeModal}
                style={customStyles}
            >
                    <FormManager closeModalFormManager={closeModalFormManager} another_bank={another_bank}/>
            </Modal>
            <Header 
                setUserId={props.setUserId} 
                menuText={props.menuText} 
                menuItemText={props.menuItemText}
                setCalcStep={setCalcStep}
            />
            
            {
                banner_is_on ? (
                    <Banner banner_url={banner_url} banner_url_mobile={banner_url_mobile}/>                    
                ):(
                    null
                )
            }
            <div className='h-f' 
                    style={{
                        backgroundImage: `url(${backgroundHomeBlock1})`, 
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover'
                    }}
            >
                {OnlineMinuts5}
                <div className='f-raleway m-title1 resp-font'>
                    Страхование
                </div>
                <div className='f-raleway m-title1 resp-font'>
                    Ипотеки
                </div>
                <div className='f-raleway-mini m-title1'>
                    Предлагаем сэкономить на <span className='color-blue text-underline'>обязательном </span>
                     ипотечном страховании. <br></br>Лучшее предложение на
                    страховку квартиры и жизни.<br></br> 
                    Наши полисы принимают банки-кредиторы.
                </div>
                
                {calcStep === 'main' ? (
                    <MainCalc 
                        setCalcStep={setCalcStep}
                        getToken={handleGetToken}
                        getCostPolicy={getCostPolicy}
                        showFormManager={showFormManager}
                        setShowFormManager={setShowFormManager}
                        setShowCostPolicy={setShowCostPolicy}
                        setIsLoadCost={setIsLoadCost}
                        setAnother_bank={setAnother_bank}
                    />
                ): null}
                {calcStep === 'info' ? (
                    <InfoCalc 
                        setCalcStep={setCalcStep}
                        getCostPolicy={getCostPolicy}
                        isLoadCost={isLoadCost}
                        showCostPolicy={showCostPolicy}
                        setShowCostPolicy={setShowCostPolicy}
                        setIsLoadCost = {setIsLoadCost}
                        setShowFormManager={setShowFormManager}
                    />
                ): null}
                {calcStep === 'registration' ? (
                    <RegPolice 
                        premiumSum={premiumSum}
                        lifeOption={lifeOption}
                        propertyOption={propertyOption}
                        setCalcStep={setCalcStep}
                        setShowFormManager={setShowFormManager}
                        showFormManager={showFormManager}
                    />
                ): null}
            </div>

            {calcStep === 'main' ? (
                <>
                    <Included/>

                    <Confidence/>

                    <Promo listPromo={listPromo}/>

                    <HowReg/>

                    <HomeNews listNews={listNews}/>
                </>
            ): (
                <>
                    <div className='place-calc'></div>
                </>
            )}

            {/* question */}
            <div className={calcStep === 'main' ? '': 'question'}>
                <div className='container-question d-flex justify-content-center'>
                    <div className='d-flex row'>
                        <div className='block-question'>
                            <div className='title-question'>Остались вопросы?</div>    
                            <div className='text-question'>
                                Вы можете оставить заявку, сделать расчет он-лайн и получите
                                полис на почту за 5 минут
                            </div>
                            
                            <div className='d-flex row'>
                                <div className='phone'>
                                    <div className='f-raleway-x-mini mt-3'>Россия</div>
                                    <div className='header-phone p-2'>
                                        8 ( 804 ) 700 - 42 - 30
                                    </div>
                                </div>
                                <div className='phone'>
                                    <div className='f-raleway-x-mini mt-3'>Москва</div>
                                    <div className='header-phone p-2'>
                                        +7 ( 499 ) 130 - 42 - 30
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='block-question d-flex justify-content-center'>
                            <div className='container-block-question'>
                                <Button text={'Оставить заявку'} handleClick={handleClickSendToManager}/>
                                <div className='f-raleway-x-mini mt-3'>
                                    Оставьте заявку и менеджер с вами свяжется, сделает<br></br> 
                                    расчет и поможет оформить полис 
                                </div>
                            </div>
                        </div>
                    </div>            
                </div>
            </div>

            <Footer/>
            
        </>
    );
}
