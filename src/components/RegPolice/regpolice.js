import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import DatePicker from "react-datepicker";
import { setDefaultLocale } from  "react-datepicker";
import 'react-dadata/dist/react-dadata.css';
import { useSelector, useDispatch } from 'react-redux';

import ru from 'date-fns/locale/ru';

import './style.css'
import { sendSberpropertyagree, sendGetPayment, confirmEmail, sendSberLifeAgree, sendCode, sendOrderManager, finalCreatePolicies } from './regpoliceapi';
import { Button } from '../Buttons/button';
import { Holder } from './holder';
import {validPhone} from '../../features/funcs'
import { ButtonBuy } from '../Buttons/buttonBuy';
import {
    selectFirstname, 
    selectLastname, 
    selectParentname, 
    selectSex, 
    selectBirthday, selectAddres_holder_reg, selectDiv_code, selectIssue_by, selectIssue_date, selectSeries_number_doc, selectDateBegin, setDateBegin, selectAgr_credit_number, selectAddressObject, setAddressObject, selectYeahrBuild, setYeahrBuild, selectDateCredit, setEmail, selectEmail} from './regpoliceSlice'

import {selectIdBank, selectInsuranceCompany, selectInsuranceCompany2, selectTypeObject} from '../Calc/calcSlice'
import { selectCookie, selectLifeOption, selectMortgageBalance, selectPremiumSum, selectPremiumSum2, selectPropertyOption, selectToken, setCookie, setMortgageBalance, setToken } from '../Home/homeSlice';
import { TYPES_OBJECT } from '../../static/Const/vars';
import { AddressSuggestions } from 'react-dadata';
import { useNavigate } from 'react-router-dom';
import { Document } from './document';
import { getTokens } from '../Calc/calcapi';
import { Object } from './object';

setDefaultLocale(ru)

