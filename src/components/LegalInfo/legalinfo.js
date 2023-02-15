import React, { useState } from 'react';
import './style.css'
import { Header } from '../Header/header';
import { Footer } from '../Home/footer';
import { Rules } from './rules';
import { Questions } from './qustions';
import { Tarifs } from './tarifs';

export function LegalInfo(props) {
    const [navButton, setNavButton] = useState('rules')

    const customStyles = {
        navquestions: {
            background: navButton === 'questions' ? 'rgba(0, 0, 0, 0.02)': null,
            cursor: 'pointer',
            color: navButton === 'questions' ? '#2CA5EC': 'rgba(29, 29, 29, 0.5)',
        },
        navrules: {
            background: navButton === 'rules' ? 'rgba(0, 0, 0, 0.02)': null,
            cursor: 'pointer',
            color: navButton === 'rules' ? '#2CA5EC': 'rgba(29, 29, 29, 0.5)',
        },
        tarifs: {
            background: navButton === 'tarifs' ? 'rgba(0, 0, 0, 0.02)': null,
            cursor: 'pointer',
            color: navButton === 'tarifs' ? '#2CA5EC': 'rgba(29, 29, 29, 0.5)',
        },
    }

    const handleQuestionsClick = () => {
        setNavButton('questions')
    }

    const handleRulesClick = () => {
        setNavButton('rules')
    }

    const handleTarifsClick = () => {
        setNavButton('tarifs')
    }

    return (
        <>
            <Header/>
            
            <div className='container-legal'>
                <div className='f-raleway-xl'>Правовая информация </div>     
                <div className='row p-2 menu-customer mt-4'>
                        <div className='col-3 m-1 d-flex justify-content-center rounded' style={customStyles.navquestions}
                            onClick={handleQuestionsClick}
                        >
                            Вопросы и ответы
                        </div>
                        <div className='col-3 m-1 d-flex justify-content-center rounded' style={customStyles.navrules}
                            onClick={handleRulesClick}
                        >
                            Правила страхования
                        </div>      
                        <div className='col-3 m-1 d-flex justify-content-center rounded' style={customStyles.tarifs}
                            onClick={handleTarifsClick}
                        >
                            Тарифы
                        </div>  
                </div>
                <div>
                    {navButton === 'rules' ? <Rules/>: null}
                    {navButton === 'questions' ? <Questions/>: null}
                    {navButton === 'tarifs' ? <Tarifs/>: null}
                </div>
            </div>
            <Footer/>
        </>
    )
}