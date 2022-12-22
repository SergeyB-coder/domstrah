import React, { useState } from 'react';
import Modal from 'react-modal';
import DatePicker from "react-datepicker";
import { setDefaultLocale } from  "react-datepicker";
import 'react-dadata/dist/react-dadata.css';
import { useSelector, useDispatch } from 'react-redux';

import ru from 'date-fns/locale/ru';

import './style.css'
import { sendSberpropertyagree, sendGetPayment, confirmEmail, sendSberLifeAgree, sendCode, sendOrderManager } from './regpoliceapi';
import { Button } from '../Buttons/button';
import { Holder } from './holder';
import {validPhone} from '../../features/funcs'
import { ButtonBuy } from '../Buttons/buttonBuy';
import {
    selectFirstname, 
    selectLastname, 
    selectParentname, 
    selectSex, 
    selectBirthday, selectAddres_holder_reg, selectDiv_code, selectIssue_by, selectIssue_date, selectSeries_number_doc} from './regpoliceSlice'

import {selectIdBank, selectInsuranceCompany, selectInsuranceCompany2, selectTypeObject} from '../Calc/calcSlice'
import { selectCookie, selectLifeOption, selectPremiumSum, selectPremiumSum2, selectPropertyOption, selectToken } from '../Home/homeSlice';
import { TYPES_OBJECT } from '../../static/Const/vars';

setDefaultLocale(ru)

