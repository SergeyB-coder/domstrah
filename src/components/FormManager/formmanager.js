import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import { useDispatch } from 'react-redux';
import './style.css'
import { sendToManager } from './formmanagerapi';
import { setTypeObject } from '../Calc/calcSlice';

const list_messengers = [
    {value: '1', name: 'Телеграм'},
    {value: '2', name: 'Мессенджер'},
    {value: '3', name: 'Ватсап'},
    {value: '4', name: 'Вайбер'},
]

export function FormManager(props) {
    const dispatch = useDispatch();
    const closeModalFormManager = props.closeModalFormManager
    const another_bank = props.another_bank

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [addres, setAddres] = useState('')
    const [date_start, setDate_start] = useState(new Date())
    const [messenger, setMessenger] = useState(1)
    const [comment, setComment] = useState('')
    const [checkedSelf, setCheckedSelf] = useState(false)
    const [showMessageSucces, setShowMessageSucces] = useState(false)
    const [showMessageError, setShowMessageError] = useState(false)
    

    const renderedListMessenger = list_messengers.map(messenger => {
        return (
            
                <option key={messenger.value} value={messenger.value}>{messenger.name}</option>
            
        )
    })

    const handleClickSend = () => {
        window.ym(90426649,'reachGoal','clck_zayavk')
        sendToManager({
            name: name,
            phone: phone,
            addres: addres,
            date_start: date_start,
            messenger: list_messengers[messenger],
            comment: comment,
            checkedSelf: checkedSelf,
        }, function(data) {
            if (data.res) {
                window.ym(90426649,'reachGoal','zayavka_ok')
                setShowMessageSucces(true)
            }
            else {
                setShowMessageError(true)
            }
        })
    }

    const handleClickClose = () => {
        dispatch(setTypeObject('Квартира'))
        closeModalFormManager()
    }


    return (
        <>
            
            <div className='container-form-manager'>
                <div className='text-change-password' onClick={handleClickClose}>Закрыть</div>
                <div>
                    <div className='f-raleway-m my-2'>Оформление полиса</div>
                    <div className='f-raleway-l'>
                        {another_bank ? 
                            (
                                <>
                                    <p>
                                        На данный момент он-лайн покупка доступна для Сбербанк.<br></br>
                                        Наш менеджер оформит страховой полис для других банков, оставьте заявку.
                                    </p>
                                </>
                            ):(
                                'Наш менеджер свяжется с вами для уточнения индивидуальных деталей'
                            )
                        }
                    </div>
                    <div className='row mt-3'>
                        <div className='col-6 f-raleway-x-mini'>
                            Ваше имя
                        </div>
                        <div className='col-6 f-raleway-x-mini'>
                            Ваш телефон
                        </div>
                    </div>

                    <div className='row f-raleway-l'>
                        <div className='col-6'>
                            <input type="text" className="form-control bg-lg" value={name} 
                                onChange={(e) => {
                                        setName(e.target.value)
                                    }
                                }
                            />
                        </div>
                        <div className='col-6 f-raleway-l'>
                            <input type="text" className="form-control bg-lg" value={phone} 
                                onChange={(e) => {
                                    setPhone(e.target.value)
                                    }
                                }
                            />
                        </div>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" checked={checkedSelf} onChange={(e)=>{
                                setCheckedSelf(e.target.checked)
                            }}/>
                        <label className="form-check-label f-raleway-x-mini" >
                            Сам заполню данные
                        </label>
                    </div>
                    <div className='f-raleway-x-mini mt-3'>Адрес объекта</div>
                    <input type="text" className="form-control bg-lg" value={addres} 
                        onChange={(e) => {
                                setAddres(e.target.value)
                            }
                        }
                    />
                    
                    <div className='row mt-3'>
                        <div className='col-6 f-raleway-x-mini'>
                            Дата начала действия полиса
                        </div>
                        <div className='col-6 f-raleway-x-mini'>
                            Удобный способ связи
                        </div>
                    </div>
                    
                    <div className='row'>
                        <div className='col-6'>
                            <DatePicker 
                                selected={date_start} 
                                onChange={(date) => setDate_start(date)} 
                                className='birthday f-s bg-lg'
                                // disabled={!lifeOption}
                                dateFormat="dd-MM-yyyy"
                                placeholderText='ДД-ММ-ГГГГ'
                                peekNextMonth
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                            />
                        </div>
                        <div className='col-6'>
                            <select className="form-select form-select bg-lg" value={messenger} onChange={(e) => {
                                setMessenger(e.target.value)
                            }}>
                                {renderedListMessenger}
                            </select>
                        </div>
                    </div>
                    <div className='f-raleway-x-mini mt-3'>Комментарий</div>
                    <input type="text" className="form-control bg-lg" value={comment} 
                        onChange={(e) => {
                                setComment(e.target.value)
                            }
                        }
                    />
                    
                    <div className='d-flex justify-content-end mt-5'>
                        <div className='btn btn-light ' onClick = {handleClickSend}>
                            Отправить
                        </div>
                    </div>
                    {showMessageSucces ? (
                        <div>
                            Данные успешно отправлены
                        </div>
                    ): null}
                    {showMessageError ? (
                        <div>
                            Ошибка отправки, проверьте корректность данных
                        </div>
                    ): null}
                </div>
            </div>
        </>
        
    )
}