export function RegPolice(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(selectToken)
    const typeObject = useSelector(selectTypeObject)
    const insuranceCompany = useSelector(selectInsuranceCompany)
    const firstname = useSelector(selectFirstname)
    const lastname = useSelector(selectLastname)
    const parentname = useSelector(selectParentname)
    const sex = useSelector(selectSex)
    const birthday = useSelector(selectBirthday)
    const addres_holder_reg = useSelector(selectAddres_holder_reg)
    const series_number_doc = useSelector(selectSeries_number_doc)
    const issue_date = useSelector(selectIssue_date)
    const div_code = useSelector(selectDiv_code)
    const issue_by = useSelector(selectIssue_by)
    const idBank = useSelector(selectIdBank)
    const lifeOption = useSelector(selectLifeOption)
    const propertyOption = useSelector(selectPropertyOption)
    const insuranceCompany2 = useSelector(selectInsuranceCompany2)
    const cookie = useSelector(selectCookie)
    const premiumSum = useSelector(selectPremiumSum)
    const premiumSum2 = useSelector(selectPremiumSum2)
    const mortgageBalance = useSelector(selectMortgageBalance)
    const agr_credit_number = useSelector(selectAgr_credit_number)
    const addres_object = useSelector(selectAddressObject)
    const yearh_build = useSelector(selectYeahrBuild)
    const date_credit = useSelector(selectDateCredit)
    const email = useSelector(selectEmail)

    const [stepReg, setStepReg] = useState('holder') // holder, doc, obj, buy
    const dateBegin = useSelector(selectDateBegin)
    // const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [isLoad, setIsLoad] = useState(false)
    const [step, setStep] = useState(1)
    const [checkTermsUser, setCheckTermsUser] = useState(false)
      
    const [check1, setCheck1] = useState(false)
    const [check2, setCheck2] = useState(false)
    const [check3, setCheck3] = useState(false)
    const [check4, setCheck4] = useState(false)
    const [showFormConfirmEmail, setShowFormConfirmEmail] = useState(false)
    const [code, setCode] = useState('')
    const [showData, setShowData] = useState(false)


    const  handleBuy = async () => {
        const is_two_polices = lifeOption && propertyOption
        window.ym(90426649,'reachGoal','kypit_clck')
        let all_is_check = true
        for (let i=0; i<5; i++) {
            const el = document.getElementById('buy_check' + (i+1).toString())
            if (!el.checked) {
                all_is_check = false
            }
        }
        if (!all_is_check) {
            alert('Поставьте галочки')
        }
        else if (phone === '' || email === '') {
            alert('Введите телефон и email')
        }
        else {
            if (validFormBuy()) {
                setIsLoad(true)
                const params = {
                    id_bank: idBank,
                    token: token,
                    cookie: cookie,
                    is_two_polices: is_two_polices,
                    company1: insuranceCompany === 'Зетта Страхование' ? 'zetta': 'absolute',
                    company2: insuranceCompany2 === 'Зетта Страхование' ? 'zetta': 'absolute',
                    lastname: lastname,
                    firstname: firstname,
                    parentname: parentname,
                    birthday: birthday,
                    sex: sex,
                    addres_holder_reg: addres_holder_reg,
                    limit_sum: mortgageBalance,
                    agr_credit_number: agr_credit_number,
                    agr_credit_date_conc: date_credit?  date_credit.toLocaleDateString().split('.').reverse().join('-'): '',
                    // agr_credit_date_conc: date_credit,
                    dateBegin: dateBegin ? dateBegin.toLocaleDateString().split('.').reverse().join('-'): '',
    
                    addres_object: addres_object,
                    yearh_build: yearh_build,

                    issue_date: issue_date,
                    issue_by: issue_by,
                    series_doc: series_number_doc.split(' ')[0],
                    number_doc: series_number_doc.split(' ')[1],
                    div_code: div_code,

                    email:email,
                    phone: phone,
                    is_credit: 0,
                }
                const {isn, isn2, premium_sum_final, premium_sum_final2, is_success, invalid_token} = await finalCreatePolicies(params, lifeOption, propertyOption, idBank)
                
                setIsLoad(false)
                if (invalid_token) {
                    getTokens(function(data) {
                        dispatch(setToken(data.res.token))
                        dispatch(setCookie(data.res.cookie))
                    })
                    alert('Ошибка сети, попробуйте еще раз')
                }
                if (is_success) navigate(`/pay/${isn}&${isn2}/${premium_sum_final + premium_sum_final2}`, {replace: false})
            }
        }
    }

    const handleCredit = async () => {
        // window.ym(90426649,'reachGoal','kypit_clck')
        const is_two_polices = lifeOption && propertyOption
        let all_is_check = true
        for (let i=0; i<5; i++) {
            const el = document.getElementById('buy_check' + (i+1).toString())
            if (!el.checked) {
                all_is_check = false
            }
        }
        if (!all_is_check) {
            alert('Поставьте галочки')
        }
        else if (phone === '' || email === '') {
            alert('Введите телефон и email')
        }
        else {
            if (validFormBuy()) {
                setIsLoad(true)
                const params = {
                    id_bank: idBank,
                    token: token,
                    cookie: cookie,
                    is_two_polices: is_two_polices,
                    company1: insuranceCompany === 'Зетта Страхование' ? 'zetta': 'absolute',
                    company2: insuranceCompany2 === 'Зетта Страхование' ? 'zetta': 'absolute',
                    lastname: lastname,
                    firstname: firstname,
                    parentname: parentname,
                    birthday: birthday,
                    sex: sex,
                    addres_holder_reg: addres_holder_reg,
                    limit_sum: mortgageBalance,
                    agr_credit_number: agr_credit_number,
                    agr_credit_date_conc: date_credit?  date_credit.toLocaleDateString().split('.').reverse().join('-'): '',
                    // agr_credit_date_conc: date_credit,
                    dateBegin: dateBegin ? dateBegin.toLocaleDateString().split('.').reverse().join('-'): '',
    
                    addres_object: addres_object,
                    yearh_build: yearh_build,

                    issue_date: issue_date,
                    issue_by: issue_by,
                    series_doc: series_number_doc.split(' ')[0],
                    number_doc: series_number_doc.split(' ')[1],
                    div_code: div_code,

                    email:email,
                    phone: phone,
                    is_credit: 0,
                }
                
                const {isn, isn2, premium_sum_final, premium_sum_final2, is_success} = await finalCreatePolicies(params, lifeOption, propertyOption, idBank)
                setIsLoad(false)
                if (is_success) window.open(`https://ecom.otpbank.ru/smart-form?tradeID=770107266000002&creditType=2&orderID="${isn}*${isn2}1234"&goods[0][name]=полис&goods[0][price]=${Math.round((premium_sum_final + premium_sum_final2)*100)/100}&goods[0][quantity]=1&goods[0][category]=a`)
            }
        }
    }

    function validFormBuy() {
        let isValid = true
        let err = ''
        const el_email = document.getElementById('email')
        if (el_email.validity.typeMismatch ) {
            isValid = false
            err += 'Неверный email\n'
        }

        if (!isValid) {
            
            alert(err)
        }
        return isValid
    }

    function validFormDoc() {
        let isValid = true
        let err = ''
        if (dateBegin <= new Date()) {
            isValid = false
            err += 'Дата начала действия полиса не может совпадать или быть раньше даты заключения договора\n'
            dispatch(setDateBegin(''))
        }

        if (agr_credit_number.trim() === '') {
            isValid = false
            err += 'Номер договора - обязательное поле\n'
        }

        

        if (!isValid) {alert(err)}

        return isValid

    }

    function validForm() {
        let isValid = true
        let err = ''
        // const el_lastname = document.getElementById('lastname')
        // if (el_lastname.validity.patternMismatch || lastname.length === 0) {
        //     isValid = false
        //     err += 'Фамилия содержит только кириллицу\n'
        // }

        if (addres_holder_reg.length === 0) {
            isValid = false
            err += 'Необходимо выбрать адрес из списка\n'
        }
        // if (firstname.validity.patternMismatch) {
        //     isValid = false
        // }

        // if (parentname.validity.patternMismatch) {
        //     isValid = false
        // }

        if (series_number_doc.split(' ')[0].length !== 4 || series_number_doc.split(' ')[1].length !==6) {
            isValid = false
            err += 'Серия номер паспорта имеет формат: XXXX XXXXXX\n'
        }

        let dateBirthday14 = new Date()
        dateBirthday14.setFullYear(birthday.getFullYear() + 14)
        if (dateBirthday14 > issue_date) {
            isValid = false
            err += 'Дата выдачи не может быть раньше даты исполнения 14 лет\n'
        }

        // const el_issue_by = document.getElementById('issue_by')

        if (issue_by.length < 6 ) {
            isValid = false
            err += 'Длина текста - Кем выдан - должна быть не меньше 6 символов\n'
            
        }

        // if (el_issue_by.validity.patternMismatch) {
        //     isValid = false
        //     err += 'Текст в поле - Кем выдан может содержать только кириллицу\n'
        // }
        
        if (!isValid) {alert(err)}
        return isValid
    }

    const handleNext = () => {
        if (stepReg === 'holder') {
            if (step === 1) {
                window.ym(90426649,'reachGoal','zayemshik')
                const testForm = validForm()
                if (!testForm) {
                }
                else if (!checkTermsUser) {
                    alert('Необходимо принять пользовательское соглашение')
                }
                else {
                    if (insuranceCompany === 'Зетта Страхование' || insuranceCompany2 === 'Зетта Страхование') {
                        setStep(2)
                    }
                    else {
                        setStepReg('doc')
                    }                    
                }
            }
            else {
                setStepReg('doc')
            }
            
            
        }
        else if (stepReg === 'doc') {
                window.ym(90426649,'reachGoal','dogovor_ok')
                const testFormDoc = validFormDoc()
                if (!testFormDoc) {
                    // alert('Исправьте данные')
                }
                else {
                    setStepReg('obj')
                }         
        }
        else if (stepReg === 'obj') {
            window.ym(90426649,'reachGoal','obyekt_ok')
            if (check1 || check2 || check3 || check4) {
                props.setShowFormManager(true)

            }
            else setStepReg('buy')
        }        
    }

    const handlePrev = () => {
        if (stepReg === 'doc') {
            console.log(insuranceCompany, insuranceCompany2)
            if (insuranceCompany === 'Зетта Страхование' || insuranceCompany2 === 'Зетта Страхование') {
                setStep(2)
            }
            else {
                setStep(1)
            }
            setStepReg('holder')
        }
        else if (stepReg === 'buy') {
            setStepReg('obj')
        }
        else if (stepReg === 'obj') {
            setStepReg('doc')
        }
        else if (stepReg === 'holder') {
            if (step === 2) {
                setStep(1)
            }
            else {
                props.setCalcStep('info')
            }
            
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
            zIndex: 10,
          },
        stepinfoHolder: {
            background: stepReg === 'holder' ? '#24a200': '#fafafa',
            color: stepReg === 'holder' ? '#fff': '#2CA5EC',
            borderRadius: '15px',
            width: 'fit-content',
        },
        stepinfoDoc: {
            background: stepReg === 'doc' ? '#24a200': '#fafafa',
            color: stepReg === 'doc' ? '#fff': '#2CA5EC',
            borderRadius: '15px',
            width: 'fit-content',
        },
        stepinfoObj: {
            background: stepReg === 'obj' ? '#24a200': '#fafafa',
            color: stepReg === 'obj' ? '#fff': '#2CA5EC',
            borderRadius: '15px',
            width: 'fit-content',
        },
        stepinfoBuy: {
            background: stepReg === 'buy' ? '#24a200': '#fafafa',
            color: stepReg === 'buy' ? '#fff': '#2CA5EC',
            borderRadius: '15px',
            width: 'fit-content',
        },
    };

    const handleChangeYeahrBuild = (e) => {
        if (!isNaN(e.target.value)) {
            dispatch(setYeahrBuild(e.target.value))
        }
    }

    const handleChangePhone = (e) => {
            setPhone(validPhone(e.target.value))
    }

    const handleChangeEmail = (e) => {
        dispatch(setEmail(e.target.value))
    }

    const handleChangeTermsUser = (e) => {
        setCheckTermsUser(!checkTermsUser)
    }

    const handleClickConfirmEmail = () => {
        confirmEmail({email: email}, function(data) {
            if (data.res) {
                setShowFormConfirmEmail(true)
            }
        })
    }

    const handleClickCode = () => {
        sendCode({email:email, code: code}, function(data) {
            if (data.res) {
                alert('Почта верна')
                setShowFormConfirmEmail(false)
            }
            else {
                alert('error')
                setShowFormConfirmEmail(false)
            }
        })
    }

    const handleShowData = () => {
        setShowData(!showData)
    }

    

    const handleSendManager = () => {
        const params = {
            lastname: lastname,
            firstname: firstname,
            parentname: parentname,
            birthday: birthday,
            sex: sex,
            addres_holder_reg: addres_holder_reg,
            limit_sum: mortgageBalance,
            insurance_company: insuranceCompany,
            addres_object: addres_object,
            type_object: TYPES_OBJECT[typeObject],
            issue_date: issue_date,
            issue_by: issue_by,
            series_doc: series_number_doc.split(' ')[0],
            number_doc: series_number_doc.split(' ')[1],
            email:email,
            phone: phone,
        }
        sendOrderManager(params, function(data) {
            console.log(data)
            alert('Заявка отправлена')
        })
    }

    return (
        <>
            <Modal
                isOpen={false}
                // onAfterOpen={afterOpenModal}
                // onRequestClose={closeModal}
                style={customStyles}
            >
                    <div className='front'>
                        <h6>Введите полученный на адрес электронной почты код</h6>
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Код" value={code} onChange={(e) => {setCode(e.target.value)}}/>
                            <span className="input-group-text" onClick={handleClickCode}>
                                Ok
                            </span>
                        </div>
                    </div>
            </Modal>

            {!props.showFormManager? (
                <div className="container-reg">
                    <div className='button-back-mobile p-0 ms-2'>
                        <svg onClick={handlePrev} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#24a200" className="bi bi-arrow-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                        </svg>
                    </div>

                    <div className='f-raleway-mini ms-3 mt-3'>Оформление полиса</div>

                    <div className='row mt-2'>
                        <div className={'col-doc-title-3' + (stepReg !== 'holder' ? ' hide-mobile': '')}>
                            <div className='d-flex justify-content-center px-3 ms-3' style={customStyles.stepinfoHolder}>
                                Заемщик
                            </div>
                        </div>
                        <div className={'col-doc-title-3 ' + (stepReg !== 'doc' ? ' hide-mobile': '')}>
                            <div className='d-flex justify-content-center px-3' style={customStyles.stepinfoDoc}>
                                Ипотечный договор
                            </div>
                        </div>
                        <div className={'col-doc-title-3 ms-3' + (stepReg !== 'obj' ? ' hide-mobile': '')}>
                            <div className='d-flex justify-content-center px-3' style={customStyles.stepinfoObj}>
                                Объект
                            </div>
                        </div>
                        <div className={'col-doc-title-3 ms-3' + (stepReg !== 'buy' ? ' hide-mobile': '')}>
                            <div className='d-flex justify-content-center px-3' style={customStyles.stepinfoBuy}>
                                Покупка
                            </div>
                        </div>
                    </div>

                    {stepReg === 'holder' ? (
                        <Holder
                            handleNext={handleNext}
                            handlePrev={handlePrev}
                            checkTermsUser={checkTermsUser}
                            handleChangeTermsUser={handleChangeTermsUser}
                            step={step}
                            setStep={setStep}
                        />
                    ): null}

                    {stepReg === 'doc' ? (
                        <Document handleNext={handleNext} handlePrev={handlePrev}/>
                    ): null}

                    {stepReg === 'obj' ? (
                        <Object handleNext={handleNext} handlePrev={handlePrev}
                            check1={check1} check2={check2} check3={check3} check4={check4}
                            setCheck1={setCheck1} setCheck2={setCheck2} setCheck3={setCheck3} setCheck4={setCheck4}
                        />
                    ): null}

                    {stepReg === 'buy' ? (
                        <div className='container-data m-3 p-3'>
                            Контактная информация
                            <div className='row'>
                                <div className='col-email-6'>
                                    <label>Адрес электронной почты</label>
                                    
                                    <div className="input-group">
                                        <input id='email' className='form-control inp-holder' type="email" placeholder='ivan@mail.ru' value={email}
                                            onChange={handleChangeEmail}
                                        />
                                        <Button text={'Подтвердить'} handleClick={handleClickConfirmEmail}/>
                                            
                                    </div>
                                </div>
                                {showFormConfirmEmail ? (
                                    <>
                                        <div className='front'>
                                            <h6>Введите полученный на адрес электронной почты код</h6>
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Код" value={code} onChange={(e) => {setCode(e.target.value)}}/>
                                                <span className="input-group-text" onClick={handleClickCode}>
                                                    Ok
                                                </span>
                                            </div>
                                        </div>
                                    </>
                                ):null}
                                <div className='col-phone-6 mt-2'>
                                    <label>Мобильный телефон</label>
                                    <input className='form-control inp-holder' type="text" placeholder='+7(___)___ __ __' value={phone} 
                                        onChange={handleChangePhone}
                                    />
                                </div>
                            </div>
                            <div>Будьте внимательны: на указанную почту и телефон будет выслан электронный полис</div>
                            <div className='row inp-holder p-0 m-0 rounded mt-2 d-flex align-items-center'>
                                <div className='col-cost-6'>
                                    {`Стоимость полиса: ${insuranceCompany}  ${insuranceCompany2}` }
                                </div>
                                <div className='col-testdata-6 p-0'>
                                    <Button text='Проверить данные' handleClick={handleShowData}/>
                                </div>
                            </div>

                            <div className='block'></div>
                            
                            { showData ? (
                            <div>
                                <div className=''>
                                    {'ФИО: ' + lastname + ' ' + firstname + ' ' + parentname}
                                </div>
                                <div className=''>
                                    {'Адрес: ' + addres_holder_reg }
                                </div>
                                <div className=''>
                                    {'Паспорт: ' + series_number_doc }
                                </div>
                                <div className=''>
                                    {'Адрес объекта: ' + addres_object }
                                </div>
                            </div>): null}
                            
                            <div className='mt-5'>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" checked id={'buy_check1'} onChange={()=>{}}/>
                                    <label className="form-check-label fs-10" >
                                        Подтверждаю, что в объекте страхования недвижимого имущества нет неузаконенных перепланировок
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id={'buy_check2'}/>
                                    <label className="form-check-label fs-10" >
                                        Дом не признан аварийным, подлежащим отселению, не находится в зоне стихийного бедствия.
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id={'buy_check3'}/>
                                    <label className="form-check-label fs-10" >
                                        Подтверждаю, что все положения и оговорки настоящего заявления-декларации мне понятны, их содержание и смысл мне ясны и я согласен с ними. Состояние моего здоровья на момент заключения договора страхования соответствует требованиям настоящего заявления-декларации
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id={'buy_check4'}/>
                                    <label className="form-check-label fs-10" >
                                        Подтверждаю полноту и достоверность предоставленных данных в договоре страхования
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value=""  checked id={'buy_check5'} onChange={() => {}}/>
                                    <label className="form-check-label fs-10" >
                                        {'Принимаю '} 
                                        <a target='_blank' href='https://xn--80aafgiryleculn8b.xn--p1ai/wp-content/uploads/2022/08/%D0%9F%D1%80%D0%B0%D0%B2%D0%B8%D0%BB%D0%B0-%D1%81%D1%82%D1%80%D0%B0%D1%85%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F-%D0%98%D0%BF%D0%BE%D1%82%D0%B5%D0%BA%D0%B0-1.pdf'>
                                            правила страхования
                                        </a>
                                    </label>
                                </div>
                            </div>
                            <div className='row mt-2 d-flex align-items-end'>
                                <div className='col-back-6'>
                                    <button className='btn btn-primary w-100' onClick={handlePrev}>
                                        Назад
                                    </button>
                                </div>
                                <div className='col-buy-3'>
                                    <div className='f-raleway-xs-green col-buy-3-premium'>{Math.round(premiumSum+premiumSum2)} руб</div>
                                    {idBank === '1' || idBank === '2' ? (
                                            <ButtonBuy text={'Купить'} handleClick={handleBuy} isLoad={isLoad}/>
                                        ):(
                                            <ButtonBuy text={'Отправить менеджеру'} handleClick={handleSendManager}/>
                                        )
                                    }
                                </div>
                                {(premiumSum+premiumSum2) >= 5000 && (idBank === '1' || idBank === '2') ? (
                                    
                                    <div className='col-buy-3 '>
                                        <div className='my-1 py-0 credit-info-month px-2 f-raleway-xs d-flex align-items-center'>
                                            {`${Math.round((premiumSum+premiumSum2)/6)}р x 6`}
                                        </div>
                                        
                                        <ButtonBuy text={'В рассрочку'} handleClick={handleCredit} isLoad={isLoad}/>
                                        
                                    </div>
                                ): null}
                                
                                {/* <div onClick={() => {
                                    fetch('https://b2b.zettains.ru/Companies/Zurich/Mortgage/printapi.aspx?PolicyID=8A652062-912A-4548-8E51-808B5D49A3CE&ViewID=54109a53-0dd5-43bd-9093-34740cca0986', {
                                        method: 'POST',
                                        headers: {
                                            'Accept': 'application/pdf',
                                            'Content-Type': 'application/pdf'
                                        },
                                        //   mode: 'no-cors',
                                        body: JSON.stringify({
                                            method: "GET",
                                            headers: {
                                                "Accept": "application/pdf",
                                                "Cookie": cookie,
                                            },
                                        })
                                        })
                                        // .then((response) => response.json())
                                        .then((data) => {
                                            console.log(data)
                                    });
                                }}>Test</div> */}
                            </div>
                            {/* {linkPay !== '' ? (<a className='link-dark fs-6' href={linkPay} target="_blank">{'Ссылка на оплату'}</a>): null} */}
                        </div>
                    ): null}

                </div>
            ): null}
        </>
    )
}