import { useState } from "react";
import { AddressSuggestions } from "react-dadata";
import { useSelector, useDispatch } from "react-redux";
import { LEVELS, ROOMS } from "../../static/Const/vars";
import { AnswerInfo } from "../Calc/calcElements";
import { selectInsuranceCompany, selectInsuranceCompany2 } from "../Calc/calcSlice";
import { selectAddressObject, selectAddres_holder_reg, selectBirthday, selectYeahrBuild, setAddressObject, setYeahrBuild } from "./regpoliceSlice";

export function Object(props) {
    const handlePrev = props.handlePrev
    const handleNext = props.handleNext
    const check1 = props.check1
    const check2 = props.check2
    const check3 = props.check3
    const check4 = props.check4
    const setCheck1 = props.setCheck1
    const setCheck2 = props.setCheck2
    const setCheck3 = props.setCheck3
    const setCheck4 = props.setCheck4
    const dispatch = useDispatch()
    const address_object = useSelector(selectAddressObject)
    const yearh_build = useSelector(selectYeahrBuild)
    const insuranceCompany = useSelector(selectInsuranceCompany)
    const insuranceCompany2 = useSelector(selectInsuranceCompany2)
    const addres_holder_reg = useSelector(selectAddres_holder_reg)

    const [checkAdressObj, setCheckAdressObj] = useState(false)

    const handleChangeYeahrBuild = (e) => {
        if (!isNaN(e.target.value)) {
            dispatch(setYeahrBuild(e.target.value))
        }
    }

    const handleChangeAddressObject = (e) => {
        dispatch(setAddressObject(e.value))
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

    const handleChangeCheckAdressObj = (e) => {
        if (!checkAdressObj) {
            dispatch(setAddressObject(addres_holder_reg))
        }
        setCheckAdressObj(!checkAdressObj)
    }

    return (
        <>
            <div className='container-data m-3 p-3'>
                <div className='f-raleway-l'>Данные о залоговой квартире</div>
                <div className='row mt-3'>
                    <div className='col-typeestate-4 f-raleway-reg-pol'>
                        <label className="text-nowrap">Тип недвижимости</label>
                        <select className="form-select">
                            <option value="1">Квартира</option>
                            <option value="2">Апартаменты</option>
                        </select>
                    </div>
                    <div className='col-yearbuild-2 f-raleway-reg-pol'>
                        <label>Год постройки</label>
                        <input className='form-control inp-object' type="text" placeholder='ГГГГ' value={yearh_build} onChange={handleChangeYeahrBuild}/>
                    </div>
                    <div className='col-addressobj-6 f-raleway-reg-pol m-m-1'>
                        <label>Адрес объекта недвижимости</label>
                        {checkAdressObj ? 
                        <input className='form-control inp-holder' type="text"  value={address_object}
                            onChange={(e) => {
                                setCheckAdressObj(false)
                                dispatch (setAddressObject(e.target.value))
                            }}
                        />:
                        <AddressSuggestions 
                            defaultQuery={address_object} 
                            token="93bd729e5209d96326b970b0f8cdd5f0ce2ef6bd" 
                            value={address_object} 
                            onChange={handleChangeAddressObject} 
                        />}
                    </div>
                </div>
                {insuranceCompany === 'Зетта Страхование' || insuranceCompany2 === 'Зетта Страхование' ? 
                <div className='row mt-3'>
                    <div className='col-zetta-1 f-raleway-reg-pol'>
                        <label>Общая площадь</label>
                        <input className='form-control inp-object' type="text"/>
                    </div>
                    <div className='col-zetta-1 f-raleway-reg-pol '>
                        <label>Этажность дома</label>
                        <select className="form-select">
                            {LEVELS.map((level) => {
                                return (
                                    <option value={level}>{level}</option>
                                )
                            })}
                            <option value="1">1</option>
                            <option value="2">2</option>
                        </select>
                    </div>
                    <div className='col-zetta-1 f-raleway-reg-pol m-m-1'>
                        <label>Этаж квартиры</label>
                        <select className="form-select">
                            {LEVELS.map((level) => {
                                return (
                                    <option value={level}>{level}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className='col-zetta-1 f-raleway-reg-pol m-m-1'>
                        <label className="text-nowrap">Количество комнат</label>
                        <select className="form-select">
                            {ROOMS.map((level) => {
                                return (
                                    <option value={level}>{level}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className='col-zetta-1 f-raleway-reg-pol m-m-1 '>
                        <label className="text-nowrap">Материал постройки<AnswerInfo/></label>
                        <select className="form-select">
                            <option value="1">Горючий</option>
                            <option value="2">Негорючий</option>
                        </select>
                    </div>
                    <div className='col-zetta-1 f-raleway-reg-pol  m-m-1'>
                        <label>Источник огня<AnswerInfo/></label>
                        <select className="form-select">
                            <option value="1">Да</option>
                            <option value="2">Нет</option>
                        </select>
                    </div>
                </div>: null}
                <div className='row mt-5'>
                    <div className='col-checkobj-6'>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" onChange={handleChangeCheckAdressObj} checked={checkAdressObj}/>
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
        </>
    )
}