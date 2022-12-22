import React, { useState } from 'react';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select'

import './style.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ButtonLight } from '../Buttons/buttonLight';
import { Button } from '../Buttons/button';
import { getCostPolicyLife, getCostPolicy } from '../Home/homeapi';
import { ErrMessage } from '../Home/errmessage';
import { digitNumber } from '../../features/funcs';

import { selectTypeObject, selectIdBank, selectIsManagerCost, selectInsuranceLogo, selectInsuranceCompany, selectDiscount, selectPromt, selectPromtCredit, selectPromtProperty, selectIsDoubleInsurance, setIsDoubleInsurance, setInsuranceCompany2, selectInsuranceCompany2 } from './calcSlice';
import { setIsManagerCost, setIdBank, setInsuranceLogo, setInsuranceCompany } from './calcSlice';
import { list_banks, list_banks1 } from '../../static/Const/vars';
import { getParseData, getParseDataLife, getParseDataLifeAndProperty, preCalc, preCalcLife } from './calcapi';

import { selectLifeOption, selectPremiumSum, selectPropertyOption, setLifeOption, setPropertyOption, setPremiumSum, selectToken, selectCookie, setPremiumSum2, selectPremiumSum2 } from '../Home/homeSlice';
import { DoubleInsurance } from './calcElements';

