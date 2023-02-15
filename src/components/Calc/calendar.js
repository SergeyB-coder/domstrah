import React, { useState } from 'react';
import DatePicker, { CalendarContainer } from "react-datepicker";
import './style.css'

export function Calendar(props) {
    const handleChangeDate = props.handleChangeDate
    const startDate = props.startDate
    const [showMonthPicker, setShowMonthPicker] = useState(false);
    const [showYeahrPicker, setShowYeahrPicker] = useState(false);

    let curentYear = props.last_yeahr ? props.last_yeahr: new Date().getFullYear()
    let years = [...Array(curentYear - 1920).keys()].map(i => i + 1920);

    const months = [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
    ];

    const handleClickMonth = () => {
        setShowMonthPicker(!showMonthPicker)
        setShowYeahrPicker(false)
    }

    
    const handleClickYeahr = () => {
        setShowYeahrPicker(!showYeahrPicker)
        setShowMonthPicker(false)
    }

    // const MyContainer = ({ className, children }) => {
    //     return (
    //       <div style={{ padding: "2px", background: "#216ba5", color: "#fff" , width: '100vw'}}>
    //         <CalendarContainer className={className} style={{ width: '100vw'}}>
    //           <div style={{ background: "#f0f0f0" }}>
    //             What is your favorite day?
    //           </div>
    //           <div style={{ position: "relative", width: '100vw' }}>{children}</div>
    //         </CalendarContainer>
    //       </div>
    //     );
    //   };

    

    return (
        <DatePicker
            dateFormat="dd-MM-yyyy"
            // withPortal
            renderCustomHeader={({
                date,
                changeYear,
                changeMonth,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
            }) => (
                <div
                    style={{
                        margin: 10,
                        display: "flex",
                        justifyContent: "center",
                        position: 'relative'
                    }}
                >
                    <svg className='arrow-header' onClick={decreaseMonth} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-caret-left-fill" viewBox="0 0 16 16">
                        <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                    </svg>
                    
                    <div className='btn-header f-raleway-reg-pol cur-p' onClick={handleClickYeahr}>
                        {date.getFullYear()}
                    </div>

                    <div className='btn-header f-raleway-reg-pol' onClick={handleClickMonth}>
                        {months[date.getMonth()]}
                    </div>

                    <svg className='arrow-header' onClick={increaseMonth} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
                        <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                    </svg>

                    {showMonthPicker ? (
                        <div className='container-month-picker'>
                            {months.map(month => {
                                return (
                                    <>
                                        <div className='month-item' 
                                            onClick={() => {
                                                setShowMonthPicker(false)
                                                changeMonth(months.indexOf(month))
                                            }}>

                                            {month}
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                    ): null}

                    {showYeahrPicker ? (
                        <div className='container-yeahr-picker'>
                            {years.map(yeahr => {
                                return (
                                    <>
                                        <div className='month-item' 
                                            onClick={() => {
                                                setShowYeahrPicker(false)
                                                changeYear(yeahr)
                                            }}>

                                            {yeahr}
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                    ): null}
                </div>
            )}
            selected={startDate}
            onChange={(date) => handleChangeDate( date)}
            
            // calendarClassName='calendar-container'
            // calendarContainer={MyContainer}
            // dayClassName={() => 'day'}
            className={props.className ? props.className:'birthday f-s  f-raleway-reg-pol'}
        />
    )
}   