import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { saveAs } from 'file-saver'
import PhoneInput from 'react-phone-input-2'
import validator from 'validator';
import BounceLoader from "react-spinners/BounceLoader";
import { useNavigate } from "react-router-dom";
import './style.css'
import { Header } from '../Header/header';
import { 
    sendSavePerson, 
    getPerson, 
    sendChangePassword, 
    sendUploadFTP, 
    sendSaveSettings, 
    getSettings, 
    getDeals, 
    getPersonDeals, 
    getPDF, 
    getCredits, 
    getOrders,
    getBanner} from './personapi';

import { selectToken, setBannerIsOn, setBannerUrl, setBannerUrlMobile, setToken } from '../Home/homeSlice';
import { setListOrders } from './personSlice';

import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Piechart } from './piechart';
import { Button } from '../Buttons/button';
import { getToken } from '../Home/homeapi';
import { digitNumber } from '../../features/funcs';
import { BannerEdit } from './banneredit';
import { useDispatch, useSelector } from 'react-redux';
import { Orders } from './orders';

Modal.setAppElement('body');



export function Person(props) {
    const dispatch = useDispatch()
    const token = useSelector(selectToken)
    const [phone, setPhone] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [messageRes, setMessageRes] = useState('')
    
    const [navButton, setNavButton] = useState('statistic')
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [modalCSVIsOpen, setModalCSVIsOpen] = useState(false)
    const [modalLoadIsOpen, setModalLoadIsOpen] = useState(false)
    const [modalStatusCreditOpen, setModalStatusCreditOpen] = useState(false)
    
    const [modalDealInfoOpen, setModalDealInfoOpen] = useState(false)
    

    const [brokerCommission, setBrokerCommission] = useState(0)
    const [discount, setDiscount] = useState(0)

    const [deals, setDeals] = useState([])
    const [week_finance, setWeek_finance] = useState([])
    const [week_property, setWeek_property] = useState([])
    const [week_life, setWeek_life] = useState([])
    const [person_deals, setPerson_deals] = useState([])
    const [list_credits, setListCredits] = useState([])
    

    const [content, setContent] = useState('person') // person, policies
    const [promt, setPromt] = useState('')
    const [promtCredit, setPromtCredit] = useState('')
    const [email_manager, setEmail_manager] = useState('')
    
    const [status_desciption_credit, setStatus_desciption_credit] = useState('')
    const [status_simple, setStatus_simple] = useState('')

    const [filterCreditValue, setFilterCreditValue] = useState('all') // succes, fail, wait
    const [filterCreditStatus, setFilterCreditStatus] = useState('')

     
     

    
    const [policeinfo, setPoliceinfo] = useState(
        {
            policy_number: '', 
            fullname: '', 
            limit_sum: 0, 
            company: '',
            type_object: '',
            type_insurance: '',
            summ_insurance: 0,
            date_buy: '',
            birthday: '00-00-0000',
        })
     
    const navigate = useNavigate();

    const downloadFile = () => {
        saveAs('https://c61437.na4u.ru/static/uploads/out.csv', 'Выгрузка')
    }
    
    const handleUploadCredits = () => {
        saveAs('https://c61437.na4u.ru/static/uploads/credits.csv', 'Рассрочки')
    }

    const handleSavePassword = () => {
        sendChangePassword({password: password, user_id: props.userId}, function(data) {
            if (data.res) {
                setModalIsOpen(false)
                alert('Пароль успешно изменен')
            }
            else {
                setModalIsOpen(false)
                alert('Ошибка сервера')
            }
        })

    }

    const handleChangeName = (e) => {
        setName(e.target.value)
    }

    const handleChangeSurname = (e) => {
        setSurname(e.target.value)
    }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleChangePhone = (e) => {
        setPhone(e)
    }

    const handleSave = () => {
        if (validator.isEmail(email)) {
            sendSavePerson({
                user_id: props.userId,
                name: name,
                surname: surname,
                email: email,
                phone: phone,
            }, function(data) {
                if (data) {
                }
            })
        }
        else {
            alert('Неверный email')
        }
    }

    const handleSaveSettings = () => {
            setModalLoadIsOpen(true)
            sendSaveSettings({
                user_id: props.userId,
                brokerCommission: brokerCommission,
                discount: discount,
                promt: promt,
                promt_credit: promtCredit,
                email_manager: email_manager,
            }, function(data) {
                if (data) {
                    setModalLoadIsOpen(false)
                    setMessageRes('Успешно')
                    setTimeout(() => {setMessageRes('')}, 1000)

                }
            })
    }

    const handleGetSettings = () => {
        getSettings({user_id: props.userId}, function(data) {
            if (data.res) {
               setBrokerCommission(data.broker_commission)
               setDiscount(data.discount)
               setPromt(data.promt)
               setPromtCredit(data.promt_credit)
               setEmail_manager(data.email_manager)
            }
        })
    }

    const handleGetDeals = () => {
        getDeals({user_id: props.userId}, function(data) {
            if (data.res) {
                console.log('data.deals', data.deals)
               setDeals(data.deals)
               setWeek_finance(data.week_finance)
               setWeek_property(data.total_week.week_property)
               setWeek_life(data.total_week.week_life)
            }
        })
    }

    const handleGetPersonDeals = () => {
        getPersonDeals({user_id: props.userId}, function(data) {
            if (data.res) {
                setContent('policies')
               setPerson_deals(data.deals)
            }
        })
    }

    const handleGetCredits = () => {
        setNavButton('credits')
        getCredits(function(data) {
            
            if (data.res) {
                console.log('credits', data)
                setContent('credits')
                setListCredits(data.credits)
            }
        })
    }

    const handleGetOrders = () => {
        setNavButton('orders')
        getOrders(function(data) {
            console.log('orders', data)
            // if (data.res) {
                // setContent('credits')
                dispatch(setListOrders(data.orders))
            // }
        })
    }
    

    const handleGetPerson = () => {
        getPerson({user_id: props.userId}, function(data) {
            if (data.res) {
               setName(data.name)
               setSurname(data.surname)
               setEmail(data.email)
               setPhone(data.phone)
            }
        })
    }

    const closeModal = () => {
        setModalIsOpen(false)
    }

    const closeModalCSV = () => {
        setModalCSVIsOpen(false)
    }

    const closeModalStatusCredit = () => {
        setModalStatusCreditOpen(false)
    }


    
    const closeModalDealInfo = () => {
        setModalDealInfoOpen(false)
    }

    const openModal = () => {
        setModalIsOpen(true)
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleFTP = () => {
        sendUploadFTP({user_id: props.userId}, function(data) {
            if (data.res) {
                setModalCSVIsOpen(true)
            }
            else {
            }
        })
    }

    const handleStatisticClick = () => {
        setNavButton('statistic')
    }

    const handleNewsClick = () => {
        navigate('/news', {replace: true})
    }

    const handlePromoClick = () => {
        navigate('/promo', {replace: true})
    }

    const handleBannerClick = () => {
        getBanner(function (data) {
            dispatch(setBannerUrl(data.banner_url))
            dispatch(setBannerUrlMobile(data.banner_url_mobile))
            dispatch(setBannerIsOn(data.is_on))
        })
        setNavButton('banner')
    }

    const handleDealsClick = () => {
        setNavButton('deals')
    }

    const handleSettingsClick = () => {
        setNavButton('settings')
    }

    const handleChangeBrokerCommission = (e) => {
        setBrokerCommission(e.target.value)
    }

    const handleChangeDiscount = (e) => {
        setDiscount(e.target.value)
    }

    function showCreditInfo(info_credit) {
        setStatus_desciption_credit(info_credit.status_desciption_credit)
        setStatus_simple(info_credit.status_simple)
        setModalStatusCreditOpen(true)
    }




    
    function handleClickDeal(police) {
        setPoliceinfo(police)
        setModalDealInfoOpen(true)
    }

    const renderedListDeals = deals.map(policy => {
        return (
            <>
                <tr className='order' key={policy.id} onClick={() => {handleClickDeal(policy)}}>
                    {/* <th scope="row">1</th> */}
                    <td className='fs-13'>
                        <div className='' 
                        >
                            {policy.id}
                        </div>
                        {policy.status === 1 ? 
                            (
                                <div className='cur-p-h' onClick={() => {handleGetPdfPolicy(policy.id)}}>
                                    Скачать
                                </div>
                            ): null
                        }
                    </td>
                    <td className='fs-13'>{policy.policy_number}</td>
                    <td className='fs-13'>{policy.company}</td>
                    <td className='fs-13'>{policy.fullname}</td>
                    <td className='fs-13'>{policy.type_object}</td>
                    <td className='fs-13'>{policy.type_insurance}</td>
                    <td className='fs-13'>{policy.summ_insurance}</td>
                    <td className='fs-13'>{policy.date_start}</td>
                    <td className='fs-13'>{policy.date_end}</td>
                    <td className='fs-13'>{policy.status === 1 ? 'Оплачен': 'Не оплачен'}</td>
                    <td className='fs-13'>{policy.date_buy.slice(0, 10)}</td>
                    <td className='fs-13'>{policy.exchange_status}</td>
                </tr>
            </>
        )
    })

    const renderedListDealsMobile = deals.map(policy => {
        return (
            <>
                <div>
                    {/* <th scope="row">1</th> */}
                    <div className='row border-b m-1 rounded'>
                        <div className='col-3'>
                            <div className='' 
                            >
                                {policy.id}
                            </div>
                            <div className='cur-p-h' onClick={() => {handleGetPdfPolicy(policy.id)}}>
                                Скачать
                            </div>
                        </div>
                        <div className='col-9'>
                            <div>{policy.policy_number}</div>
                            <div>{policy.company}</div>
                            <div>{policy.fullname}</div>
                            <div>{policy.type_object}</div>
                            <div>{policy.type_insurance}</div>
                            <div>{policy.summ_insurance}</div>
                            <div>{policy.date_start}</div>
                            <div>{policy.date_end}</div>
                            <div>{policy.status === 1 ? 'Оплачен': 'Не оплачен'}</div>
                            <div>{policy.date_buy.slice(0, 10)}</div>
                        </div>
                    </div>
                </div>
            </>
        )
    })

    const renderedListPersonDeals = person_deals.map(policy => {
        return (
            <>
                <tr key={policy.id} >
                    {/* <th scope="row">1</th> */}
                    <td className='fs-13' >
                        <div className='' 
                            // onClick={() => 
                            //     {
                            //         handleGetPdfPolicy(policy.id)
                            //     }
                            // }
                        >
                            {policy.id}
                        </div>
                        <div className='cur-p-h' onClick={() => {handleGetPdfPolicy(policy.id)}}>
                            Скачать
                        </div>
                    </td>
                    <td className='fs-13'>{policy.company}</td>
                    <td className='fs-13'>{policy.fullname}</td>
                    <td className='fs-13'>{policy.type_object}</td>
                    <td className='fs-13'>{policy.type_insurance}</td>
                    <td className='fs-13'>{policy.summ_insurance}</td>
                    <td className='fs-13'>{policy.date_start}</td>
                    <td className='fs-13'>{policy.date_end}</td>
                    <td className='fs-13'>
                        {policy.status === 'Кредит' ?
                            (
                                <div className='credit-info'
                                    onClick={() => {showCreditInfo(policy.info_credit)}}
                                >
                                    {policy.status}
                                </div>
                            ) :
                            (
                                <div>
                                    {policy.status}
                                </div>
                            )
                        }
                    </td>
                    <td className='fs-13'>{policy.date_buy}</td>
                </tr>
            </>
        )
    })

    const renderedListCredits = list_credits.map(credit => {
        return (
            <>
                <tr key={credit.id} className={(credit.status_simple === filterCreditStatus || filterCreditValue === 'all') ? '': 'credit-hidden'}>
                    <td className='fs-13' >
                        <div className=''>
                            {credit.id}
                        </div>
                        {/* <div className='cur-p-h' onClick={() => {handleGetPdfPolicy(credit.id)}}>
                            Скачать
                        </div> */}
                    </td>
                    {/* <td className='fs-13'>{credit.company}</td> */}
                    <td className='fs-13'>{credit.fullname}</td>
                    {/* <td className='fs-13'>{credit.type_object}</td> */}
                    {/* <td className='fs-13'>{credit.type_insurance}</td> */}
                    {/* <td className='fs-13'>{credit.summ_insurance}</td> */}
                    <td className='fs-13'>{credit.status_simple}</td>
                    <td className='fs-13'>{credit.status}</td>
                    <td className='fs-13'>{credit.createDate}</td>
                </tr>
            </>
        )
    })



    const toPercent = (decimal) => `${decimal} руб`;

    const renderLineChart = (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart width={400} height={400} data={week_finance}>
            <Area fill={'#F5F0FF'} strokeWidth={3} dot={false} type="monotone" dataKey="money" stroke="#24A200" />
            <XAxis
              padding={{ left: 40}}
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10}}
            />
            <YAxis
              padding={{ bottom: 0 }}
              dataKey="money"
              axisLine={false}
              tickLine={false}
              tickFormatter={toPercent}
            />
          </AreaChart>
        </ResponsiveContainer>
    )

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
        navstatic: {
            background: navButton === 'statistic' ? 'rgba(0, 0, 0, 0.02)': null,
            cursor: 'pointer',
            color: navButton === 'statistic' ? '#2CA5EC': 'rgba(29, 29, 29, 0.5)',
        },
        navdeals: {
            background: navButton === 'deals' ? 'rgba(0, 0, 0, 0.02)': null,
            cursor: 'pointer',
            color: navButton === 'deals' ? '#2CA5EC': 'rgba(29, 29, 29, 0.5)',
        },
        navsettings: {
            background: navButton === 'settings' ? 'rgba(0, 0, 0, 0.02)': null,
            cursor: 'pointer',
            color: navButton === 'settings' ? '#2CA5EC': 'rgba(29, 29, 29, 0.5)',
        },
        navnews: {
            background: navButton === 'news' ? 'rgba(0, 0, 0, 0.02)': null,
            cursor: 'pointer',
            color: navButton === 'news' ? '#2CA5EC': 'rgba(29, 29, 29, 0.5)',
        },
        banner: {
            background: navButton === 'banner' ? 'rgba(0, 0, 0, 0.02)': null,
            cursor: 'pointer',
            color: navButton === 'banner' ? '#2CA5EC': 'rgba(29, 29, 29, 0.5)',
        },
        spinner: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            zIndex: '10',
        }
    }

    const  handleChangePromt = (e) => {
        setPromt(e.target.value)
    }

    
    const  handleChangePromtCredit = (e) => {
        setPromtCredit(e.target.value)
    }

    const  handleChangeEmailManager = (e) => {
        setEmail_manager(e.target.value)
    }


    const handleGetPdfPolicy = (isn) => {
        getPDF({isn: isn.toString(), token: token}, function(data) {
            if (data.res) {
                var newWin = window.open("about:_blank", "hello", "width=1000,height=800");
                newWin.document.write(`
                    <embed src="https://c61437.na4u.ru/static/policies/` + data.path + `.pdf" width="1000" height="800" 
                    type="application/pdf"/>
                `);
            }
            else alert(data.error)
            
        })
    }

    const handleGetToken = () => {
        if (token === '') {
            getToken({}, function(token) {
                dispatch(setToken(token))
            })
        }
    }

    const onChangeFilterCreditsAll = (e) => {
        console.log('all', e.target.value)
        setFilterCreditValue('all')
    }

    const onChangeFilterCreditsSucces = (e) => {
        console.log('succes', e.target.value)
        setFilterCreditValue('succes')
        setFilterCreditStatus('Одобрено')
    }

    const onChangeFilterCreditsFail = (e) => {
        console.log('fail', e.target.value)
        setFilterCreditValue('fail')
        setFilterCreditStatus('Отказ')
    }

    const onChangeFilterCreditsWait = (e) => {
        console.log('wait', e.target.value)
        setFilterCreditValue('wait')
        setFilterCreditStatus('Рассмотрение')   
    }

    const onChangeFilterCreditsArchiv = (e) => {
        console.log('archiv', e.target.value)
        setFilterCreditValue('archiv')
        setFilterCreditStatus('Архив')   
    }





    useEffect(() => {
        handleGetToken()
        handleGetPerson()
        handleGetSettings()
        handleGetDeals()
    }, [])

    useEffect(() => {
        props.setMenuText('ЛК')
        props.setMenuItemText('Главная')
    }, [])
    return (
        <>
            <Modal
                isOpen={modalIsOpen}
                // onAfterOpen={afterOpenModal}
                // onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className='text-change-password' onClick={closeModal}>Закрыть</div>
                <div className='mt-3'>
                    <label className='title-input'>Новый пароль</label>
                    <div className='position-relative'>
                        
                        
                                <input type="password" className="form-control" placeholder="Password" aria-label="Username" aria-describedby="basic-addon1"
                                    onChange={handleChangePassword}
                                />
                                <div className='d-flex justify-content-end' 
                                    onClick={handleSavePassword}
                                >
                                    <button type='button' className='btn btn-light mt-2'>Сохранить</button>
                                </div>
                    </div>
                </div>
            </Modal>
            
            <Modal
                isOpen={modalCSVIsOpen}
                // onAfterOpen={afterOpenModal}
                // onRequestClose={closeModal}
                style={customStyles}
                contentLabel="CSV"
            >
                <div className='text-change-password' onClick={closeModalCSV}>Закрыть</div>
                <div className='mt-3'>
                    <label className='title-input'>Выгрузка готова</label>
                    <div className='position-relative'> 
                            <div className='btn-save' onClick={downloadFile}>
                                <p className='d-flex justify-content-center m-1 fs-12 text-btn-save'>Скачать</p>
                            </div>
                    </div>
                </div>
            </Modal>

            <Modal
                isOpen={modalStatusCreditOpen}
                style={customStyles}
                contentLabel=""
            >
                <div className='text-change-password' onClick={closeModalStatusCredit}>Закрыть</div>
                <div className='mt-3'>
                    <label className='title-input'>Текущий статус заявки</label>
                    <div>
                        {status_simple}
                    </div>
                    <div  className='fs-13 mt-5'>
                        {status_desciption_credit}
                    </div>
                </div>
            </Modal>


            
            <Modal
                isOpen={modalDealInfoOpen}
                style={customStyles}
                contentLabel=""
            >
                <div className='text-change-password' onClick={closeModalDealInfo}>Закрыть</div>
                <div className='mt-3'>
                    <div className='d-flex justify-content-center'>
                        <label className='f-raleway-m'>Полис</label>    
                    </div>
                    <label className='f-raleway-12'>Номер</label>
                    <div className='font-raleway-700'>
                        {policeinfo.policy_number}
                    </div>
                    <label className='f-raleway-12'>ФИО</label>
                    <div className='font-raleway-700'>
                        {policeinfo.fullname}
                    </div>
                    <label className='f-raleway-12'>Дата рождения</label>
                    <div className='font-raleway-700'>
                        {policeinfo.birthday.slice(0, 10)}
                    </div>
                    <label className='f-raleway-12'>Паспорт</label>
                    <div className='font-raleway-700'>{`Серия: ${policeinfo.series_doc}, номер: ${policeinfo.number_doc}`}</div>
                    
                    <label className='f-raleway-12'>Адрес</label>
                    <div className='font-raleway-700'>{policeinfo.addres_holder_reg}</div>
                    
                    <label className='f-raleway-12'>Сумма ипотеки</label>
                    <div  className='font-raleway-700'>
                        {digitNumber(policeinfo.limit_sum.toString()) + ' руб.'}
                    </div>

                    <label className='f-raleway-12'>Тип недвижимости</label>
                    <div  className='font-raleway-700'>
                        {policeinfo.type_insurance || '-'}
                    </div>
                    <label className='f-raleway-12'>Адрес недвижимости</label>
                    <div  className='font-raleway-700'>
                        {policeinfo.addres_object}
                    </div>
                    <label className='f-raleway-12'>Страховая компания</label>
                    <div  className='font-raleway-700'>
                        {policeinfo.company || '-'}
                    </div>
                    <label className='f-raleway-12'>Стоимость полиса</label>
                    <div  className='font-raleway-700'>
                        {policeinfo.summ_insurance || '-'}
                    </div>
                </div>
            </Modal>

            <BounceLoader  color={'#24A200'} loading={modalLoadIsOpen} cssOverride={customStyles.spinner} size={80} />

            <Header 
                setUserId={props.setUserId} 
                menuItemText={props.menuItemText}
                menuText={props.menuText}
            />
            {/* {url != '' ? (
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js">
                    <Viewer fileUrl={url} />
                </Worker>
                
            ): null} */}
            {!props.isCustomer ? (
                <div className='person-body'>
                    <div className='menu-obj-item row ms-1 d-flex align-items-center'>
                            
                            <div className='col-4  d-flex justify-content-center menu-obj-text-br bl'>
                                <div className='t-dec  cur-p' onClick={() => setContent('person')}
                                >
                                    <div className={content === 'person' ? 'font-obj-text-sel': 'font-obj-text' }>
                                        Личные данные
                                    </div>
                                </div>
                            </div>
                            
                            <div className='col-2 menu-obj-text-br d-flex justify-content-center cur-p'>
                                <div className='t-dec  cur-p' onClick={handleGetPersonDeals}
                                >
                                    <div className={content === 'policies' ? 'font-obj-text-sel': 'font-obj-text' }>
                                        Полисы
                                    </div>
                                </div>
                            </div>
{/* credits */}
                            {/* <div className='col-2 menu-obj-text-br d-flex justify-content-center cur-p'>
                                <div className='t-dec  cur-p' onClick={handleGetCredits}
                                >
                                    <div className={content === 'credits' ? 'font-obj-text-sel': 'font-obj-text' }>
                                        Рассрочки
                                    </div>
                                </div>
                            </div> */}
{/* end credits */}
                    </div>
                    {/* <Link to="/">
                        <div className='text-main'>Главная</div>
                    </Link> */}
                    { content === 'person' ? (
                        <div className='person-info p-3'>
                            <div className='person-info-item'>
                                <label>Имя</label>
                                <input type="text" className="form-control person-input" value={name}
                                    onChange={handleChangeName}
                                />
                            </div>
                            <div className='person-info-item mt-4'>
                                <label>Фамилия</label>
                                <input type="text" className="form-control person-input" value={surname}
                                    onChange={handleChangeSurname}
                                />
                            </div>
                            <div className='person-info-item mt-4'>
                                <label>Email</label>
                                <input type="email" className="form-control person-input" value={email}
                                    onChange={handleChangeEmail}
                                />
                            </div>
                            <div className='person-info-item mt-4'>
                                <label>Мобильный телефон</label>
                                <PhoneInput placeholder='+7' specialLabel='' type="tel" inputClass="form-control person-input" value={phone}
                                    onChange={handleChangePhone}
                                />
                            </div>
                            <div className='d-flex justify-content-between align-items-end mt-4'>
                                <div className='me-3' onClick={openModal}>
                                    <p className='p-0 m-0 text-change-password'>Смена пароля</p>
                                </div>
                                <div className='btn-save d-flex justify-content-center'
                                    onClick={handleSave}
                                >
                                    <p className='p-0 m-0 text-btn-save'>Сохранить</p>
                                </div>
                            </div>
                        </div>
                    ): null}
                    { content === 'policies' ? (
                        <>
                            <div>
                                <table class="table bg-w brd-r5 mt-4">
                                <thead>
                                    <tr>
                                        <th scope="col" className='fs-13'>ID</th>
                                        <th scope="col" className='fs-13'>СТРАХОВАЯ КОМПАНИЯ</th>
                                        <th scope="col" className='fs-13'>ФИО      </th>
                                        <th scope="col" className='fs-13'>ТИП</th>
                                        <th scope="col" className='fs-13'>ВИД СТРАХОВАНИЯ</th>
                                        <th scope="col" className='fs-13'>СУММА СТРАХОВАНИЯ</th>
                                        <th scope="col" className='fs-13'>ДАТА НАЧАЛА</th>
                                        <th scope="col" className='fs-13'>ДАТА ОКОНЧАНИЯ</th>
                                        <th scope="col" className='fs-13'>СТАТУС</th>
                                        <th scope="col" className='fs-13'>ДАТА ПОКУПКИ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderedListPersonDeals}                            
                                </tbody>
                            </table>
                            </div>
                        </>
                    ): null}
                </div>
            ): null}

            {props.isCustomer ? (
                <div className='person-body'>
                    <div className='row p-2 menu-customer'>
                        <div className='col-1 m-1 d-flex justify-content-center rounded' style={customStyles.navstatic}
                            onClick={handleStatisticClick}
                        >
                            Статистика
                        </div>
                        <div className='col-1 m-1 d-flex justify-content-center rounded' style={customStyles.navdeals}
                            onClick={handleDealsClick}
                        >
                            Сделки
                        </div>
                        <div className='col-1 m-1 d-flex justify-content-center rounded' style={customStyles.navnews}
                            onClick={handleNewsClick}
                        >
                            Новости
                        </div>
                        <div className='col-1 m-1 d-flex justify-content-center rounded' style={customStyles.navnews}
                            onClick={handlePromoClick}
                        >
                            Акции
                        </div>
                        <div className='col-1 m-1 d-flex justify-content-center rounded' style={customStyles.banner}
                            onClick={handleBannerClick}
                        >
                            Баннер
                        </div>
                        <div className='col-1 m-1 d-flex justify-content-center rounded' style={customStyles.navsettings}
                            onClick={handleSettingsClick}
                        >
                            Настройки
                        </div>

                        <div className='col-1 m-1 d-flex justify-content-center rounded' style={customStyles.navsettings}
                            onClick={handleGetCredits}
                        >
                            Рассрочки
                        </div>

                        <div className='col-1 m-1 d-flex justify-content-center rounded' style={customStyles.navsettings}
                            onClick={handleGetOrders}
                        >
                            Заявки
                        </div>
                    </div>

                    <div className='row menu-customer'>
                        {navButton === 'deals' ? (
                            <>
                                <div className='col-2'>
                                    Последний обмен
                                </div>
                                <div className='col-2'>
                                    27.07.2022 18:20
                                </div>
                                <div className='col-4'>

                                </div>
                                <div className='col-2'>
                                    Фильтры
                                </div>
                                <div className='col-2'>
                                    <Button handleClick={handleFTP} text={'Запустить обмен'}/>
                                </div>
                            </>
                        ): null}
                        {navButton === 'credits' ? (
                            <>
                                <div className='row '>
                                    <div className='col-1 d-flex align-items-center'>
                                        <label class="form-check-label mx-2 font-filter-credit " for="w">
                                            Все
                                        </label>
                                        <input class="form-check-input m-0 p-0" type="radio" name='w' id='w'  
                                            onChange={onChangeFilterCreditsAll}
                                            checked={filterCreditValue === 'all'}
                                        />
                                    </div>
                                   
                                    <div className='col-1 d-flex align-items-center'>
                                        <label class="form-check-label mx-2 font-filter-credit" for="w">
                                            Одобрено
                                        </label>
                                        <input class="form-check-input m-0 p-0" type="radio" name='w' id='w' 
                                            onChange={onChangeFilterCreditsSucces}
                                            checked={filterCreditValue === 'succes'}
                                        />
                                    </div>
                                    <div className='col-1 d-flex align-items-center'>
                                        <label class="form-check-label mx-2 font-filter-credit" for="w" >
                                            Отказы
                                        </label>
                                        <input class="form-check-input m-0 p-0" type="radio" name='w' id='w' 
                                            onChange={onChangeFilterCreditsFail}
                                            checked={filterCreditValue === 'fail'}
                                        />
                                    </div>
                                    <div className='col-2 d-flex align-items-center'>
                                        <label class="form-check-label mx-2 font-filter-credit" for="w">
                                            На рассмотрении
                                        </label>
                                        <input class="form-check-input m-0 p-0" type="radio" name='w' id='w' 
                                            onChange={onChangeFilterCreditsWait}
                                            checked={filterCreditValue === 'wait'}
                                        />
                                    </div>
                                    <div className='col-2 d-flex align-items-center'>
                                        <label class="form-check-label mx-2 font-filter-credit" for="w">
                                            Архив
                                        </label>
                                        <input class="form-check-input m-0 p-0" type="radio" name='w' id='w' 
                                            onChange={onChangeFilterCreditsArchiv}
                                            checked={filterCreditValue === 'archiv'}
                                        />
                                    </div>
                                    <div className='col-2'>
                                        <Button text={'Выгрузить'} handleClick={handleUploadCredits}/>
                                    </div>
                                </div>
                            </>
                        ): null}
                    </div>

                    { navButton === 'statistic' ?
                        <div className=''>
                            <div className='row '>
                                <div className='col-chart-6 bg-w brd-r5 mt-2 mb-4'>
                                    <div>
                                        График продаж
                                    </div>
                                    <div>
                                        
                                    </div>
                                    <div className='chart-container mt-3'>
                                        {renderLineChart}
                                    </div>
                                </div>
                                <div className='col-chart-6'> 
                                    <div className='row m-1'>
                                        <div className='col-money-5 bg-w brd-r5 m-1'>
                                            <div>
                                                Доход за 7 дней
                                            </div>
                                            <div>
                                                {Math.round(week_life + week_property) + ' р.'}
                                            </div>
                                            <div className='row'>
                                                <div className='col-4'>
                                                    <ResponsiveContainer width="100%" height="100%">
                                                        <Piechart week_property={week_property} week_life={week_life}/>
                                                    </ResponsiveContainer>
                                                </div>
                                                <div className='col-8'>
                                                    <ul>
                                                        <li className='bluemarker'>Недвижимость</li>
                                                        <li className='greenmarker'>Жизнь</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-money-5 bg-w brd-r5 m-1'>
                                            <div>Куплено полисов</div>
                                            <div>1</div>
                                            <div>Продаж за 7 дней</div>
                                        </div>
                                    </div>
                                    <div className='row  h-50 mx-0'>
                                        <div className='col-10 bg-w brd-r5 ms-2'>
                                            Среднесуточный доход 
                                            <div>
                                                {Math.round((week_life + week_property) / 7) + ' р.'}
                                            </div>  
                                        </div>       
                                          
                                    </div>    
                                </div>
                            </div>  
                        </div>:
                        null
                    }

                    { navButton === 'deals' ?
                        <div>
                            <table class="table bg-w brd-r5 mt-4">
                                <thead>
                                    <tr>
                                        <th scope="col" className='fs-13'>ID</th>
                                        <th scope="col" className='fs-13'>НОМЕР</th>
                                        <th scope="col" className='fs-13'>СТРАХОВАЯ КОМПАНИЯ</th>
                                        <th scope="col" className='fs-13'>ФИО</th>
                                        <th scope="col" className='fs-13'>ТИП</th>
                                        <th scope="col" className='fs-13'>ВИД СТРАХОВАНИЯ</th>
                                        <th scope="col" className='fs-13'>СУММА СТРАХОВАНИЯ</th>
                                        <th scope="col" className='fs-13'>ДАТА НАЧАЛА</th>
                                        <th scope="col" className='fs-13'>ДАТА ОКОНЧАНИЯ</th>
                                        <th scope="col" className='fs-13'>СТАТУС</th>
                                        <th scope="col" className='fs-13'>ДАТА ПОКУПКИ</th>
                                        <th scope="col" className='fs-13'>СТАТУС ОБМЕНА</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderedListDeals}                            
                                </tbody>
                            </table>
                            <div className='mobile-table'>
                                {renderedListDealsMobile}
                            </div>
                        </div>:
                        null
                    }

                    { navButton === 'banner' ?
                        <BannerEdit/>:
                        null
                    }

                    { navButton === 'credits' ?
                        <div>
                            <table class="table bg-w brd-r5 mt-4">
                                <thead>
                                    <tr>
                                        <th scope="col" className='fs-13'>ID</th>
                                        {/* <th scope="col" className='fs-13'>НОМЕР</th>
                                        <th scope="col" className='fs-13'>СТРАХОВАЯ КОМПАНИЯ</th> */}
                                        <th scope="col" className='fs-13'>ФИО</th>
                                        {/* <th scope="col" className='fs-13'>ТИП</th>
                                        <th scope="col" className='fs-13'>ВИД СТРАХОВАНИЯ</th>
                                        <th scope="col" className='fs-13'>СУММА СТРАХОВАНИЯ</th>
                                        <th scope="col" className='fs-13'>ДАТА НАЧАЛА</th>
                                        <th scope="col" className='fs-13'>ДАТА ОКОНЧАНИЯ</th>
                                        <th scope="col" className='fs-13'>СТАТУС</th>
                                        <th scope="col" className='fs-13'>ДАТА ПОКУПКИ</th> */}
                                        <th scope="col" className='fs-13'>СТАТУС</th>
                                        <th scope="col" className='fs-13'>ПОДРОБНО</th>
                                        <th scope="col" className='fs-13'>ДАТА</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderedListCredits}                            
                                </tbody>
                            </table>
                            {/* <div className='mobile-table'>
                                {renderedListDealsMobile}
                            </div> */}
                        </div>:
                        null
                    }

                    { navButton === 'orders' ?
                        <Orders/>:
                        null
                    }

                    { navButton === 'settings' ? 
                        <div className='bg-w brd-r5 mt-4 p-2'>
                            <label for="basic-url" className="form-label">Комиссия брокера (участвует в отображении статистики продаж в админке)</label>
                            <div class="input-group mb-3 w-50">
                                <input type="text" class="form-control" value={brokerCommission} onChange={handleChangeBrokerCommission}/>
                                <span class="input-group-text" id="basic-addon3">%</span>
                            </div>
                            <label for="basic-url" class="form-label">Отображаемая скидка (показывает скидку при предварительном расчете в калькуляторе)</label>
                            <div class="input-group mb-3 w-50">
                                <input type="text" class="form-control" value={discount} onChange={handleChangeDiscount}/>
                                <span class="input-group-text" id="basic-addon3">%</span>
                            </div>
                            <label for="basic-url" class="form-label">Подсказка опции Жизнь</label>
                            <div class="input-group mb-3 w-50">
                                <input type="text" class="form-control" value={promt} onChange={handleChangePromt}/>
                            </div>
                            <label for="basic-url" class="form-label">Подсказка опции Рассрочка</label>
                            <div class="input-group mb-3 w-50">
                                <input type="text" class="form-control" value={promtCredit} onChange={handleChangePromtCredit}/>
                            </div>
                            <label for="basic-url" class="form-label">Email для заявки менеджеру</label>
                            <div class="input-group mb-3 w-50">
                                <input type="text" class="form-control" value={email_manager} onChange={handleChangeEmailManager}/>
                            </div>
                            <div className='ms-0 row w-50 d-flex justify-content-end'>
                                <div className='w-25 m-0 p-0'>
                                    <Button handleClick={handleSaveSettings} text={'Сохранить'}/>
                                    <div className='h-text d-flex justify-content-center'>
                                        {messageRes}
                                    </div>
                                </div>
                                
                            </div>
                        </div>:
                        null
                    }
                </div>
            ): null}
            
        </>
    );
}



