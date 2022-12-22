import React, { useState } from 'react';
import { Button } from '../Buttons/button';
import './style.css'

export function ErrMessage(props) {
    const message = props.message
    const setShowErrMessage = props.setShowErrMessage
    const handleManager = () => {
        setShowErrMessage(false)
        props.setShowFormManager(true)
    }
    return (
        <>
            <div onClick={() => {setShowErrMessage(false)}}>Закрыть</div>
            <div>
                {message}
            </div>
            <Button text='Заявка менеджеру' handleClick={handleManager}/>
        </>
    )
}