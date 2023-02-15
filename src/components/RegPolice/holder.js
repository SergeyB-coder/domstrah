import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import { AddressSuggestions } from 'react-dadata';
import { useSelector, useDispatch } from 'react-redux';
import './style.css'
import { 
    selectFirstname, 
    selectLastname, 
    selectParentname,
    selectSex, 
    selectBirthday, selectAddres_holder_reg, selectDiv_code, selectIssue_by, selectIssue_date, selectSeries_number_doc, selectShare, setShare, selectWork_Organization, setWork_Organization, selectWeight, setWeight, selectHeight, setHeight } from './regpoliceSlice';
import {
    
    setFirstname, 
    setLastname, 
    setParentname, setAddres_holder_reg, setBirthday, setDiv_code, setIssue_by, setIssue_date, setSeries_number_doc, setSex } from './regpoliceSlice';
import { selectLifeOption } from '../Home/homeSlice';
import { DRINK, POSITION, PRESSURE, PRESSURE_BOTTOM, PROFESSION, SMOKING, URL } from '../../static/Const/vars';
import { useNavigate } from 'react-router-dom';
import { selectInsuranceCompany, selectInsuranceCompany2 } from '../Calc/calcSlice';
import { AnswerInfo, RangeInput } from '../Calc/calcElements';
import Select from 'react-select'
import { Calendar } from '../Calc/calendar'

