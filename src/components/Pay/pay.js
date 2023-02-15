import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectLifeOption, selectPropertyOption } from '../Home/homeSlice';
import { selectEmail } from '../RegPolice/regpoliceSlice';
import './style.css'



export function Pay() {
    let { s } = useParams();
    let { n } = useParams();

    const lifeOption = useSelector(selectLifeOption)
    const propertyOption = useSelector(selectPropertyOption)
    const email = useSelector(selectEmail)

    return (
        <div className='container-pay'>
            <form method='POST' action='https://domstraxovanie.server.paykeeper.ru/create/' >
                <label className='f-raleway-x-mini-g'>Сумма оплаты:</label>
                <input className="form-control f-raleway-15 mt-3" type='text' name='sum' value={Math.round(n*100)/100} onChange={()=>{}} /> <br />
                <label className='f-raleway-x-mini-g mt-4'>Номер заказа:</label>
                <input className="form-control f-raleway-15 mt-3" type='text' name='orderid' value={s} onChange={()=>{}}/> <br />
                <label className='f-raleway-x-mini-g mt-4'>Название услуги: </label> Страхование ипотеки 
                <input className="form-control f-raleway-15 mt-3" type='text' name='service_name' value={(propertyOption ? 'Имущество ': '') + (lifeOption ? 'Жизнь': '')} onChange={()=>{}}/> <br />
                <br />
                <input className="form-control f-raleway-15 mt-3" type='text' name='client_email' value={email}/> <br />
                <br />
                <input className='btn btn-outline-primary mt-3' type='submit' value='Перейти к оплате' />
            </form>
        </div>
    )
}