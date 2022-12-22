import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './style.css'
import { Button } from '../Buttons/button';
import { digitNumber } from '../../features/funcs';
import { selectTypeObject, setTypeObject, selectIdBank, setIdBank, setIsManagerCost, setDiscount, setPromt, setPromtProperty, setPromtCredit, setInsuranceCompany } from './calcSlice';
import { list_banks, list_banks1 } from '../../static/Const/vars';
import Select from 'react-select'
import { getSettings } from '../Person/personapi';
import { getTokens, getZetta, preCalc } from './calcapi';
import { setCookie, setPremiumSum, setToken } from '../Home/homeSlice';




export function MainCalc(props) {
    const dispatch = useDispatch();
    const typeObject = useSelector(selectTypeObject)
    const idBank = useSelector(selectIdBank)
    const setShowFormManager = props.setShowFormManager
    const setAnother_bank = props.setAnother_bank
    const page = props.page
    const [indBank, setIndBank] = useState(0)

    function yandex_m_bank(n) {
        if (n === '1') {
            window.ym(90426649,'reachGoal','sber_main')
        }
        else if (n === '2') {
            window.ym(90426649,'reachGoal','vtb_main')
        }
        else if (n === '3') {
            window.ym(90426649,'reachGoal','gazprom_main')
        }
        else if (n === '4') {
            window.ym(90426649,'reachGoal','alfa_main')
        }
        else if (n === '5') {
            window.ym(90426649,'reachGoal','rossel_main')
        }
        else if (n === '6') {
            window.ym(90426649,'reachGoal','mkb__main')
        }
        else if (n === '7') {
            window.ym(90426649,'reachGoal','otkrit__main')
        }
        else if (n === '8') {
            window.ym(90426649,'reachGoal','Sov_main')
        }
        else if (n === '9') {
            window.ym(90426649,'reachGoal','raif_main')
        }
        else if (n === '10') {
            window.ym(90426649,'reachGoal','rossbank_main')
        }
        else if (n === '11') {
            window.ym(90426649,'reachGoal','tinkof_main')
        }
        else if (n === '12') {
            window.ym(90426649,'reachGoal','other_main')
        }
    }

    const handleChangeBank = (e) => {
        yandex_m_bank(e.value)
        dispatch(setIdBank(e.value))
        setIndBank(parseInt(e.value))
        if (parseInt(e.value) > 1) {
            setAnother_bank(true)
            // setShowFormManager(true)
        } 

    }

    const renderedListBanks = list_banks.map(bank => {
        return (
                <option key={bank.value} className='' value={bank.value}>{bank.name}</option>
        )
    })

    function handleGetDiscount() {
        getSettings({user_id: props.userId}, function(data) {
            if (data.res) {
               dispatch(setDiscount(data.discount))
               dispatch(setPromt(data.promt))
               dispatch(setPromtProperty(data.promt_property))
               dispatch(setPromtCredit(data.promt_credit))
            }
        })
    }

    const handleClickCalc = () => {
        window.ym(90426649,'reachGoal','rasschet1')
        dispatch(setIsManagerCost(false))
        props.setIsLoadCost(true)
        props.setShowCostPolicy(false)
        props.setCalcStep('info')
        setAnother_bank(false)        
        handleGetDiscount()
        props.getToken()
        // getTokens(function(data) {
        //     dispatch(setToken(data.res.token))
        //     dispatch(setCookie(data.res.cookie))
        //     preCalc({token: data.res.token, cookie: data.res.cookie, limit_sum: props.mortgageBalance}, (data) => {
        //         // console.log('preCalc', data)
        //         dispatch(setPremiumSum(parseFloat(data.res.premium)))
        //         dispatch(setInsuranceCompany(data.res.company))
        //         props.setIsLoadCost(false)
        //         props.setShowCostPolicy(true)
        //     })
        // })
    }

    const handleChangeTypeObject = (e) => {
        dispatch(setTypeObject(e.target.value))
        if (e.target.value !== '1' &&  e.target.value !== '4') {
            setShowFormManager(true)
        }
    }

    const handleChangeMortgageBalance = (e) => {
        if (!isNaN(e.target.value[e.target.value.length-1])) {
            props.setMortgageBalance(e.target.value.replace(/ /g, ''))
        }
    }

    


    return (
        <>

            <div className={page === 'obj_item' ? "main-calc-wrapper-obj": "main-calc-wrapper"}>
                {/* <a id='pdf'  href='/' download={'w.pdf'}>downloadPDF</a> */}
                <div className="title-calc f-raleway-l" >
                    Рассчитать стоимость полиса
                </div>
                <div className="frame">
                    <div className="row align-items-end gap-10">
                        <div className="col-6 col-lg-3">
                            <div className="d-flex align-items-start flex-column font-raleway-700 ">
                                <label className='color-gr f-s15'>Банк-Кредитор</label>
                                <div className="select_wrapper mt-2">
                                    {/* <select className="form-select f-raleway-x-mini" value={idBank} onChange={handleChangeBank}>
                                        {renderedListBanks}
                                    </select> */}
                                    <Select 
                                        options={list_banks1} 
                                        className="select-banks f-raleway-x-mini" 
                                        defaultValue={list_banks1[parseInt(idBank-1)]}
                                        isClearable={true}
                                        placeholder={''}
                                        onChange={handleChangeBank}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-6 col-lg-3">
                            <div className="form-group d-flex align-items-start flex-column font-raleway-700 ">
                            <label className='color-gr f-s15'>Остаток по ипотеке</label>
                            <div className="input-wrapper position-relative input-group mt-2">
                                <input type="text" className="inp-calc form-control f-raleway-x-mini" value={digitNumber(props.mortgageBalance.toString())} onChange={handleChangeMortgageBalance}/>
                                <input type="range" className="form-range pos-input-range" max="20000000"
                                    onChange={(e) => {
                                        props.setMortgageBalance(e.target.value.replace(/ /g, ''))
                                    }}
                                />
                            </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 realty-type">
                            <div className="form-group d-flex align-items-start flex-column ">
                                <label className='color-gr f-s15 font-raleway-700 mt-3'>Тип недвижимости</label>
                                <div className="select_wrapper mt-2">
                                    <select className="inp-calc form-select f-raleway-x-mini" value={typeObject} onChange={handleChangeTypeObject}>
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
                        <div className="col-md-6 col-lg-3 mt-3">
                            <Button text={'Рассчитать'} handleClick={handleClickCalc}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