export function Holder(props) {
    const step = props.step
    const setStep = props.setStep
    const dispatch = useDispatch();
    const firstname = useSelector(selectFirstname)
    const lastname = useSelector(selectLastname)
    const parentname = useSelector(selectParentname)
    const birthday = useSelector(selectBirthday)
    const addres_holder_reg = useSelector(selectAddres_holder_reg)
    const series_number_doc = useSelector(selectSeries_number_doc)
    const issue_date = useSelector(selectIssue_date)
    const div_code = useSelector(selectDiv_code)
    const issue_by = useSelector(selectIssue_by)
    const lifeOption = useSelector(selectLifeOption)
    const work_organization = useSelector(selectWork_Organization)
    const weight = useSelector(selectWeight)
    const height = useSelector(selectHeight)

    const insuranceCompany = useSelector(selectInsuranceCompany)
    const insuranceCompany2 = useSelector(selectInsuranceCompany2)
    const share = useSelector(selectShare)

    const handleNext=props.handleNext
    const handlePrev=props.handlePrev
    const checkTermsUser=props.checkTermsUser
    const handleChangeTermsUser=props.handleChangeTermsUser
    
    const [showLastNameError, setShowLastNameError] = useState(false)
    const [showFirstNameError, setShowFirstNameError] = useState(false)
    const [showParentNameError, setShowParentNameError] = useState(false)
    const [showPromtLife, setShowPromtLife] = useState(false)
    const [showIssueByError, setShowIssueByError] = useState(false)
    const [showPromtPressure, setShowPromtPressure] = useState(false)
    const [showPromtSmoke, setShowPromtSmoke] = useState(false)
    const [showPromtDrink, setShowPromtDrink] = useState(false)
    const [showPromtWorkOrganization, setShowPromtWorkOrganization] = useState(false)
    const [showPromtPosition, setShowPromtPosition] = useState(false)
    
    const promtPressure = 'Нормальное давление для здорового взрослого человека - 120/80'
    const promtSmoke = 'Под "Курю" понимается курение 20 и более сигарет в день (либо 3 и более сигар)'
    const promtDrink = 'Под "Употребляю" понимается употребление 1 литра и более вина, либо 2 литров и более пива, либо 100 грам и более крепких напитков в неделю'
    const promtWorkOrganization = 'Например ООО "Ромашка"'
    const promtPosition = 'Например инженер-строитель'

    const handleChangeDivCode = (e) => {
        let div_code = e.target.value
        if (div_code.length > 3) {
            const part1 = div_code.slice(0, 3)
            const part2 = div_code.slice(4)
            if (part2[0] !== ' ' && div_code.length < 8) {
                if (!isNaN(part2)) {
                    dispatch(setDiv_code(part1 + '-' + part2))
                }
            }
        } 
        else {
            if (!isNaN(div_code)) {
                dispatch(setDiv_code(div_code.trim()))
            }
        }
    }

    const handleChangeSeriesNumberDoc = (e) => {
        let series_number = e.target.value
        if (series_number.length > 4) {
            const series = series_number.slice(0, 4)
            const number = series_number.slice(5)
            if (number[0] !== ' ' && series_number.length < 12) {
                if (!isNaN(number)) {
                    dispatch(setSeries_number_doc(series + ' ' + number))
                }
            }
        } 
        else {
            if (!isNaN(series_number)) {
                dispatch(setSeries_number_doc(series_number.trim()))
            }
        }
    }

    const handleChangeLastName = (e) => {
        const el_lastname = document.getElementById('lastname')
        if (el_lastname.validity.patternMismatch) {
            setShowLastNameError(true)
        }
        else {
            setShowLastNameError(false)
        }
        dispatch(setLastname(e.target.value))
    }
    
    const handleChangeFirstName = (e) => {
        const el_firstname = document.getElementById('firstname')
        if (el_firstname.validity.patternMismatch) {
            setShowFirstNameError(true)
        }
        else {
            setShowFirstNameError(false)
        }
        dispatch( setFirstname(e.target.value))
    }

    const handleChangeParentName = (e) => {
        const el_parentname = document.getElementById('parentname')
        if (el_parentname.validity.patternMismatch) {
            setShowParentNameError(true)
        }
        else {
            setShowParentNameError(false)
        }
        dispatch(setParentname(e.target.value))
    }

    const handleChangeAddresHolderReg = (e) => {
        dispatch(setAddres_holder_reg(e.value))
    }
    
    const handleChangeWorkOrganization = (e) => {
        dispatch(setWork_Organization(e.target.value))
    }

    const handleChangeWeight = (e) => {
        dispatch(setWeight(e.target.value))
    }

    const handleChangeHeight = (e) => {
        dispatch(setHeight(e.target.value))
    }


    function handleSetShare(value) {
        dispatch(setShare(value))
    }

    const zetta_life_field = 
        <div className='row mt-3'>
            <div className='col-name-3 f-raleway-reg-pol'>
                <label className='text-nowrap'>Профессия</label>
                <Select 
                    options={PROFESSION} 
                    className="inp-holder f-raleway-x-mini m-0 p-0 mt-1" 
                    defaultValue={PROFESSION[3]}
                />
            </div>
            <div className='col-name-3'>
                <label>Место работы<AnswerInfo setShowPromt={setShowPromtWorkOrganization} showPromt={showPromtWorkOrganization} promt={promtWorkOrganization}/></label>
                <input id='parentname' className='form-control inp-holder p-0 m-0 ps-2'  type="text" onChange={handleChangeWorkOrganization} value={work_organization}/>
            </div>
            <div className='col-name-3 f-raleway-reg-pol'>
                <label>Должность<AnswerInfo setShowPromt={setShowPromtPosition} showPromt={showPromtPosition} promt={promtPosition}/></label>
                <Select 
                    options={POSITION} 
                    className="inp-holder f-raleway-x-mini m-0 p-0 mt-1" 
                    defaultValue={POSITION[3]}
                />
            </div>
        </div>

    const zetta_field = (
        <>
            <div className='row mt-3'>
                {/* <div className='col-name-3 f-raleway-reg-pol'>
                    <label>Доля в займе</label>
                    <RangeInput setValue={handleSetShare} value={share} max={'100'}/>
                </div> */}
                <div className='col-name-3 f-raleway-reg-pol'>
                    <label className='text-nowrap'>Артериальное давление<AnswerInfo setShowPromt={setShowPromtPressure} showPromt={showPromtPressure} promt={promtPressure}/></label>
                    <div className='row p-0 m-0 d-flex justify-content-between'>
                        <Select 
                            options={PRESSURE} 
                            className="pressure-up-select f-raleway-x-mini m-0 p-0" 
                            defaultValue={PRESSURE[0]}
                            // isClearable={true}
                            // placeholder={''}
                            // defaultInputValue={list_banks1[2]}
                            // onChange={handleChangeBank}
                        />
                        <Select 
                            options={PRESSURE_BOTTOM} 
                            className="col-weight-1 f-raleway-x-mini m-0 p-0" 
                            defaultValue={PRESSURE_BOTTOM[0]}
                        />
                    </div>
                </div>
                
                <div className='col-name-3 f-raleway-reg-pol'>
                    <label>Курение<AnswerInfo setShowPromt={setShowPromtSmoke} showPromt={showPromtSmoke} promt={promtSmoke}/></label>
                    <Select 
                        options={SMOKING} 
                        className="col-weight-2 f-raleway-x-mini m-0 p-0" 
                        defaultValue={SMOKING[1]}
                    />
                </div>
                <div className='col-drink-3 f-raleway-reg-pol'>
                    <label className='text-nowrap'>Алкоголь<AnswerInfo setShowPromt={setShowPromtDrink} showPromt={showPromtDrink} promt={promtDrink}/></label>
                    <Select 
                        options={DRINK} 
                        className="col-weight-2 f-raleway-x-mini m-0 p-0" 
                        defaultValue={DRINK[0]}
                    />
                </div>
            </div>
            {lifeOption ? zetta_life_field: null}
        </>
    ) 
     
    const handleChangeDate = (date) => {
        // console.log('date', date)
        dispatch(setBirthday(date))
    }

    const step2 = <div>
        {zetta_field}
    </div>

    const step1 = <div>
        <div className='row f-raleway-reg-pol mt-3'>
            <div className='col-name-3'>
                <label>Фамилия</label>
                <input autoComplete='off' id='lastname' className='form-control inp-holder' title='Используйте только кириллицу' pattern="[А-Яа-яЁё ]+" type="text" value={lastname} onChange={handleChangeLastName}/>
                { showLastNameError ? (<div className='error-message'>Используйте кириллицу</div>): null}
            </div>
            <div className='col-name-3 mt-1'>
                <label>Имя</label>
                <input autoComplete='off' id='firstname' className='form-control inp-holder' title='Используйте только кириллицу' pattern="[А-Яа-яЁё ]+" type="text" value={firstname} onChange={handleChangeFirstName}/>
                { showFirstNameError ? (<div className='error-message'>Используйте кириллицу</div>): null}
            </div>
            <div className='col-name-3 mt-1'>
                <label>Отчество</label>
                <input id='parentname' className='form-control inp-holder' title='Используйте только кириллицу' pattern="[А-Яа-яЁё ]+" type="text" value={parentname} onChange={handleChangeParentName}/>
                { showParentNameError ? (<div className='error-message'>Используйте кириллицу</div>): null}
            </div>
            <div className='col-birthday-2 mt-1'>
                <label>Дата рождения</label>
                <Calendar handleChangeDate={handleChangeDate} startDate={birthday}/>
            </div>
            <div className={lifeOption ? 'col-sex-1 mt-1': 'col-sex-1 mt-1 hidde-life-params'}>
                <label>Пол</label>
                <select className="form-select f-s bg-lg h-4-5" onChange={(e) => 
                    {
                        e.target.value === '1' ? dispatch(setSex('М')): dispatch(setSex('Ж'))
                    }}>
                    <option value="1">Муж.</option>
                    <option value="2">Жен.</option>
                </select>
            </div>
        </div>
        
        {/* {insuranceCompany === 'Зетта Страхование' || insuranceCompany2 === 'Зетта Страхование' ? 
            zetta_field:
            null
        } */}

        <div className='row mt-3'>
            <div className={lifeOption ? 'col-grow-2 position-relative f-raleway-reg-pol': 'hidde-life-params col-grow-2 position-relative f-raleway-reg-pol'} 
                onMouseEnter={() => {
                    if (!lifeOption) {
                        setShowPromtLife(true)
                    }
                }} 
                onMouseLeave={() => {setShowPromtLife(false)}}
            >
                <label>Рост</label>
                <input className='form-control inp-holder' type='number' disabled={!lifeOption} onChange={handleChangeHeight} value={height}
                    
                />
                {showPromtLife ? <p className='font-raleway-700 fs-12 promt'>Для страхования жизни включите опцию на предыдущем шаге</p>: null}
            </div>
            <div className={lifeOption ? 'col-weight-1 f-raleway-reg-pol': 'hidde-life-params col-weight-1 f-raleway-reg-pol' }
                onMouseEnter={() => {
                    if (!lifeOption) {
                        setShowPromtLife(true)
                    }
                }} 
                onMouseLeave={() => {setShowPromtLife(false)}}
            >
                <label>Вес</label>
                <input className='form-control inp-holder' type='number' disabled={!lifeOption} value={weight} onChange={handleChangeWeight}/>
            </div>
            <div className='col-doc-3 f-raleway-reg-pol'>
                <label>Документ</label>
                <select className="form-select bg-lg">
                    <option value="1">Паспорт</option>
                </select>
            </div>
            <div className='col-number-2 f-raleway-reg-pol'>
                <label>Серия и номер</label>
                <input className='form-control inp-holder' pattern='^\d{4} \d{6}$' type="text" value={series_number_doc} placeholder='---- ------'
                    onChange={handleChangeSeriesNumberDoc}
                />
            </div>
            <div className='col-issue-date-2 f-raleway-reg-pol'>
                <div className='cont-date'>
                    <label>Дата выдачи</label>
                    <Calendar handleChangeDate={(date) => dispatch(setIssue_date(date))} startDate={issue_date}/>
                </div>
            </div>
            <div className='col-code-2 f-raleway-reg-pol'>
                <label className='text-nowrap'>Код подразделения</label>
                <input className='form-control inp-code' type="text" value={div_code} onChange={handleChangeDivCode} placeholder='--- ---'/>
            </div>
        </div>
        <div className='f-raleway-reg-pol mt-2 issue_by'>
            <label>Кем выдан</label>
            <input id='issue_by' className='form-control inp-holder' pattern="[А-Яа-яЁё0-9-\s]{6,}" type="text" value={issue_by} 
                onChange={(e) => { 
                    const el_issue_by = document.getElementById('issue_by')
                    if (el_issue_by.validity.patternMismatch) {
                        setShowIssueByError(true)
                    }
                    else {
                        setShowIssueByError(false)
                    }
                    dispatch(setIssue_by(e.target.value) )
                }}
            />
            { showIssueByError ? (<div className='error-message'>Не допускаются латинские символы. Длинна не менее 6 символов.</div>): null}
        </div>
        <div className='f-raleway-reg-pol mt-2 address-reg'>
            <label>Адрес регистрации</label>
            <AddressSuggestions defaultQuery={addres_holder_reg} token="93bd729e5209d96326b970b0f8cdd5f0ce2ef6bd" value={addres_holder_reg} onChange={handleChangeAddresHolderReg} />
            {/* <input className='form-control inp-holder' type="text" value={addres_holder_reg} onChange={handleChangeAddresHolderReg}/> */}
        </div>
        <div className="form-check">
            <input className="form-check-input" type="checkbox" checked={checkTermsUser} onChange={handleChangeTermsUser}/>
            <label className="form-check-label fs-12" >
                {'Нажимая кнопку «Далее», я подтверждаю свою дееспособность, принимаю '}   
                <span>
                    <a target="_blank" href='/legal'
                    >
                        Правила страхования
                    </a>
                </span> 
                {' и подтверждаю свое согласие на '}
                <span>
                    <a target="_blank" href={URL + '/static/docs/politic.html'}>
                        обработку персональных данных
                    </a>
                </span> 
                {' в соответствии с Федеральным законом № 152-ФЗ «О персональных данных» от 27.06.2006 г. '}
            </label>
        </div>
    </div>

    return (
        <>



        <div className='container-data m-3 p-3'>

 {/* HEADER */}            
            <div className='f-raleway-reg-pol mt-2'>
                {step === 1 ? 
                    'Данные заемщика (на кого оформляем полис)': 
                    'Страховая компания запрашивает дополнительные данные. Если данные корректны, нажмите далее.'
                }
            </div>
                            
{/* BODY */}

            {step === 1 ? step1: step2}
{/* NAVIGATE BUTTONS */}
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
        </>
    )
}