export function InfoCalc(props) {
    const dispatch = useDispatch();
    const isDoubleInsurance = useSelector(selectIsDoubleInsurance)
    const cookie = useSelector(selectCookie)
    const token = useSelector(selectToken)
    const promtProperty = useSelector(selectPromtProperty)
    const typeObject = useSelector(selectTypeObject)
    const idBank = useSelector(selectIdBank)
    const isManagerCost = useSelector(selectIsManagerCost)
    const insuranceLogo = useSelector(selectInsuranceLogo)
    const insuranceCompany = useSelector(selectInsuranceCompany)
    const insuranceCompany2 = useSelector(selectInsuranceCompany2)
    const lifeOption = useSelector(selectLifeOption)
    const propertyOption = useSelector(selectPropertyOption)
    const discount = useSelector(selectDiscount)
    const promt = useSelector(selectPromt)
    const promtCredit = useSelector(selectPromtCredit)
    const premiumSum = useSelector(selectPremiumSum)
    const premiumSum2 = useSelector(selectPremiumSum2)
    const setShowFormManager = props.setShowFormManager
    const [listInsurance, setListInsurance] = useState([])
    const [startDate, setStartDate] = useState(new Date('2000-01-01'));
    const [gender, setGender] = useState('1')
    const [isLoad, setIsLoad] = useState(false)
    const [showPromt, setShowPromt] = useState(false)
    const [showPromtCredit, setShowPromtCredit] = useState(false)
    
    const [showPromtProperty, setShowPromtProperty] = useState(false)
    const [showPromtDoc, setShowPromtDoc] = useState(false)
    const [showErrMessage, setShowErrMessage] = useState(false)
    const [errMessage, setErrMessage] = useState('')

    const insuranceCompanies = {'pari': 'СК ПАРИ'}
    

    const renderedListInsurance = listInsurance.map(insurance => {
        return (
            <div className='col-insure-2' key={insurance.key}>
                <div>
                    <img className='logo' src={'https://www.cherehapa.ru' + insurance.logo} alt='company_logo'/>
                </div>
                <p>{insurance.insurance}</p>
            </div>
        )
        })
    
    function setInfoForAnotherBank(data) {
        let costPolicyAnotherBank = 1000000
        let cost = 0
        let company = ''
        data.listRes.forEach((el) => {
            cost = parseFloat(el.insurance.replace(/\s+/g, ''))
            if (cost < costPolicyAnotherBank) {
                costPolicyAnotherBank = cost
                company = insuranceCompanies[el.alt]
                console.log('comp', el)
            }
        })
        
        if (costPolicyAnotherBank === 1000000) {
            dispatch(setIsManagerCost(true))
            dispatch(setInsuranceCompany(' '))
        }
        else {
            dispatch(setIsManagerCost(false))
            dispatch(setPremiumSum(costPolicyAnotherBank))
            dispatch(setInsuranceCompany(company))
            props.setIsLoadCost(false)
        }
        props.setShowCostPolicy(true)
    }

    function handleParseData(...par) {
        console.log('idBank', idBank)
        setIsLoad(true)
        const pars = {idBank: idBank, mortgageBalance: props.mortgageBalance}
        getParseData(pars, function (data) {
                setIsLoad(false)
                let premium = premiumSum
                if (par.length === 1) {
                    premium = par[0]
                }
                if (idBank !== '1') {
                    setInfoForAnotherBank(data)
                }
                else {
                    dispatch(setIsManagerCost(false))
                    const arr = []
                    data.listRes.forEach((el) => {
                        if (parseFloat(el.insurance.replace(/\s+/g, '')) > parseFloat(premium)) {
                            arr.push(el)
                        }
                    })
                    setListInsurance(arr)
                }
                
                setIsLoad(false)
        });
    }

    function handleParseDataLife(...par) {
        setIsLoad(true)
        let gender_par = 'male'
        if (gender === '2') {gender_par = 'female'}
        const pars = {
            idBank: idBank,
            mortgageBalance: props.mortgageBalance,
            gender_par: gender_par,
            birthday: startDate.toLocaleDateString().split('.').reverse().join('-'),
        }
        getParseDataLife (pars, function(data)  {
                console.log(data)
                let premium = premiumSum
                console.log(premium)
                if (par.length === 1) {
                    premium = par[0]
                }
                if (idBank !== '1') {
                    setInfoForAnotherBank(data)
                }
                else {
                    dispatch(setIsManagerCost(false))
                    const arr = []
                    data.listRes.forEach((el) => {
                        console.log(parseFloat(el.insurance.replace(/\s+/g, '')), parseFloat(premium))
                        if (parseFloat(el.insurance.replace(/\s+/g, '')) > parseFloat(premium)) {
                            arr.push(el)
                        }
                    })
                    console.log(arr)
                    setListInsurance(arr)
                }
                setIsLoad(false)
          });
    }
    
    function handleParseDataLifeAndProperty(...par) {
        console.log('getParseDataLifeAndProperty')
        setIsLoad(true)
        let gender_par = 'male'
        if (gender === '2') {gender_par = 'female'}
        const pars = {
            idBank: idBank,
            mortgageBalance: props.mortgageBalance,
            gender_par: gender_par,
            birthday: startDate.toLocaleDateString().split('.').reverse().join('-'),
        }
        getParseDataLifeAndProperty (pars, function(data) {
                console.log('getParseDataLifeAndProperty', data)
                let premium = premiumSum
                console.log(premium)
                if (par.length === 1) {
                    premium = par[0]
                }
                if (idBank !== '1') {
                    setInfoForAnotherBank(data)
                }
                else {
                    dispatch(setIsManagerCost(false))
                    const arr = []
                    data.listRes.forEach((el) => {
                        console.log(parseFloat(el.insurance.replace(/\s+/g, '')), parseFloat(premium))
                        if (parseFloat(el.insurance.replace(/\s+/g, '')) > parseFloat(premium)) {
                            arr.push(el)
                        }
                    })
                    console.log(arr)
                    setListInsurance(arr)
                }
                setIsLoad(false)
        });
    }

    const handleChangeBirthDay = () => {
        if (lifeOption) {
            if (propertyOption) {
                handleGetCostPolicyLifeAndProperty()
            }
            else {
                handleGetCostPolicyLife()
            }
        }
        else {
            if (propertyOption) {
                handleGetCostPolicy()
            }
            else {
                dispatch(setPremiumSum(0))
                props.setIsLoadCost(false)
                props.setShowCostPolicy(true)
            }
        }
    }

    const handleChangeLifeOption = () => {
        if (idBank === '1') {
            if (!lifeOption) {
                props.setIsLoadCost(true)
                props.setShowCostPolicy(false)
                if (propertyOption) {
                    handleGetCostPolicyLifeAndProperty()
                }
                else {
                    handleGetCostPolicyLife()
                }
            }
            else {
                props.setIsLoadCost(true)
                props.setShowCostPolicy(false)
                if (propertyOption) {
                    handleGetCostPolicy()
                }
                else {
                    dispatch(setPremiumSum(0))
                    props.setIsLoadCost(false)
                    props.setShowCostPolicy(true)
                }
            }
        }
        else {
            getCostAnotherBank()
        }
        
        dispatch(setLifeOption(!lifeOption))
    }

    const handleGetCostPolicyLifeAndProperty = () => {
        setListInsurance([])
        preCalcLife({
            cookie: cookie,
            token: token,
            limit_sum: props.mortgageBalance,
            sex: gender === '1' ? 'М': 'Ж',
            birthday: startDate.toISOString().slice(0, -5),
        }, (data) => {
            let premium_life = parseFloat(data.res.premium)
            let company_life = data.res.company
            console.log('company_life', company_life)
            preCalc({token: token, cookie: cookie, limit_sum: props.mortgageBalance}, (data) => {
                if (data.res.company !== company_life) {
                    dispatch(setIsDoubleInsurance(true))
                    dispatch(setPremiumSum(parseFloat(data.res.premium)))
                    dispatch(setPremiumSum2(premium_life))
                    dispatch(setInsuranceCompany(data.res.company))
                    dispatch(setInsuranceCompany2(company_life))
                }
                else {
                    dispatch(setIsDoubleInsurance(false))
                    dispatch(setPremiumSum(parseFloat(data.res.premium)))
                    dispatch(setPremiumSum2(premium_life))
                    dispatch(setInsuranceCompany(data.res.company))
                    dispatch(setInsuranceCompany2(''))
                }
                props.setIsLoadCost(false)
                props.setShowCostPolicy(true)
            })
        })
    }

    const handleChangePropertyOption = () => {
        if (idBank === '1') {
            if (!propertyOption) {
                props.setShowCostPolicy(false)
                props.setIsLoadCost(true)
                if (lifeOption) {
                    handleGetCostPolicyLifeAndProperty()
                }
                else {
                    handleGetCostPolicy()
                }
            }
            else {

                props.setIsLoadCost(true)
                props.setShowCostPolicy(false)
                if (lifeOption) {
                    handleGetCostPolicyLife()
                }
                else {
                    dispatch(setPremiumSum(0))
                    props.setIsLoadCost(false)
                    props.setShowCostPolicy(true)
                }
            }    
        }
        else {
            getCostAnotherBank()
        }
        
        dispatch(setPropertyOption(!propertyOption))

    }

    const getCostAnotherBank = () => {
        // console.log(9)
        handleParseData()
    }

    const handleChangeGender = (e) => {
        props.setShowCostPolicy(false)
        setGender(e.target.value)
    }

    const handleTestPrice = () => {
        if (lifeOption && !propertyOption) {
            handleParseDataLife()
        }
        else if (!lifeOption && propertyOption) {
            handleParseData()
        }
        else if (lifeOption && propertyOption) {
            handleParseDataLifeAndProperty()
        }
    }

    const handleClickToReg = () => {
        props.setCalcStep('registration')
        window.ym(90426649,'reachGoal','oformit_onlayn')
    }

    const handleGetCostPolicyLife = () => {
        setListInsurance([])
        dispatch(setIsDoubleInsurance(false))
        dispatch(setPremiumSum2(0))
        dispatch(setInsuranceCompany2(''))
        preCalcLife({
            cookie: cookie,
            token: token,
            limit_sum: props.mortgageBalance,
            sex: gender === '1' ? 'М': 'Ж',
            birthday: startDate.toISOString().slice(0, -5),
        }, (data) => {
            dispatch(setPremiumSum(parseFloat(data.res.premium)))
            dispatch(setInsuranceCompany(data.res.company))
            props.setIsLoadCost(false)
            props.setShowCostPolicy(true)
        })
    }

    const handleGetCostPolicy = () => {
        setListInsurance([])
        dispatch(setIsDoubleInsurance(false))
        dispatch(setPremiumSum2(0))
        dispatch(setInsuranceCompany2(''))
        preCalc({token: token, cookie: cookie, limit_sum: props.mortgageBalance}, (data) => {
            dispatch(setPremiumSum(parseFloat(data.res.premium)))
            dispatch(setInsuranceCompany(data.res.company))
            props.setIsLoadCost(false)
            props.setShowCostPolicy(true)
        })
    }

    const handleClickGetCost = () => {
        props.setIsLoadCost(true)
        if (idBank === '1') {
            dispatch(setIsManagerCost(false))
            if (lifeOption) {
                if (propertyOption) {
                    handleGetCostPolicyLifeAndProperty()
                }
                else {
                    handleGetCostPolicyLife()
                }
            }
            else {
                if (propertyOption) {
                    handleGetCostPolicy()
                }
                else {
                    dispatch(setPremiumSum(0))
                    props.setIsLoadCost(false)
                    props.setShowCostPolicy(true)
                }
            }
        } 
        else {
            getCostAnotherBank()
        }
        
    }

    const handleChangeTypeObject = (e) => {
        if (e.target.value !== 1 &&  e.target.value !== 4) {
            setShowFormManager(true)
            let element = document.getElementById('type_obj');
            element.value = '1';
        }
    }

    const handleChangeBank = (e) => {
        dispatch(setIdBank(e.value))
        if (e.value !== '1') {
                handleParseData()
        }
        else {
            props.setShowCostPolicy(false)
            dispatch(setPremiumSum(0))
            dispatch(setInsuranceCompany('СК Абсолют'))
        }
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

    return (
        <>
            <Modal
                isOpen={showErrMessage}
                // onAfterOpen={afterOpenModal}
                // onRequestClose={closeModal}
                style={customStyles}
            >
                    <ErrMessage message={errMessage} setShowErrMessage={setShowErrMessage} setShowFormManager={setShowFormManager}/>
            </Modal>
            <div className='main-calc-wrapper'>
                <div className="title-calc">
                    
                </div>
                <div className='frame'>
                    <div className="row m-2">
                        <div className="calc-info-block-3 p-0">
                            <div className="d-flex align-items-start flex-column w-100 font-raleway-700">
                                <label >Банк-Кредитор</label>
                                <div className="w-100 mt-1">
                                    {/* <select className="form-select form-select bg-lg" value={idBank} onChange={handleChangeBank}>
                                        {renderedListBanks}
                                    </select> */}
                                    <Select 
                                        options={list_banks1} 
                                        className="select-banks-info f-raleway-x-mini" 
                                        defaultValue={list_banks1[parseInt(idBank-1)]}
                                        isClearable={true}
                                        placeholder={''}
                                        // defaultInputValue={list_banks1[2]}
                                        onChange={handleChangeBank}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="calc-info-block-3 p-0">
                            <div className="form-group d-flex align-items-start flex-column w-100 font-raleway-700 p-0 ms-2">
                                <label className='text-nowrap'>Остаток по ипотеке</label>
                                <div className="w-100 position-relative input-group mt-1">
                                    <input id='inp_mort' type="text" className="form-control bg-lg w-100" value={digitNumber(props.mortgageBalance)} 
                                        onChange={(e) => {
                                                let inp = document.getElementById('inp_mort')
                                                let pos_cur = inp.selectionStart
                                                // console.log('m', e.target.value.replace(/ /g, '') )
                                                if (!isNaN(e.target.value[e.target.value.length-1])) {
                                                    props.setShowCostPolicy(false)
                                                    props.setMortgageBalance(e.target.value.replace(/ /g, ''))
                                                    dispatch(setPremiumSum(0))
                                                }
                                                inp.setSelectionRange(pos_cur, pos_cur)
                                            }
                                        }
                                    />
                                    <input type="range" className="form-range pos-input-range" max="20000000" 
                                        onChange={(e) => {
                                            props.setMortgageBalance(e.target.value.replace(/ /g, ''))
                                            props.setShowCostPolicy(false)
                                            dispatch(setPremiumSum(0))
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="calc-info-block-33 p-0">
                            <div className="form-group d-flex align-items-start flex-column font-raleway-700">
                                <label className='text-nowrap'>Тип недвижимости</label>
                                <div className="w-100 mt-1">
                                    <select id='type_obj'  value={typeObject} className="form-select form-select bg-lg" onChange={handleChangeTypeObject}>
                                        <option value="1">Квартира</option>
                                        <option value="2">Комната</option>
                                        <option value="3">Частный дом</option>
                                        <option value="4">Апартаменты</option>
                                        <option value="5">Таунхаус</option>
                                        <option value="6">Коммерческая</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="row m-2">
                        <div className="calc-info-block2-4 d-flex align-items-start flex-column p-0">
                            <div className='row d-flex align-items-center'>
                                <div className='col-1'>
                                    <input className="form-check-input" type="checkbox" checked={propertyOption} onChange={handleChangePropertyOption}/>
                                </div>
                                
                                <p className='col-6 f-raleway-x-mini m-0'>Имущество
                                    <span className=' position-relative'
                                        onMouseEnter={() => {
                                                setShowPromtProperty(true)
                                            }
                                        }
                                        onMouseLeave={() => {
                                                setShowPromtProperty(false)
                                            }
                                        }
                                    >
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 15.75C12.7279 15.75 15.75 12.7279 15.75 9C15.75 5.27208 12.7279 2.25 9 2.25C5.27208 2.25 2.25 5.27208 2.25 9C2.25 12.7279 5.27208 15.75 9 15.75Z" stroke="#2CA5EC" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M9 10.6875V10.125C9.44501 10.125 9.88002 9.99304 10.25 9.74581C10.62 9.49857 10.9084 9.14717 11.0787 8.73604C11.249 8.32491 11.2936 7.87251 11.2068 7.43605C11.12 6.99959 10.9057 6.59868 10.591 6.28401C10.2763 5.96934 9.87541 5.75505 9.43895 5.66823C9.0025 5.58142 8.5501 5.62597 8.13896 5.79627C7.72783 5.96657 7.37643 6.25496 7.12919 6.62497C6.88196 6.99498 6.75 7.42999 6.75 7.875" stroke="#2CA5EC" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M9 13.7812C9.46599 13.7812 9.84375 13.4035 9.84375 12.9375C9.84375 12.4715 9.46599 12.0938 9 12.0938C8.53401 12.0938 8.15625 12.4715 8.15625 12.9375C8.15625 13.4035 8.53401 13.7812 9 13.7812Z" fill="#2CA5EC"/>
                                        </svg>
                                        {showPromtProperty ? <p className='font-raleway-700 fs-12 promt'>{promtProperty}</p>: null}

                                    </span>
                                    
                                </p>

                                <div className='col-1 me-2'>
                                    <input className="form-check-input" type="checkbox" checked={lifeOption} onChange={handleChangeLifeOption}/>
                                </div>
                                
                                <p className='col-3 p-0 f-raleway-x-mini m-0'>Жизнь
                                    <span className=' position-relative'
                                        onMouseEnter={() => {
                                                setShowPromt(true)
                                            }
                                        }
                                        onMouseLeave={() => {
                                            setShowPromt(false)
                                        }
                                    }
                                    >
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 15.75C12.7279 15.75 15.75 12.7279 15.75 9C15.75 5.27208 12.7279 2.25 9 2.25C5.27208 2.25 2.25 5.27208 2.25 9C2.25 12.7279 5.27208 15.75 9 15.75Z" stroke="#2CA5EC" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M9 10.6875V10.125C9.44501 10.125 9.88002 9.99304 10.25 9.74581C10.62 9.49857 10.9084 9.14717 11.0787 8.73604C11.249 8.32491 11.2936 7.87251 11.2068 7.43605C11.12 6.99959 10.9057 6.59868 10.591 6.28401C10.2763 5.96934 9.87541 5.75505 9.43895 5.66823C9.0025 5.58142 8.5501 5.62597 8.13896 5.79627C7.72783 5.96657 7.37643 6.25496 7.12919 6.62497C6.88196 6.99498 6.75 7.42999 6.75 7.875" stroke="#2CA5EC" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M9 13.7812C9.46599 13.7812 9.84375 13.4035 9.84375 12.9375C9.84375 12.4715 9.46599 12.0938 9 12.0938C8.53401 12.0938 8.15625 12.4715 8.15625 12.9375C8.15625 13.4035 8.53401 13.7812 9 13.7812Z" fill="#2CA5EC"/>
                                        </svg>
                                        {showPromt ? <p className='font-raleway-700 fs-12 promt'>{promt}</p>: null}

                                    </span>
                                    
                                </p>
                                
                            </div>
                            
                            <div className="">
                                <div className="row">
                                    <div className="col-6">
                                        <label className=''>Дата рождения</label>
                                        {/* <input className='form-control fs' type="text" placeholder="ГГГГ-ММ-ДД"/> */}
                                        <DatePicker 
                                            selected={startDate} 
                                            onChange={(date) => {
                                                props.setShowCostPolicy(false)
                                                props.setIsLoadCost(true)
                                                // handleGetCostPolicyLife()
                                                handleChangeBirthDay()
                                                setStartDate(date)
                                            }} 
                                            className='birthday f-s bg-lg'
                                            disabled={!lifeOption}
                                            dateFormat="yyyy-MM-dd"
                                            placeholderText='Возраст'
                                            peekNextMonth
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="select"
                                        />
                                    </div>

                                    <div className="col-6">
                                        <label className='fs'>Пол</label>
                                        {/* <select 
                                            className=" f-s gender bg-lg" 
                                            disabled={!lifeOption} 
                                            value={gender} 
                                            onChange={handleChangeGender}
                                        >
                                            <option value="1">Муж.</option>
                                            <option value="2">Жен.</option>
                                        </select> */}
                                        <select className="form-select form-select bg-lg f-s" value={gender} onChange={handleChangeGender}>
                                            <option value="1">Муж</option>
                                            <option value="2">Жен</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='calc-info-block2-2 p-0'>
                            
                                <div className="form-group   mt-4">
                                    <label className='f-raleway-15'>Стоимость полиса</label>
                                    {props.showCostPolicy ? 
                                        ( 
                                            <>
                                                {!isManagerCost ? (
                                                    <div className="policy-cost ps-3 py-1">
                                                        <span className="crossed f-raleway-m">
                                                            { digitNumber(Math.round(100*((premiumSum + premiumSum2)/(100-discount))).toString())  + ' ₽' }
                                                        </span>
                                                    </div>
                                                ):(
                                                    <div className='text-nowrap'>
                                                        Уточнить у менеджера
                                                        <span>
                                                            <svg  xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#1984c2" className="bi bi-person-fill" viewBox="0 0 16 16">
                                                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                                                            </svg>
                                                        </span>
                                                    </div>    
                                                )}
                                            </>
                                        ): (
                                            <div className=''>
                                                <ButtonLight isLoad={props.isLoadCost} text={'Рассчитать'} handleClick={handleClickGetCost}/>
                                            </div>
                                        )
                                    }
                                </div>
                            
                        </div>
                        <div className='calc-info-block2-2 p-0'>
                            { idBank === '1' ?
                                (
                                    <div className="form-group personal-cost ms-2 mt-4">
                                        <div className='calc-discount f-raleway-xs'>{ `- ${discount} %`}</div>
                                        <label className='f-raleway-gr'>Для вас</label>
                                        <div className="policy-cost ps-3 py-1 f-raleway-m-gr">{digitNumber(Math.round((premiumSum + premiumSum2)).toString()) + ' ₽'}</div>
                                        <div className='row mx-0 p-0 mb-0 mt-2'>    
                                            <div className='col-6 m-0 py-0 credit-info-month px-2 f-raleway-xs d-flex align-items-center'>
                                                {`${Math.round(premiumSum/6)}р x 6`}
                                            </div>
                                            <div className='col-6 f-raleway-12 text-nowrap'>
                                                в рассрочку
                                                <span className='position-relative'
                                                    onMouseEnter={() => {
                                                        setShowPromtCredit(true)
                                                    }
                                                    }
                                                    onMouseLeave={() => {
                                                        setShowPromtCredit(false)
                                                    }}
                                                >
                                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M9 15.75C12.7279 15.75 15.75 12.7279 15.75 9C15.75 5.27208 12.7279 2.25 9 2.25C5.27208 2.25 2.25 5.27208 2.25 9C2.25 12.7279 5.27208 15.75 9 15.75Z" stroke="#2CA5EC" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
                                                        <path d="M9 10.6875V10.125C9.44501 10.125 9.88002 9.99304 10.25 9.74581C10.62 9.49857 10.9084 9.14717 11.0787 8.73604C11.249 8.32491 11.2936 7.87251 11.2068 7.43605C11.12 6.99959 10.9057 6.59868 10.591 6.28401C10.2763 5.96934 9.87541 5.75505 9.43895 5.66823C9.0025 5.58142 8.5501 5.62597 8.13896 5.79627C7.72783 5.96657 7.37643 6.25496 7.12919 6.62497C6.88196 6.99498 6.75 7.42999 6.75 7.875" stroke="#2CA5EC" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
                                                        <path d="M9 13.7812C9.46599 13.7812 9.84375 13.4035 9.84375 12.9375C9.84375 12.4715 9.46599 12.0938 9 12.0938C8.53401 12.0938 8.15625 12.4715 8.15625 12.9375C8.15625 13.4035 8.53401 13.7812 9 13.7812Z" fill="#2CA5EC"/>
                                                    </svg>
                                                    {showPromtCredit ? <div className='font-raleway-700 fs-12 promt-credit text-wrap'>{promtCredit}</div>: null}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ):
                                (
                                    <div>
                                        {insuranceLogo === '' ? null : (<img className='logo mt-4' src={'https://www.cherehapa.ru' + insuranceLogo} alt='company_logo'/>)}
                                    </div>
                                )
                            }
                        </div>
                        <div className='calc-info-block2-3  p-0'>
                            <div>
                                <label className='f-raleway-15 mt-3 mb-1'>{!isDoubleInsurance ? insuranceCompany: 'Две компании'}</label>
                                <Button text={idBank === '1' ? 'Оформить онлайн': 'Оформить с менеджером'} handleClick={handleClickToReg}/>
                                <div className="info-wrapper">
                                    <p className="fs f-raleway-12">
                                        Необходимые документы
                                        <span className=' position-relative'
                                            onMouseEnter={() => {
                                                    setShowPromtDoc(true)
                                                }
                                            }
                                            onMouseLeave={() => {
                                                    setShowPromtDoc(false)
                                                }
                                            }
                                            
                                            onClick={() => {
                                                setShowPromtDoc(!showPromtDoc)
                                            }}
                                        >
                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9 15.75C12.7279 15.75 15.75 12.7279 15.75 9C15.75 5.27208 12.7279 2.25 9 2.25C5.27208 2.25 2.25 5.27208 2.25 9C2.25 12.7279 5.27208 15.75 9 15.75Z" stroke="#2CA5EC" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M9 10.6875V10.125C9.44501 10.125 9.88002 9.99304 10.25 9.74581C10.62 9.49857 10.9084 9.14717 11.0787 8.73604C11.249 8.32491 11.2936 7.87251 11.2068 7.43605C11.12 6.99959 10.9057 6.59868 10.591 6.28401C10.2763 5.96934 9.87541 5.75505 9.43895 5.66823C9.0025 5.58142 8.5501 5.62597 8.13896 5.79627C7.72783 5.96657 7.37643 6.25496 7.12919 6.62497C6.88196 6.99498 6.75 7.42999 6.75 7.875" stroke="#2CA5EC" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M9 13.7812C9.46599 13.7812 9.84375 13.4035 9.84375 12.9375C9.84375 12.4715 9.46599 12.0938 9 12.0938C8.53401 12.0938 8.15625 12.4715 8.15625 12.9375C8.15625 13.4035 8.53401 13.7812 9 13.7812Z" fill="#2CA5EC"/>
                                            </svg>
                                            {showPromtDoc ? (
                                                <div className='promt-doc text-nowrap'>
                                                    <div>Паспортные данные</div>
                                                    <div>Номер ипотечного договора</div>
                                                    <div>Сумма остатка долга</div>
                                                    <div>Информация об объекте недвижимости</div>
                                                </div>
                                                ): 
                                            null}

                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>


                    {idBank === '1' ?
                    (
                        <>
                            <div className="check-price-wrapper m-2">
                                <div className="row">
                                    <div className="me-3 check-price-block1">
                                        <ButtonLight text={'Проверить цену'} handleClick={handleTestPrice} isLoad={isLoad}/>
                                    </div>


                                    <div className="d-flex align-items-start flex-column check-price-block2">
                                        <div className="font-raleway-700">Гарантия цены</div>
                                        <div className="text-start f-raleway-x-mini">Мы уверены в цене. Проверьте цены других компаний</div>
                                    </div>

                                    {isDoubleInsurance ? 
                                    <DoubleInsurance 
                                        insurance_info1={'Имущество: ' + insuranceCompany + ' ' + Math.round(premiumSum)}
                                        insurance_info2={'Жизнь: ' + insuranceCompany2 + ' ' + Math.round(premiumSum2)}
                                    />: null}
                                </div>
                            </div>
                            
                            <div className='row m-2 mt-3'>
                                {renderedListInsurance}
                            </div>
                        </>
                    ): null}
                </div>
            </div>
        </>
    )
}