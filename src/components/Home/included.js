import React from 'react';
import backgroundIncludeCard1 from '../../static/include-morgage-card1.png'
import backgroundIncludeCard2 from '../../static/include-morgage-card2.png'
export function Included() {
    return (
        <>
            <div className=''>
                        <div className='title-include-morgage'>Что входит в ипотечное страхование</div>
                        <div className='conrainer-include-card'>
                            <div className='d-flex row'>
                                <div className='position-relative col-3 overflow-hidden rounded cur-p include-prom-card mt-3'>
                                    <div className=' '>
                                        <img className='w-100 br-5' src={backgroundIncludeCard1} alt=''/>
                                    </div>
                                    <div className='include-mortgage-card'
                                    >
                                        <div className='f-raleway-reg-pol my-3'>Страховка объекта</div>
                                        <div className='f-raleway-x-mini-g text-wrap'>
                                            Страхование конструктивных элементов. В случае гибели, страховая компания выплатит банку остаток задолженности по ипотечному кредиту. Страховка оформляется после регистрации права на объект недвижимости. В случае со вторичным жильем — сразу после завершения ипотечной сделки
                                        </div>
                                    </div>
                                </div>
                                <div className='end-block position-relative col-3 overflow-hidden rounded cur-p include-prom-card mt-3'>
                                    <div className=' '>
                                        <img className='w-100 br-5' src={backgroundIncludeCard2} alt=''/>
                                    </div>
                                    <div className='include-mortgage-card'
                                    >
                                        <div className='f-raleway-reg-pol my-3'>Жизнь и здоровье</div>
                                        <div className='f-raleway-x-mini-g'>
                                            Страхуются риски получения инвалидности 1 или 2 группы, а также смерти застрахованного. В любом из этих случаев страхования компания полностью погасит остаток задолженности по ипотеке банку.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
        </>
    )
}