import React, { useState } from 'react';
import Modal from 'react-modal';
import { digitNumber } from '../../features/funcs';
import './style.css'
import { selectListOrders, setListOrders } from './personSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, setOrderArchive } from './personapi';

export function Orders() {
    const dispatch = useDispatch()
    const [modalOrderInfoOpen, setModalOrderInfoOpen] = useState(false)
    const [filterOrdersValue, setFilterOrdersValue] = useState('work') // archive
    const [showArchive, setShowArchive] = useState(0)
    const [orderInfo, setOrderInfo] = useState({
        id: '',
        firstname: '', 
        lastname: '', 
        parentname: '', 
        limit_sum: 0,
        birthday: '00-00-0000',
        series_doc: '',
        number_doc: '',
        addres_holder_reg: '',
        type_object: '',
        addres_object: '',
        insurance_company: '',
    })
    const list_orders = useSelector(selectListOrders)

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
    }
    
    const renderedListOrders = list_orders.map(order => {
        return (
            <>
                <tr className={(order.is_archive === showArchive) ? 'order': 'order-hidden'} key={order.id} onClick={() => {handleClickOrder(order)}}>
                    
                    {/* <td className='fs-13'>{order.company}</td> */}
                    <td className='fs-13'>{order.firstname}</td>
                    <td className='fs-13'>{order.lastname}</td>
                    <td className='fs-13'>{order.parentname}</td>
                    <td className='fs-13'>{order.addres_object}</td>
                    <td className='fs-13'>{order.limit_sum}</td>
                    <td className='fs-13'>{order.series_doc}</td>
                    <td className='fs-13'>{order.number_doc}</td>
                    <td className='fs-13'>{order.datetime !== null ? order.datetime.slice(0, 10): '-'}</td>
                </tr>
            </>
        )
    })

    function handleClickOrder(order) {
        setOrderInfo(order)
        setModalOrderInfoOpen(true)
    }

    const closeModalOrderInfo = () => {
        setModalOrderInfoOpen(false)
    }

    const handleGetOrders = () => {
        getOrders(function(data) {
                dispatch(setListOrders(data.orders))
        })
    }

    const handleClickArchive = () => {
        if (orderInfo.id !== '') {
            setOrderArchive({order_id: orderInfo.id}, function(data) {
                if (data.res) {
                    handleGetOrders()
                    alert('Заявка отправлена в архив')
                }
                else {
                    alert('Операция не удалась')
                }
            })
        }
    }

    const onChangeFilterOrdersWork = (e) => {
        setFilterOrdersValue('work')
        setShowArchive(0)
    }

    const onChangeFilterOrdersArchive = (e) => {
        setFilterOrdersValue('archive')
        setShowArchive(1)
    }

    return (
        <>
            <Modal
                isOpen={modalOrderInfoOpen}
                style={customStyles}
                contentLabel=""
            >
                <div className='text-change-password' onClick={closeModalOrderInfo}>Закрыть</div>
                <div className='order-info-container mt-3'>
                    <div className='d-flex justify-content-center'>
                        <label className='f-raleway-m'>Заявка</label>    
                    </div>
                    <label className='f-raleway-12'>ФИО</label>
                    <div className='font-raleway-700'>
                        {orderInfo.firstname + ' ' + orderInfo.lastname + ' ' + orderInfo.parentname}
                    </div>
                    <label className='f-raleway-12'>Дата рождения</label>
                    <div className='font-raleway-700'>
                        {orderInfo.birthday.slice(0, 10)}
                    </div>
                    <label className='f-raleway-12'>Паспорт</label>
                    <div className='font-raleway-700'>{`Серия: ${orderInfo.series_doc}, номер: ${orderInfo.number_doc}`}</div>
                    
                    <label className='f-raleway-12'>Адрес</label>
                    <div className='font-raleway-700'>{orderInfo.addres_holder_reg}</div>

                    <label className='f-raleway-12'>Email</label>
                    <div className='font-raleway-700'>{orderInfo.email}</div>

                    <label className='f-raleway-12'>Телефон</label>
                    <div className='font-raleway-700'>{orderInfo.phone}</div>
                    
                    <label className='f-raleway-12'>Сумма ипотеки</label>
                    <div  className='font-raleway-700'>
                        {digitNumber(orderInfo.limit_sum.toString()) + ' руб.'}
                    </div>

                    <label className='f-raleway-12'>Тип недвижимости</label>
                    <div  className='font-raleway-700'>
                        {orderInfo.type_object || '-'}
                    </div>
                    <label className='f-raleway-12'>Адрес недвижимости</label>
                    <div  className='font-raleway-700'>
                        {orderInfo.addres_object}
                    </div>
                    <label className='f-raleway-12'>Страховая компания</label>
                    <div  className='font-raleway-700'>
                        {orderInfo.insurance_company || '-'}
                    </div>
                    <div className='d-flex justify-content-end'>
                        <button className='btn btn-light btn-sm' onClick={handleClickArchive}>В архив</button>
                    </div>
                </div>
            </Modal>
            <div>
                <div className='row'>
                    <div className='col-3 d-flex align-items-center'>
                        <label class="form-check-label mx-2 font-filter-credit " for="w">
                            В работе
                        </label>
                        <input class="form-check-input m-0 p-0" type="radio" name='w' id='w'  
                            onChange={onChangeFilterOrdersWork}
                            checked={filterOrdersValue === 'work'}
                        />
                    </div>
                    <div className='col-3 d-flex align-items-center'>
                        <label class="form-check-label mx-2 font-filter-credit " for="w">
                            Архив
                        </label>
                        <input class="form-check-input m-0 p-0" type="radio" name='w' id='w'  
                            onChange={onChangeFilterOrdersArchive}
                            checked={filterOrdersValue === 'archive'}
                        />
                    </div>
                </div>
                
                <table class="table bg-w brd-r5 mt-4">
                    <thead>
                        <tr>
                            {/* <th scope="col" className='fs-13'>ID</th> */}
                            {/* {/* <th scope="col" className='fs-13'>НОМЕР</th> */}
                            {/* <th scope="col" className='fs-13'>СТРАХОВАЯ КОМПАНИЯ</th> */} 
                            <th scope="col" className='fs-13'>Имя</th>
                            {/* {/* <th scope="col" className='fs-13'>ТИП</th> */}
                            <th scope="col" className='fs-13'>Фамилия</th>
                            <th scope="col" className='fs-13'>Отчество</th>
                            <th scope="col" className='fs-13'>Адрес объекта</th>
                            <th scope="col" className='fs-13'>Сумма ипотеки</th>
                            <th scope="col" className='fs-13'>Серия пасорта</th>
                            <th scope="col" className='fs-13'>Номер паспорта</th> 
                            <th scope="col" className='fs-13'>Дата</th> 
                            {/* <th scope="col" className='fs-13'>СТАТУС</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {renderedListOrders}                            
                    </tbody>
                </table>
            </div>
        </>
    )
}