export function RegPolice(props) {
    const dispatch = useDispatch();
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
    const [stepReg, setStepReg] = useState('holder') // holder, doc, obj, buy
    const [agr_credit_number, setAgr_credit_number] = useState('')
    const [agr_credit_date_conc, setAgr_credit_date_conc] = useState(new Date())
    const [dateBegin, setDateBegin] = useState('')
    const [addres_object, setAddres_object] = useState('')
    const [addres_holder_fact, setAddres_holder_fact] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [linkPay, setLinkPay] = useState('')
    const [linkPayE, setLinkPayE] = useState('')
    const [isLoad, setIsLoad] = useState(false)
    const [checkAdressObj, setCheckAdressObj] = useState(false)
    const [checkTermsUser, setCheckTermsUser] = useState(false)
    
    const [check1, setCheck1] = useState(false)
    const [check2, setCheck2] = useState(false)
    const [check3, setCheck3] = useState(false)
    const [check4, setCheck4] = useState(false)
    const [showFormConfirmEmail, setShowFormConfirmEmail] = useState(false)
    const [code, setCode] = useState('')
    const [showData, setShowData] = useState(false)
    const [showLinkBuy, setShowLinkBuy] = useState(false)
    const [yearh_build, setYearh_build] = useState();
    const [showButtonCredit, setShowButtonCredit] = useState(false)
    const [isn, setIsn] = useState('')
    const [isn2, setIsn2] = useState('') // for creditOrder



    const handleGetPayment = (isn) => {
        sendGetPayment({
            isn:isn,
            token: token,
        }, function(data) {
            setLinkPay(data.res.result.data.payment_link)
            setIsLoad(false)
            setShowLinkBuy(true)
        })
    }

    
    const handleGetPaymentE = (isn) => {
        sendGetPayment({
            isn:isn,
            token: token,
        }, function(data) {
            setLinkPayE(data.res.result.data.payment_link)
            setIsLoad(false)
            setShowLinkBuy(true)
        })
    }

    const handleBuy = () => {
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
                    token: token,
                    cookie: cookie,
                    company: insuranceCompany2 === 'Зетта Страхование' ? 'zetta': 'absolute',
                    lastname: lastname,
                    firstname: firstname,
                    parentname: parentname,
                    birthday: birthday,
                    sex: sex,
                    addres_holder_reg: addres_holder_reg,
                    limit_sum: props.mortgageBalance,
                    agr_credit_number: agr_credit_number,
                    agr_credit_date_conc: agr_credit_date_conc.toLocaleDateString().split('.').reverse().join('-'),
                    dateBegin: dateBegin.toLocaleDateString().split('.').reverse().join('-'),
    
                    addres_object: addres_object,
                    yearh_build: yearh_build,
                    issue_date: issue_date,
                    issue_by: issue_by,
                    series_doc: series_number_doc.split(' ')[0],
                    number_doc: series_number_doc.split(' ')[1],
                    email:email,
                    phone: phone,
                    is_credit: 0,
                }
                if (lifeOption) {
                    sendSberLifeAgree(params, function(data) {
                        console.log('sendSberLifeAgree', data)
                        if (data.res.status.code === 'error') {
                            alert(data.res.status.message[0].text)
                            setIsLoad(false)
                        }
                        else {
                            
                            handleGetPayment(data.res.result.data.isn)
                        }
                    })
                }
                if (propertyOption) {
                    sendSberpropertyagree(params, function(data) {
                        if (data.res.status.code === 'error') {
                            alert(data.res.status.message[0].text)
                            setIsLoad(false)
                        }
                        else {
                            
                            handleGetPaymentE(data.res.result.data.isn)
                        }
                    })
                }
            }
        }
    }

    const handleCredit = () => {
        // window.ym(90426649,'reachGoal','kypit_clck')
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
                    token: token,
                    lastname: lastname,
                    firstname: firstname,
                    parentname: parentname,
                    birthday: birthday,
                    sex: sex,
                    addres_holder_reg: addres_holder_reg,
                    limit_sum: props.mortgageBalance,
                    agr_credit_number: agr_credit_number,
                    agr_credit_date_conc: agr_credit_date_conc.toLocaleDateString().split('.').reverse().join('-'),
                    dateBegin: dateBegin.toLocaleDateString().split('.').reverse().join('-'),
    
                    addres_object: addres_object,
    
                    issue_date: issue_date,
                    issue_by: issue_by,
                    series_doc: series_number_doc.split(' ')[0],
                    number_doc: series_number_doc.split(' ')[1],
                    email:email,
                    phone: phone,
                    is_credit: 1,
                }
                if (lifeOption && !propertyOption) {
                    sendSberLifeAgree(params, function(data) {
                        if (data.res.status.code === 'error') {
                            alert(data.res.status.message[0].text)
                            setIsLoad(false)
                        }
                        else {
                            setIsn(data.res.result.data.isn)
                            setShowButtonCredit(true)
                        }
                    })
                }
                else if (propertyOption && !lifeOption) {
                    sendSberpropertyagree(params, function(data) {
                        if (data.res.status.code === 'error') {
                            alert(data.res.status.message[0].text)
                            setIsLoad(false)
                        }
                        else {
                            setIsn(data.res.result.data.isn)
                            setShowButtonCredit(true)
                        }
                    })
                }
                else if (propertyOption && lifeOption) {
                    sendSberpropertyagree(params, function(data) {
                        if (data.res.status.code === 'error') {
                            alert(data.res.status.message[0].text)
                            setIsLoad(false)
                        }
                        else {
                            setIsn(data.res.result.data.isn)
                            sendSberLifeAgree(params, function(data) {
                                if (data.res.status.code === 'error') {
                                    alert(data.res.status.message[0].text)
                                    setIsLoad(false)
                                }
                                else {
                                    setIsn2(data.res.result.data.isn)
                                    setShowButtonCredit(true)
                                }
                            })
                        }
                    })
                }
                else {
                    alert('Не выбран тип страхования')
                }
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
        if (dateBegin <= agr_credit_date_conc) {
            isValid = false
            err += 'Дата начала действия полиса не может совпадать или быть раньше даты заключения договора\n'
        }

        

        if (!isValid) {alert(err)}

        return isValid

    }

    function validForm() {
        let isValid = true
        let err = ''
        const el_lastname = document.getElementById('lastname')
        if (el_lastname.validity.patternMismatch || lastname.length === 0) {
            isValid = false
            err += 'Фамилия содержит только кириллицу\n'
        }

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

        const el_issue_by = document.getElementById('issue_by')

        if (issue_by.length < 6 ) {
            isValid = false
            err += 'Длина текста - Кем выдан - должна быть не меньше 6 символов\n'
            
        }

        if (el_issue_by.validity.patternMismatch) {
            isValid = false
            err += 'Текст в поле - Кем выдан может содержать только кириллицу\n'
        }
        
        if (!isValid) {alert(err)}
        return isValid
    }

    const handleNext = () => {
        if (stepReg === 'holder') {
            window.ym(90426649,'reachGoal','zayemshik')
            // handleDaData()
            const testForm = validForm()
            if (!testForm) {
                alert('Исправьте данные')
            }
            else if (!checkTermsUser) {
                alert('Необходимо принять пользовательское соглашение')
            }
            else {
                setStepReg('doc')
            }
            
        }
        else if (stepReg === 'doc') {
                window.ym(90426649,'reachGoal','dogovor_ok')
                const testFormDoc = validFormDoc()
                if (!testFormDoc) {
                    alert('Исправьте данные')
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
            setStepReg('holder')
        }
        else if (stepReg === 'buy') {
            setStepReg('obj')
        }
        else if (stepReg === 'obj') {
            setStepReg('doc')
        }
        else if (stepReg === 'holder') {
            props.setCalcStep('info')
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



    const handleChangeMortgageBalance = (e) => {
        if (!isNaN(e.target.value)) {
            props.setMortgageBalance(e.target.value)
        }
    }

    const handleChangeYeahrBuild = (e) => {
        if (!isNaN(e.target.value)) {
            setYearh_build(e.target.value)
        }
    }

    const handleChangePhone = (e) => {
            setPhone(validPhone(e.target.value))
    }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }

  
    
    const handleChangeCheckAdressObj = (e) => {
        setCheckAdressObj(!e.target.checked)
        if (e.target.checked) {
            setAddres_object(addres_holder_reg)
        }
    }

    const handleChangeCheck1 = (e) => {
        setCheck1(!check1)
    }

    const handleChangeCheck2 = (e) => {
        setCheck2(!check2)
    }

    const handleChangeCheck3 = (e) => {
        setCheck3(!check3)
    }

    const handleChangeCheck4 = (e) => {
        setCheck4(!check4)
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
            limit_sum: props.mortgageBalance,
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

            <Modal
                isOpen={showLinkBuy}
                // onAfterOpen={afterOpenModal}
                // onRequestClose={closeModal}
                style={customStyles}
            >
                    <div>
                        <h6>Ваш полис сформирован, для оплаты перейдите по ссылке: </h6>
                        <div className="">
                            {linkPay !== '' ? (
                                <a className='link-dark fs-6' href={linkPay} target="_blank" rel='noreferrer'>
                                    {'Ссылка на оплату полиса Жизнь'}
                                </a>
                            ): null}
                        </div>
                        <div className="">
                            {linkPayE !== '' ? (
                                <a className='link-dark fs-6' href={linkPayE} target="_blank" rel='noreferrer'>
                                    {'Ссылка на оплату полиса Имущество'}
                                </a>
                            ): null}
                        </div>
                        <div className='cur-p' onClick={() => {

                            setShowLinkBuy(false)
                        }}>
                            Закрыть
                        </div>
                    </div>
            </Modal>

            {!showLinkBuy && !props.showFormManager? (
                <div className="container-reg">
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
                        />
                    ): null}

                    {stepReg === 'doc' ? (
                        <div className='container-data'>
                            <div className='f-raleway-m'>Ипотечный договор</div>
                            <div className='row'>
                                <div className='col-bank-4'>
                                    <label>Банк-Кредитор</label>
                                    <input className='form-control inp-holder' type="text" placeholder='Сбербанк' disabled={true}/>
                                </div>
                                <div className='col-balance-4'>
                                    <label className='text-nowrap'>Остаток по ипотеке</label>
                                    <input className='form-control inp-holder' type="text" value={props.mortgageBalance} onChange={handleChangeMortgageBalance}/>
                                </div>
                                <div className='col-creditnumber-4'>
                                    <label>Номер кредитного договора</label>
                                    <input className='form-control inp-holder' type="text" value={agr_credit_number} 
                                        onChange={(e) => setAgr_credit_number(e.target.value) }
                                    />
                                </div>
                            </div>

                            <div className='f-raleway-m mt-2'>Полис</div>
                            <div className='row'>
                                <div className='col-datebegin-4'>
                                    <label>Дата начала действия полиса</label>
                                    <DatePicker 
                                        selected={dateBegin} 
                                        onChange={(date) => setDateBegin(date)} 
                                        className='birthday-reg fs ps-2 w-100'
                                        dateFormat="yyyy-MM-dd"
                                    />
                                </div>
                            </div>
                            <div className='row mt-2'>
                                <div className='col-6'>
                                    <button className='btn btn-primary w-100' onClick={handlePrev}>
                                        Назад
                                    </button>
                                </div>
                                <div className='col-6'>
                                    <button className='btn btn-primary w-100' onClick={handleNext}>
                                        Далее
                                    </button>
                                </div>
                            </div>
                        </div>
                    ): null}

                    {stepReg === 'obj' ? (
                        <div className='container-data m-3 p-3'>
                            <div className='f-raleway-l'>Данные о залоговой квартире</div>
                            <div className='row mt-3'>
                                <div className='col-typeestate-4 f-raleway-reg-pol'>
                                    <label>Тип недвижимости</label>
                                    <select className="form-select">
                                        <option value="1">Квартира</option>
                                        <option value="2">Апартаменты</option>
                                    </select>
                                </div>
                                <div className='col-yearbuild-2 f-raleway-reg-pol'>
                                    <label>Год постройки</label>
                                    <input className='form-control inp-holder' type="text" placeholder='ГГГГ' value={yearh_build} onChange={handleChangeYeahrBuild}/>
                                </div>
                                <div className='col-addressobj-6 f-raleway-reg-pol mt-2'>
                                    <label>Адрес объекта недвижимости</label>
                                    <input className='form-control inp-holder' type="text" placeholder='МО Москва..' value={addres_object}
                                        onChange={(e) => {setAddres_object(e.target.value)}}
                                    />
                                </div>
                            </div>

                            <div className='row mt-5'>
                                <div className='col-checkobj-6'>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value={checkAdressObj} onChange={handleChangeCheckAdressObj}/>
                                        <label className="form-check-label" >
                                            Адрес совпадает с адресом регистрации
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" checked={check1} onChange={handleChangeCheck1}/>
                                        <label className="form-check-label" >
                                            Номер квартиры отсутствует
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" checked={check2} onChange={handleChangeCheck2}/>
                                        <label className="form-check-label" >
                                            Здание имеет менее 4 наземных этажей
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" checked={check3} onChange={handleChangeCheck3}/>
                                        <label className="form-check-label" >
                                            Есть деревянные перекрытия или сендвич-панели
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" checked={check4} onChange={handleChangeCheck4}/>
                                        <label className="form-check-label" >
                                            Есть газовое оборудование (плита,котел), источники открытого огня (печь, камин)
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className='row mt-2'>
                                <div className='col-6'>
                                    <button className='btn btn-primary w-100' onClick={handlePrev}>
                                        Назад
                                    </button>
                                </div>
                                <div className='col-6'>
                                    <button className='btn btn-primary w-100' onClick={handleNext}>
                                        Далее
                                    </button>
                                </div>
                            </div>
                        </div>
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
                            <div>Будьте внимательны: на укзанную почту и телефон будет выслан электронный полис</div>
                            <div className='row inp-holder p-0 m-0 rounded mt-2 d-flex align-items-center'>
                                <div className='col-cost-6'>
                                    Стоимость полиса: СК Абсолют "Недвижимость"
                                </div>
                                <div className='col-testdata-6 p-0'>
                                    <Button text='Проверить данные' handleClick={handleShowData}/>
                                </div>
                            </div>
                            { showData ? (<div>
                                <div className=''>
                                    {'ФИО: ' + firstname + ' ' + lastname + ' ' + parentname}
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
                            <div className='mt-2'>
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
                            <div className='row mt-2'>
                                <div className='col-back-6'>
                                    <button className='btn btn-primary w-100' onClick={handlePrev}>
                                        Назад
                                    </button>
                                </div>
                                <div className='col-buy-3'>
                                    {/* <button className='btn btn-primary w-100' onClick={handleBuy}>
                                        Купить
                                    </button> */}
                                    {idBank === '1' ? (
                                            <ButtonBuy text={'Купить'} handleClick={handleBuy} isLoad={isLoad}/>
                                        ):(
                                            <ButtonBuy text={'Отправить менеджеру'} handleClick={handleSendManager}/>
                                        )
                                    }
                                </div>
                                {(premiumSum+premiumSum2) >= 5000 && idBank === '1' ? (
                                    <div className='col-buy-3 '>
                                        {showButtonCredit ? (
                                            <a 
                                                href={propertyOption && lifeOption ? 
                                                    `https://ecom.otpbank.ru/smart-form?tradeID=770107266000002&creditType=2&orderID="${isn}*${isn2}"&goods[0][name]=полис&goods[0][price]="${premiumSum+premiumSum2}"&goods[0][quantity]=1&goods[0][category]=a`:
                                                    `https://ecom.otpbank.ru/smart-form?tradeID=770107266000002&creditType=2&orderID="${isn}"&goods[0][name]=полис&goods[0][price]="${premiumSum}"&goods[0][quantity]=1&goods[0][category]=a`
                                                } 
                                                rel='noreferrer'
                                                className='d-flex align-items-center justify-content-center button-credit' 
                                                target="_blank"
                                            >
                                                    Купить в рассрочку
                                            </a>
                                        ): 
                                        (
                                            <>
                                                <ButtonBuy text={'В рассрочку'} handleClick={handleCredit} isLoad={isLoad}/>
                                            </>
                                        )}
                                    </div>
                                ): null}
                                
                            </div>
                            {linkPay !== '' ? (<a className='link-dark fs-6' href={linkPay} target="_blank">{'Ссылка на оплату'}</a>): null}
                        </div>
                    ): null}

                </div>
            ): null}
        </>
    )
}