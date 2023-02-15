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
import { setIsManagerCost, setIdBank, setTypeObject, setInsuranceCompany } from './calcSlice';
import { list_banks, list_banks1, TYPES_OBJECT_ABSOLUTE } from '../../static/Const/vars';
import { getParseData, getParseDataLife, getParseDataLifeAndProperty, preCalc, preCalcLife, testPrint } from './calcapi';

import { selectLifeOption, selectPremiumSum, selectPropertyOption, setLifeOption, setPropertyOption, setPremiumSum, selectToken, selectCookie, setPremiumSum2, selectPremiumSum2, selectMortgageBalance, setMortgageBalance } from '../Home/homeSlice';
import { CreditInfo6, DoubleInsurance, DropDown, RangeInput } from './calcElements';
import { selectBirthday, setBirthday } from '../RegPolice/regpoliceSlice';
import { Calendar } from './calendar';
import { Calendar1 } from './calendar1';

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
    const birthday = useSelector(selectBirthday)
    const mortgageBalance = useSelector(selectMortgageBalance)
    const setShowFormManager = props.setShowFormManager
    const [listInsurance, setListInsurance] = useState([])
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
        const pars = {idBank: par.length === 1 ? par[0]: idBank, mortgageBalance: mortgageBalance}
        getParseData(pars, function (data) {
                setIsLoad(false)
                let premium = premiumSum
                if (par.length === 1) {
                    premium = par[0]
                }
                if (idBank !== '1' && idBank !== '2') {
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
            mortgageBalance: mortgageBalance,
            gender_par: gender_par,
            birthday: birthday.toLocaleDateString().split('.').reverse().join('-'),
        }
        getParseDataLife (pars, function(data)  {
                console.log(data)
                let premium = premiumSum
                console.log(premium)
                if (par.length === 1) {
                    premium = par[0]
                }
                if (idBank !== '1' && idBank !== '2') {
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
            mortgageBalance: mortgageBalance,
            gender_par: gender_par,
            birthday: birthday.toLocaleDateString().split('.').reverse().join('-'),
        }
        getParseDataLifeAndProperty (pars, function(data) {
                console.log('getParseDataLifeAndProperty', data)
                let premium = premiumSum
                console.log(premium)
                if (par.length === 1) {
                    premium = par[0]
                }
                if (idBank !== '1' && idBank !== '2') {
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
        dispatch(setPremiumSum(0))
        dispatch(setPremiumSum2(0))
        if (idBank === '1' || idBank === '2') {
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

    const handleChangePropertyOption = () => {
        dispatch(setPremiumSum(0))
        dispatch(setPremiumSum2(0))
        if (idBank === '1' || idBank === '2') {
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
        dispatch(setPremiumSum(0))
        dispatch(setPremiumSum2(0))
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

    const handleGetCostPolicyLifeAndProperty = () => {
        setListInsurance([])
        preCalcLife({
            cookie: cookie,
            token: token,
            limit_sum: mortgageBalance,
            sex: gender === '1' ? 'М': 'Ж',
            birthday: birthday.toISOString().slice(0, -5),
            id_bank: idBank
        }, (data) => {
            let premium_life = parseFloat(data.res.premium)
            let company_life = data.res.company
            console.log('company_life', company_life)
            preCalc({token: token, cookie: cookie, limit_sum: mortgageBalance, id_bank: idBank}, (data) => {
                console.log(data)
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

    const handleGetCostPolicyLife = () => {
        setListInsurance([])
        dispatch(setIsDoubleInsurance(false))
        dispatch(setPremiumSum2(0))
        dispatch(setInsuranceCompany2(''))
        preCalcLife({
            cookie: cookie,
            token: token,
            limit_sum: mortgageBalance,
            sex: gender === '1' ? 'М': 'Ж',
            birthday: birthday.toISOString().slice(0, -5),
            id_bank: idBank
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
        preCalc({token: token, cookie: cookie, limit_sum: mortgageBalance, id_bank: idBank}, (data) => {
            dispatch(setPremiumSum(parseFloat(data.res.premium)))
            dispatch(setInsuranceCompany(data.res.company))
            props.setIsLoadCost(false)
            props.setShowCostPolicy(true)
        })
    }

    const handleClickGetCost = () => {
        props.setIsLoadCost(true)
        if (idBank === '1' || idBank === '2') {
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
        if (e.target.value !== '1' &&  e.target.value !== '4') {
            setShowFormManager(true)
            let element = document.getElementById('type_obj');
            element.value = '1';
        }
        else {
            dispatch(setTypeObject(e.target.value))
        }
    }

    const handleChangeBank = (e) => {
        console.log('idbank', e.value)
        dispatch(setPremiumSum(0))
        dispatch(setPremiumSum2(0))
        dispatch(setIdBank(e.value))
        props.setShowCostPolicy(false)
        if (e.value !== '1' && e.value !== '2') {
                handleParseData(e.value)
        }
        else {
            props.setIsLoadCost(false)
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

    const handleChangeDate = (date) => {
        props.setShowCostPolicy(false)
        props.setIsLoadCost(true)
        handleChangeBirthDay()
        dispatch(setBirthday(date))
    } 

    const handleSelectTypeProperty = (type) => {
        if (type !== 'Квартира' && type !== 'Апартаменты') {
            setShowFormManager(true)
        }
        else {
            dispatch(setTypeObject(type))
        }
    }

    function handleSetMortgageBalance(value) {
        dispatch(setMortgageBalance(value.replace(/ /g, '')))
        props.setShowCostPolicy(false)
        dispatch(setPremiumSum(0))
        dispatch(setPremiumSum2(0))
    }

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
                        {/* <div onClick={() => {testPrint({cookie: cookie, id: 'A1CB705B-F8DD-4C2A-A0F2-AA7CA6C47984'}, (data) => {
                    console.log('print res', data)
                })}}>
                    test
                </div> */}
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
                                    {/* <input id='inp_mort' type="text" className="form-control bg-lg w-100" value={digitNumber(mortgageBalance.toString())} 
                                        onChange={(e) => {
                                                let inp = document.getElementById('inp_mort')
                                                let pos_cur = inp.selectionStart
                                                // console.log('m', e.target.value.replace(/ /g, '') )
                                                if (!isNaN(e.target.value[e.target.value.length-1])) {
                                                    props.setShowCostPolicy(false)
                                                    dispatch(setMortgageBalance(e.target.value.replace(/ /g, '')))
                                                    dispatch(setPremiumSum(0))
                                                }
                                                inp.setSelectionRange(pos_cur, pos_cur)
                                            }
                                        }
                                    />
                                    <input type="range" className="form-range pos-input-range" max="20000000" 
                                        onChange={(e) => {
                                            dispatch(setMortgageBalance(e.target.value.replace(/ /g, '')))
                                            props.setShowCostPolicy(false)
                                            dispatch(setPremiumSum(0))
                                        }}
                                    /> */}
                                    <RangeInput setValue={handleSetMortgageBalance} value={mortgageBalance} max={'50000000'}/>
                                </div>
                            </div>
                        </div>
                        <div className="calc-info-block-33 p-0">
                            <div className="form-group d-flex align-items-start flex-column font-raleway-700">
                                <label className='text-nowrap'>Тип недвижимости</label>
                                <div className="w-100 mt-1">
                                    {/* <select id='type_obj'  value={typeObject} className="form-select form-select bg-lg" onChange={handleChangeTypeObject}>
                                        <option value="1">Квартира <span>&#10004;</span></option>
                                        <option value="2">Комната</option>
                                        <option value="3">Частный дом</option>
                                        <option value="4">Апартаменты <span>&#10004;</span></option>
                                        <option value="5">Таунхаус</option>
                                        <option value="6">Коммерческая</option>
                                    </select> */}
                                    <DropDown listItem={TYPES_OBJECT_ABSOLUTE} handleSelectItem={handleSelectTypeProperty} value={typeObject}/>
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
                            
                            <div className={lifeOption ? 'container-ife-params': 'hidde-life-params'}>
                                <div className="row">
                                    <div className="col-6">
                                        <label className='font-raleway-700 text-nowrap'>Дата рождения</label>
                                        <Calendar handleChangeDate={handleChangeDate} startDate={birthday}/>
                                    </div>

                                    <div className="col-6">
                                        <label className='font-raleway-700'>Пол</label>
                                        <select className="form-select gender bg-lg f-s" value={gender} onChange={handleChangeGender}>
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
                            { idBank === '1' || idBank === '2' ?
                                (
                                    <div className="form-group personal-cost ms-2 mt-4">
                                        <div className='calc-discount f-raleway-xs'>{ `- ${discount} %`}</div>
                                        <label className='f-raleway-gr'>Для вас</label>
                                        <div className="policy-cost ps-3 py-1 f-raleway-m-gr">{digitNumber(Math.round((premiumSum + premiumSum2)).toString()) + ' ₽'}</div>
                                        <CreditInfo6
                                            premiumSum={premiumSum}
                                            setShowPromtCredit={setShowPromtCredit}
                                            showPromtCredit={showPromtCredit}
                                            promtCredit={promtCredit}
                                        />
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
                                <Button text={idBank === '1' || idBank === '2' ? 'Оформить онлайн': 'Оформить с менеджером'} handleClick={handleClickToReg}/>
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


                    {idBank === '1' || idBank === '2'?
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