
import React, { useState, useEffect } from 'react';
import { Outlet, Link, useRoutes, useParams } from "react-router-dom";
import Modal from 'react-modal';
import photoObject from '../../static/photoObject.png';
import { Header } from '../Header/header';
import { OBJECTS } from '../../static/Const/vars';
import { OnlineMinuts5obj } from './onlineminuts5';
import { sendGetObjectInfo } from './objectsapi';
import { getCostPolicy, getToken } from '../Home/homeapi';
import { getSettings } from '../Person/personapi';
import { MainCalc } from '../Calc/maincalc';
import { InfoCalc } from '../Calc/infocalc';
import { RegPolice } from '../RegPolice/regpolice';
import { FormManager } from '../FormManager/formmanager';
import { Footer } from '../Home/footer';
import { Included } from '../Home/included';
import { Confidence } from '../Home/confidence';
import { Promo } from '../Home/home_promo';
import { HowReg } from '../Home/howreg';
import { HomeNews } from '../Home/home_news';
import { sendGetPromo } from '../Promo/promoapi';
import { sendGetNews } from '../News/newsapi';
import { useDispatch, useSelector } from 'react-redux';
import { selectMortgageBalance, setToken } from '../Home/homeSlice';
import { ObjectInfo } from './objectinfo';

export function ObjectItem(props) {
    const dispatch = useDispatch();
    let { userId } = useParams();
    const [nameObj, setNameObj] = useState('')
    const [developer, setDeveloper] = useState('')
    const [project_declaration, setProject_declaration] = useState('')
    const [class_object, setClass_object] = useState('')
    const [walls, setWalls] = useState('')
    const [num_floors, setNum_floors] = useState('')
    const [num_flats, setNum_flats] = useState('')
    const [commissioning, setCommissioning] = useState('')
    const [issuance_keys, setIssuance_keys] = useState('')
    const [addres, setAddres] = useState('')

    // calc
    const [calcStep, setCalcStep] = useState('main') // main, info, registration
    const mortgageBalance = useSelector(selectMortgageBalance)
    const [premiumSum, setPremiumSum] = useState(0)
    const [discount, setDiscount] = useState(0)
    
    const [isLoadCost, setIsLoadCost] = useState(false)
    const [showCostPolicy, setShowCostPolicy] = useState(true)
    const [lifeOption, setLifeOption] = useState(false)
    const [showFormManager, setShowFormManager] = useState(false)
    const [promt, setPromt] = useState('')
    const [showOverlay, setShowOverlay] = useState(false)
    const [another_bank, setAnother_bank] = useState(false)
    const [listPromo, setListPromo] = useState([])
    const [listNews, setListNews] = useState([])
    const [title1, setTitle1] = useState([])
    const [block1_title1, setBlock1_title1] = useState([])
    const [block1_text1, setBlock1_text1] = useState([])
    const [block1_title2, setBlock1_title2] = useState([])
    const [block1_text2, setBlock1_text2] = useState([])
    const [block1_title3, setBlock1_title3] = useState([])
    const [block1_text3, setBlock1_text3] = useState([])

    const [img_url, setImg_url] = useState([])

    const [title2, setTitle2] = useState([])

    const [block2_title1, setBlock2_title1] = useState([])
    const [block2_text1, setBlock2_text1] = useState([])
    const [block2_title2, setBlock2_title2] = useState([])
    const [block2_text2, setBlock2_text2] = useState([])
    const [block2_title3, setBlock2_title3] = useState([])
    const [block2_text3, setBlock2_text3] = useState([])
    const [block2_title4, setBlock2_title4] = useState([])
    const [block2_text4, setBlock2_text4] = useState([])
    const [text, setText] = useState([])
    
    

    function handleInfoObject(ind) {
        sendGetObjectInfo({ind: ind}, function(data) {
            document.title = 'Оформление обязательной страховки для ипотеки в ' + data.name
            setNameObj(data.name)
            setDeveloper(data.company)
            setProject_declaration(data.declar)
            setClass_object(data.class_estate)
            setWalls(data.walls)
            setNum_floors(data.q_floors)
            setNum_flats(data.q_flats)
            setCommissioning(data.commiss)
            setIssuance_keys(data.get_keys)
            setAddres(data.address)

            setTitle1(data.title1)
            setBlock1_title1(data.block1_title1)
            setBlock1_text1(data.block1_text1)
            setBlock1_title2(data.block1_title2)
            setBlock1_text2(data.block1_text2)
            setBlock1_title3(data.block1_title3)
            setBlock1_text3(data.block1_text3)
            setImg_url(data.img_url)
            setTitle2(data.title2)
            setBlock2_title1(data.block2_title1)
            setBlock2_text1(data.block2_text1)
            setBlock2_title2(data.block2_title2)
            setBlock2_text2(data.block2_text2)
            setBlock2_title3(data.block2_title3)
            setBlock2_text3(data.block2_text3)
            setBlock2_title4(data.block2_title4)
            setBlock2_text4(data.block2_text4)
            setText(data.text)
        })
    }

    //calc
    function handleGetToken() {
        getToken({}, function(token) {
            dispatch(setToken(token))
            getCostPolicy({token: token, limit_sum: mortgageBalance }, function(data) {
                setPremiumSum(data.res.result.data.premium_sum)
                setIsLoadCost(false)
                setShowCostPolicy(true)
            })
        })
    }

    function handleGetDiscount() {
        getSettings({user_id: props.userId}, function(data) {
            if (data.res) {
               setDiscount(data.discount)
               setPromt(data.promt)
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

    useEffect(() => {
        handleGetNews()
        handleGetPromo()
        handleInfoObject(parseInt(userId))
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
            {calcStep === 'registration' ? (
                <>
                    <div className='overlay'></div>
                </>
            ): null}
            <Header setUserId={props.setUserId}/>
            <div className='body-obj-item'>
                {/* <h3 className='ms-5 ps-5'>Страховка для ипотеки {nameObj}</h3> */}
                {/* <p className='ms-5 ps-5'>{addres}</p> */}
                <div className='row p-0 m-0'>
                    <div className='col-objitem-6 block2 p-0'>
                        <div className='menu-obj-item row mt-5 d-flex align-items-center'>
                            <div className='logo-menu-obj d-flex justify-content-center align-items-center'>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.4618 3.00471L9.20515 0.343294C8.74553 0.110656 8.2268 -0.00761246 7.70111 0.00037981C7.17542 0.00837207 6.6613 0.142341 6.21045 0.388821L1.45496 2.98954C1.01037 3.23225 0.642567 3.576 0.387526 3.98714C0.132484 4.39828 -0.00105274 4.86272 6.24981e-06 5.33501V14.3913C6.24981e-06 14.8179 0.186 15.2271 0.517063 15.5288C0.848126 15.8305 1.29714 16 1.76534 16H3.38531C3.61771 16.0002 3.84785 15.9585 4.06251 15.8774C4.27718 15.7963 4.47215 15.6773 4.6362 15.5273C4.80024 15.3773 4.93012 15.1992 5.01841 15.0033C5.1067 14.8074 5.15164 14.5975 5.15065 14.3858V10.9821C5.15065 10.5554 5.33664 10.1462 5.6677 9.84454C5.99877 9.54284 6.44778 9.37335 6.91598 9.37335H9.08705C9.31901 9.37317 9.54873 9.41465 9.76309 9.49542C9.97744 9.57618 10.1722 9.69465 10.3363 9.84405C10.5004 9.99345 10.6306 10.1709 10.7194 10.3661C10.8082 10.5614 10.8539 10.7707 10.8539 10.9821V14.3899C10.8539 14.8163 11.0397 15.2253 11.3704 15.527C11.7011 15.8286 12.1498 15.9983 12.6177 15.9986H14.2347C14.7029 15.9986 15.1519 15.8291 15.4829 15.5274C15.814 15.2257 16 14.8166 16 14.3899V5.39433C16.001 4.90716 15.8589 4.42863 15.5884 4.00842C15.3179 3.58821 14.9289 3.24165 14.4618 3.00471Z" fill="#2CA5EC"/>
                                </svg>
                            </div>
                            <div className='col-menuobjitem-2 menu-item-main'>
                                <div className='d-flex justify-content-center menu-obj-text-br'>
                                    <Link className='t-dec  cur-p' to="/"
                                    >
                                        <div className='font-obj-text'>
                                            Главная
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            
                            <div className='col-menuobjitem-2 menu-obj-text-br d-flex justify-content-center cur-p'>
                                <Link className='t-dec  cur-p' to="/objects"
                                >
                                    <div className='font-obj-text'>
                                        Объекты
                                    </div>
                                </Link>
                            </div>
                            <div className='col-menuobjitem-8 menu-obj-text ps-4'>
                                {nameObj}
                            </div>
                        </div>
                        {OnlineMinuts5obj}
                        <div className='big-title-obj w-30'>
                            Страховка для ипотеки
                        </div>
                        <div className='big-title-obj'>
                            {nameObj}
                        </div>
                        <div className='under-title-obj mt-2'>Оформление обязательной страховки для ипотеки в</div>
                        <div className='under-title-obj'>
                            {nameObj + ', ' + addres}
                        </div>
                    </div>
                    
                    <div className='col-objitem-6-img block1 p-0'>
                        <img className=' w-100' src={photoObject}/>
                    </div>
                </div>
                <div className='place-calc'></div>
                <div className='row w-100 m-0 p-0'>
                    <div className='col-objitem-6 block12'>
                        <div className='title-objectitem'>Объект</div>
                        <div className='body-objectitem'>
                            <div className='d-flex justify-content-between align-items-center info-row-obj'>
                                <div className='fs-10'>Застройщик:</div>
                                <div className='fs-10 text-end w-50'>{developer}</div>
                            </div>
                            <div className='d-flex justify-content-between align-items-center info-row-obj'>
                                <div className='fs-10'>Проектная декларация:</div>
                                <div className='fs-10'>{project_declaration}</div>
                            </div>
                            <div className='d-flex justify-content-between align-items-center info-row-obj'>
                                <div className='fs-10'>Ввод в эксплуатацию:</div>
                                <div className='fs-10'>{commissioning}</div>
                            </div>
                            <div className='d-flex justify-content-between align-items-center info-row-obj'>
                                <div className='fs-10'>Выдача ключей:</div>
                                <div className='fs-10'>{issuance_keys}</div>
                            </div>
                        </div>
                    </div>
                    <div className='col-objitem-6 block22'>
                        <div className='title-objectitem '>Характеристики</div>
                        <div className='body-objectitem '>
                            <div className='d-flex justify-content-between align-items-center info-row-obj'>
                                <div className='fs-10'>Класс недвижимости:</div>
                                <div className='fs-10'>{class_object}</div>
                            </div>
                            <div className='d-flex justify-content-between align-items-center info-row-obj'>
                                <div className='fs-10'>Стены:</div>
                                <div className='fs-10'>{walls}</div>
                            </div>
                            <div className='d-flex justify-content-between align-items-center info-row-obj'>
                                <div className='fs-10'>Количество этажей:</div>
                                <div className='fs-10'>{num_floors}</div>
                            </div>
                            <div className='d-flex justify-content-between align-items-center info-row-obj'>
                                <div className='fs-10'>Количество квартир:</div>
                                <div className='fs-10'>{num_flats}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            

            {/* calc */}
            {calcStep === 'main' ? (
                    <MainCalc 
                        setCalcStep={setCalcStep}
                        getToken={handleGetToken}
                        getCostPolicy={getCostPolicy}
                        handleGetDiscount={handleGetDiscount}
                        showFormManager={showFormManager}
                        setShowFormManager={setShowFormManager}
                        setShowCostPolicy={setShowCostPolicy}
                        setIsLoadCost = {setIsLoadCost}
                        setAnother_bank={setAnother_bank}
                        page={'obj_item'}
                    />
                ): null}
            {calcStep === 'info' ? (
                <InfoCalc 
                    setCalcStep={setCalcStep}
                    premiumSum={premiumSum}
                    discount={discount}
                    getCostPolicy={getCostPolicy}
                    isLoadCost={isLoadCost}
                    showCostPolicy={showCostPolicy}
                    setShowCostPolicy={setShowCostPolicy}
                    lifeOption={lifeOption}
                    setLifeOption={setLifeOption}
                    promt={promt}
                    setPremiumSum={setPremiumSum}
                    setIsLoadCost = {setIsLoadCost}
                    setShowFormManager={setShowFormManager}
                />
            ): null}
            {calcStep === 'registration' ? (
                <RegPolice 
                    lifeOption={lifeOption}
                    setCalcStep={setCalcStep}
                    setShowFormManager={setShowFormManager}
                />
            ): null}

            {calcStep === 'main' ? (
                <>
                    <ObjectInfo
                        title1={title1}
                        block1_title1={block1_title1}
                        block1_text1={block1_text1}
                        block1_title2={block1_title2}
                        block1_text2={block1_text2}
                        block1_title3={block1_title3}
                        block1_text3={block1_text3}
                        img_url={img_url}
                        title2={title2}
                        block2_title1={block2_title1}
                        block2_text1={block2_text1}
                        block2_title2={block2_title2}
                        block2_text2={block2_text2}
                        block2_title3={block2_title3}
                        block2_text3={block2_text3}
                        block2_title4={block2_title4}
                        block2_text4={block2_text4}
                        text={text}
                    />

                    <Included/>

                    <Confidence/>

                    <Promo listPromo={listPromo}/>

                    <HowReg/>

                    <HomeNews listNews={listNews}/>
                </>
            ): null}

            
            <Footer/>
        </>
    );
}
