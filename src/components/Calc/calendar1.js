import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './style.css'

export function Calendar1(props) {
    const [value, onChange] = useState(new Date());

    return (
        <div className='container-calendar1'>
            <Calendar onChange={onChange} value={value} />
        </div>
    )
}