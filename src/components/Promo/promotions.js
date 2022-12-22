import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import ReactQuill from "react-quill"
import TextareaAutosize from 'react-textarea-autosize';
import './style.css'
import { Header } from '../Header/header';
import { Button } from '../Buttons/button';
import { URL as Url} from '../../static/Const/vars';
import { Footer } from '../Home/footer';
import { sendGetPromo, sendDelPromo } from './promoapi';
import { PromoCard } from './promocard';

export function Promotions(props) {

    const [listPromo, setListPromo] = useState([])
    const [showModalNewPromo, setShowModalNewPromo] = useState(false)
    const [title, setTitle] = useState('')
    const [textNews, setTextNews] = useState('')
    const [selectFile, setSelectFile] = useState(null)
    const [convertedText, setConvertedText] = useState("Some default content");
    let xhr = new XMLHttpRequest();

    const handleDelPromo = (id) => {
        sendDelPromo({id: id}, function(data) {
            handleGetPromo()
        })
    }

    const renderedListPromo = listPromo.map(promo => {
        return (
            <>
                <PromoCard
                    id={promo.id}
                    title={promo.title}
                    text={promo.text}
                    img_url={promo.img_url}
                    handleDelPromo={handleDelPromo}
                    isCustomer={props.isCustomer}
                />
            </>
        )
    })

    const handleGetPromo = () => {
        sendGetPromo({}, function(data) {
            setListPromo(data.promo)
        })
    }

    const handleAddPromo = () => {
        if (selectFile === null ) {
            
        }
        else {
            let formData = new FormData();
            formData.append('message_files', selectFile);
                                            
            
            formData.append("title", title);
            formData.append("text", convertedText);

            xhr.open('POST', Url + '/newpromo')
            // xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:5000/file')
            xhr.upload.addEventListener('progress', function(e) {
            });
            xhr.addEventListener('load', function(e) {
                handleGetPromo()
                alert('Новость создана')
                setShowModalNewPromo(false)
            });
            xhr.addEventListener('abort', event => {
                alert('Отправка отменена')
            })
            xhr.send(formData)
            // setXHR(xhr)
        }
    }

    const handleShowAddPromo = () => {
        setShowModalNewPromo(true)
    }

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          width: '50vw',
          transform: 'translate(-50%, -50%)',
        },
    };

    useEffect(() => {
        handleGetPromo()
    }, [])
    return (
        <>
            <Modal
                isOpen={showModalNewPromo}
                // onAfterOpen={afterOpenModal}
                // onRequestClose={closeModal}
                style={customStyles}
            >
                    <div>
                        <div className='cur-p' onClick={() => {setShowModalNewPromo(false)}}>Закрыть</div>
                        <h3>
                            Новая акция
                        </h3>
                        <div>
                            {/* <label>Заголовок</label> */}
                            {/* <input type="text" className="form-control bg-lg" value={title} 
                                onChange={(e) => {
                                        setTitle(e.target.value)
                                    }
                                }
                            /> */}
                        </div>
                        <div>
                            <label>Текст</label>
                            <ReactQuill
                                theme='snow'
                                value={convertedText}
                                onChange={setConvertedText}
                                style={{maxHeight: '300px'}}
                            />
                        </div>
                        <div>
                            <label>Изображение</label>
                            <div>

                            </div>
                            <input id='promofile' name='promofile' type="file" 
                                        onChange={() => {
                                            let files = document.getElementById("promofile")
                                            setSelectFile(files.files[0])                                            
                                        }}
                            />
                        </div>
                        <div className='mt-2'>
                            <img className='w-50' src={selectFile !== null ? URL.createObjectURL(selectFile): ''} alt=''/>
                        </div>
                        <div className='d-flex justify-content-end'>
                            <div className='w-25'>
                                <Button text={'Добавить'} handleClick={handleAddPromo}/>
                            </div>
                        </div>
                    </div>
            </Modal>
            <Header 
                menuText={props.menuText} 
                menuItemText={props.menuItemText}
            />
            <div className='p-5 container-promo'>
                <h3>Акции</h3>
                {props.isCustomer ? 
                    (
                        <div className='d-flex justify-content-end'>
                            <div className='w-25'>
                                <Button text={'Добавить'} handleClick={handleShowAddPromo}/>
                            </div>
                        </div>
                    ): 
                    null
                }
                <div className='d-flex flex-wrap'>
                    {renderedListPromo}
                </div>
            </div>

            <Footer/>
        </>
    )
}