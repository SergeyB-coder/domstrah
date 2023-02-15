import { useState } from "react"
import { useDispatch } from "react-redux"
import { digitNumber } from "../../features/funcs"
import { setTypeObject } from "./calcSlice"

export function DoubleInsurance(props) {
    return (
        <div className="double-insurance">
            <div className="f-raleway-x-mini-g">{props.insurance_info1}</div>
            <div className="f-raleway-x-mini-g">{props.insurance_info2}</div>
        </div>
    )     
}

export function CreditInfo6(props) {
    return (
        <>
            {props.premiumSum >=5000 ?
                <div className='row mx-0 p-0 mb-0 mt-2'>    
                    <div className='col-6 m-0 py-0 credit-info-month px-2 f-raleway-xs d-flex align-items-center'>
                        {`${Math.round(props.premiumSum/6)}р x 6`}
                    </div>
                    <div className='col-6 f-raleway-12 text-nowrap'>
                        в рассрочку
                        <span className='position-relative'
                            onMouseEnter={() => {
                                props.setShowPromtCredit(true)
                            }
                            }
                            onMouseLeave={() => {
                                props.setShowPromtCredit(false)
                            }}
                        >
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 15.75C12.7279 15.75 15.75 12.7279 15.75 9C15.75 5.27208 12.7279 2.25 9 2.25C5.27208 2.25 2.25 5.27208 2.25 9C2.25 12.7279 5.27208 15.75 9 15.75Z" stroke="#2CA5EC" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M9 10.6875V10.125C9.44501 10.125 9.88002 9.99304 10.25 9.74581C10.62 9.49857 10.9084 9.14717 11.0787 8.73604C11.249 8.32491 11.2936 7.87251 11.2068 7.43605C11.12 6.99959 10.9057 6.59868 10.591 6.28401C10.2763 5.96934 9.87541 5.75505 9.43895 5.66823C9.0025 5.58142 8.5501 5.62597 8.13896 5.79627C7.72783 5.96657 7.37643 6.25496 7.12919 6.62497C6.88196 6.99498 6.75 7.42999 6.75 7.875" stroke="#2CA5EC" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M9 13.7812C9.46599 13.7812 9.84375 13.4035 9.84375 12.9375C9.84375 12.4715 9.46599 12.0938 9 12.0938C8.53401 12.0938 8.15625 12.4715 8.15625 12.9375C8.15625 13.4035 8.53401 13.7812 9 13.7812Z" fill="#2CA5EC"/>
                            </svg>
                            {props.showPromtCredit ? <div className='font-raleway-700 fs-12 promt-credit text-wrap'>{props.promtCredit}</div>: null}
                        </span>
                    </div>
                </div>: null
            }
        </>
    )
}


export function DropDown(props) {
    const dispatch = useDispatch()
    const value = props.value
    const handleSelectItem = props.handleSelectItem
    // const [value, setValue] = useState(props.listItem[0].text)
    const [showList, setShowList] = useState(false)
    const listItem = props.listItem
    const renderedListItems = listItem.map(item => {
        return (
            <>
                <div className="list-item f-raleway-x-mini" 
                    onClick={() => {
                        handleSelectItem(item.text)
                        dispatch(setTypeObject(item.text))
                        setShowList(false)
                    }}>
                    {item.text}<span className="item-comment">{item.comment}</span>
                </div>
            </>
        )
    })

    const handleClickValue = () => {
        setShowList(!showList)
    }

    return (
        <>
            <div className="dorop-down-container">
                <div className="value-item f-raleway-x-mini" onClick={handleClickValue}>
                    {value}
                    <span className="value-item-arrow">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </span>
                </div>
                {showList ? <div className="list-container">{renderedListItems}</div>: null}
            </div>
            
        </>
    )     
}


export function RangeInput(props) {
    const handleChangeTextInput = (e) => {
        if (!isNaN(e.target.value[e.target.value.length-1])) {
            props.setValue(e.target.value)
        }
        
    }

    const handleChangeRangeInput = (e) => {
        props.setValue(e.target.value)
    }

    return (
        <>
            <div className="position-relative">
                <input id='text-input' type="text" className="form-control bg-lg w-100" value={digitNumber(props.value.toString())} 
                    onChange={handleChangeTextInput}
                
                />
                <input type="range" className="form-range pos-input-range" max={props.max} value={props.value}
                    onChange={handleChangeRangeInput}
                />
            </div>
            
        </>
    )
}

export function AnswerInfo(props) {
    const setShowPromt = props.setShowPromt
    const showPromt = props.showPromt
    const promt = props.promt
    return (
        <>
            <span className=' position-relative cur-p '
                onMouseEnter={() => {
                        setShowPromt(true)
                    }
                }
                onMouseLeave={() => {
                    setShowPromt(false)
                }
            }
            >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 15.75C12.7279 15.75 15.75 12.7279 15.75 9C15.75 5.27208 12.7279 2.25 9 2.25C5.27208 2.25 2.25 5.27208 2.25 9C2.25 12.7279 5.27208 15.75 9 15.75Z" stroke="#2CA5EC" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 10.6875V10.125C9.44501 10.125 9.88002 9.99304 10.25 9.74581C10.62 9.49857 10.9084 9.14717 11.0787 8.73604C11.249 8.32491 11.2936 7.87251 11.2068 7.43605C11.12 6.99959 10.9057 6.59868 10.591 6.28401C10.2763 5.96934 9.87541 5.75505 9.43895 5.66823C9.0025 5.58142 8.5501 5.62597 8.13896 5.79627C7.72783 5.96657 7.37643 6.25496 7.12919 6.62497C6.88196 6.99498 6.75 7.42999 6.75 7.875" stroke="#2CA5EC" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 13.7812C9.46599 13.7812 9.84375 13.4035 9.84375 12.9375C9.84375 12.4715 9.46599 12.0938 9 12.0938C8.53401 12.0938 8.15625 12.4715 8.15625 12.9375C8.15625 13.4035 8.53401 13.7812 9 13.7812Z" fill="#2CA5EC"/>
                </svg>
                {showPromt ? <div className='font-raleway-700 fs-12 promt text-wrap'>{promt}</div>: null}

            </span>
        </>
    )
    
}