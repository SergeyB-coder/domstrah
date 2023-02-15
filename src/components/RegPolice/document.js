import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectInsuranceCompany, selectInsuranceCompany2 } from "../Calc/calcSlice";
import { Calendar } from "../Calc/calendar";
import { selectMortgageBalance, setMortgageBalance } from "../Home/homeSlice";
import { selectAgr_credit_number, selectBirthday, selectDateBegin, selectDateCredit, selectDateCreditEnd, setAgr_credit_number, setDateBegin, setDateCredit, setDateCreditEnd } from "./regpoliceSlice";
import { digitNumber } from '../../features/funcs';

export function Document(props) {
    const handlePrev = props.handlePrev
    const handleNext = props.handleNext
    const dispatch = useDispatch()
    const mortgageBalance = useSelector(selectMortgageBalance)
    const agr_credit_number = useSelector(selectAgr_credit_number)
    const insuranceCompany = useSelector(selectInsuranceCompany)
    const insuranceCompany2 = useSelector(selectInsuranceCompany2)
    const dateBegin = useSelector(selectDateBegin)
    const dateCredit = useSelector(selectDateCredit)
    const dateCreditEnd = useSelector(selectDateCreditEnd)

    const [annualRate, setAnnualRate] = useState(10)
    const [monthlyPay, setMonthlyPay] = useState(0)

    const handleChangeMortgageBalance = (e) => {
        if (!isNaN(e.target.value)) {
            dispatch(setMortgageBalance(e.target.value))
        }
    }
    function handleChangeDate(date) {
        dispatch(setDateBegin(date))
    }

    function handleChangeDateCredit(date) {
        dispatch(setDateCredit(date))
    }

    function handleChangeDateCreditEnd(date) {
        dispatch(setDateCreditEnd(date))
    }

    const handleChangeAnnualRate = (e) => {
        if (e.target.value <= 70) {
            setAnnualRate(e.target.value)
        }
    }

    const handleChangeMonthlyPay = (e) => {
        setMonthlyPay(e.target.value)
    }

    return (
        <>
            <div className='container-data'>
                            <div className='f-raleway-m'>Ипотечный договор</div>
                            <div className='row d-flex justify-content-between mt-3'>
                                <div className='col-bank-4 f-raleway-reg-pol'>
                                    <label>Банк-Кредитор</label>
                                    <input className='form-control inp-holder' type="text" placeholder='Сбербанк' disabled={true}/>
                                </div>
                                <div className='col-balance-4 f-raleway-reg-pol'>
                                    <label className='text-nowrap'>Остаток по ипотеке</label>
                                    <input className='form-control inp-holder' type="text" value={mortgageBalance} onChange={handleChangeMortgageBalance}/>
                                </div>
                                <div className='col-creditnumber-4 f-raleway-reg-pol me-3'>
                                    <label>Номер кредитного договора</label>
                                    <input className='form-control inp-holder' type="text" value={agr_credit_number} 
                                        onChange={(e) => dispatch(setAgr_credit_number(e.target.value)) }
                                    />
                                </div>
                            </div>

                            {insuranceCompany === 'Зетта Страхование' || insuranceCompany2 === 'Зетта Страхование' ? 
                                <div className="row mt-3 d-flex justify-content-between">
                                    
                                    <div className='col-credit-4 f-raleway-reg-pol'>
                                        <label>Дата кредитного договора</label>
                                        <Calendar handleChangeDate={handleChangeDateCredit} startDate={dateCredit} className='month-pay-input'/>
                                    </div>
                                    <div className='col-credit-4 f-raleway-reg-pol'>
                                        <label>Дата окончания кредитного договора</label>
                                        <Calendar handleChangeDate={handleChangeDateCreditEnd} startDate={dateCreditEnd} className='month-pay-input' last_yeahr={2076}/>
                                    </div>
                                    <div className='col-credit-4 f-raleway-reg-pol'>
                                        <label>Годовая ставка %</label>
                                        <input  className='month-pay-input' type='number' value={annualRate} onChange={handleChangeAnnualRate}/>
                                    </div>
                                    <div className='col-credit-4  f-raleway-reg-pol d-flex justify-content-end me-3'>
                                        <div className="month-pay">
                                            <label>Ежемесячный платеж</label>
                                            <input  className='month-pay-input' value={digitNumber(monthlyPay)} onChange={handleChangeMonthlyPay}/>
                                        </div>
                                    </div>
                                </div>:
                            null}
                                
                            

                            <div className='f-raleway-m mt-3'>Полис</div>
                            <div className='row mt-3'>
                                <div className='col-datebegin-4 f-raleway-reg-pol'>
                                    <label>Дата начала действия полиса</label>
                                    {/* <DatePicker 
                                        selected={dateBegin} 
                                        onChange={(date) => setDateBegin(date)} 
                                        className='birthday-reg fs ps-2 w-100'
                                        dateFormat="dd-MM-yyyy"
                                    /> */}
                                    <Calendar handleChangeDate={handleChangeDate} startDate={dateBegin} className='month-pay-input'/>
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