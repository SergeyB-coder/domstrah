import React, { useState } from 'react';
import BounceLoader from "react-spinners/BounceLoader";
import './style.css'

export function ButtonBuy(props) {
    const customStyles = {

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
      };
    return (
        <div className='button-buy d-flex justify-content-center align-items-center'
            onClick={props.handleClick}
        >
            <label className='label-button-test p-2'>
                {/* {props.text} */}
                { props.isLoad ? 
                    (
                        <BounceLoader  color={'#2CA5EC'} loading={true} cssOverride={customStyles.spinner} size={20} />
                    ):(
                        props.text
                    )
                }
            </label>
            
            
        </div>
    )
}