import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import TextareaAutosize from 'react-textarea-autosize';
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'

import './style.css'
import { Header } from '../Header/header';
import { Button } from '../Buttons/button';
import { URL as Url} from '../../static/Const/vars';
import { sendGetNews, sendDelNews } from './newsapi';
import { NewsCard } from './newscard';
import { Footer } from '../Home/footer';

const news = [
    {text: 'Новость 1', src_img: 'http://c61437.na4u.ru/static/news/news1.png'},
    {text: 'Новость 2', src_img: 'http://c61437.na4u.ru/static/news/news2.png'},
    {text: 'Новость 3', src_img: 'http://c61437.na4u.ru/static/news/news3.png'},
    {text: 'Новость 4', src_img: 'http://c61437.na4u.ru/static/news/news5.jpg'},
]
export function News(props) {

    const [listNews, setListNews] = useState([])
    const [showModalNewNews, setShowModalNewNews] = useState(false)
    const [title, setTitle] = useState('')
    const [textNews, setTextNews] = useState('')
    const [selectFile, setSelectFile] = useState(null)
    const [convertedText, setConvertedText] = useState("Some default content");
    let xhr = new XMLHttpRequest();

    const handleDelNews = (id) => {
        sendDelNews({id: id}, function(data) {
            handleGetNews()
        })
    }

    const renderedListNews = listNews.map(news => {
        return (
            <>
                <NewsCard
                    id={news.id}
                    title={news.title}
                    img_url={news.img_url}
                    handleDelNews={handleDelNews}
                    isCustomer={props.isCustomer}
                />
            </>
        )
    })

    const handleGetNews = () => {
        sendGetNews({}, function(data) {
            setListNews(data.news)
        })
    }

    const handleAddNews = () => {
        if (selectFile === null ) {
            
        }
        else {
            let formData = new FormData();
            formData.append('message_files', selectFile);
                                            
            
            formData.append("title", title);
            // formData.append("text", textNews);
            formData.append("text", convertedText);

            xhr.open('POST', Url + '/newnews')
            // xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:5000/file')
            xhr.upload.addEventListener('progress', function(e) {
            });
            xhr.addEventListener('load', function(e) {
                handleGetNews()
                alert('Новость создана')
                setShowModalNewNews(false)
            });
            xhr.addEventListener('abort', event => {
                alert('Отправка отменена')
            })
            xhr.send(formData)
            // setXHR(xhr)
        }
    }

    const handleShowAddNews = () => {
        setShowModalNewNews(true)
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
        handleGetNews()
    }, [])
    return (
        <>
            <Modal
                isOpen={showModalNewNews}
                // onAfterOpen={afterOpenModal}
                // onRequestClose={closeModal}
                style={customStyles}
            >
                    <div>
                        <div className='cur-p' onClick={() => {setShowModalNewNews(false)}}>Закрыть</div>
                        <h3>
                            Новая новость
                        </h3>
                        <div>
                            <label>Заголовок</label>
                            <input type="text" className="form-control bg-lg" value={title} 
                                onChange={(e) => {
                                        setTitle(e.target.value)
                                    }
                                }
                            />
                        </div>
                        <div className='overflow-auto h-100'>
                            <label>Текст</label>
                            {/* <TextareaAutosize  
                                        type="text" 
                                        className="form-control nores" 
                                        value={textNews} 
                                        placeholder="Текст" 
                                        onChange={(e) => {
                                                setTextNews(e.target.value)
                                            }
                                        }
                                    /> */}
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
                            <input id='myfile' name='myfile' type="file" 
                                        onChange={() => {
                                            let files = document.getElementById("myfile")
                                            setSelectFile(files.files[0])                                            
                                        }}
                            />
                        </div>
                        <div className='mt-2'>
                            <img className='w-50' src={selectFile !== null ? URL.createObjectURL(selectFile): ''} alt=''/>
                        </div>
                        <div className='d-flex justify-content-end'>
                            <div className='w-25'>
                                <Button text={'Добавить'} handleClick={handleAddNews}/>
                            </div>
                        </div>
                    </div>
            </Modal>
            <Header 
                menuText={props.menuText} 
                menuItemText={props.menuItemText}
            />
            <div className='p-5'>
                <h3 className='ml-5'>Новости</h3>
                {props.isCustomer ? 
                    (
                        <div className='d-flex justify-content-end'>
                            <div className='w-25'>
                                <Button text={'Добавить'} handleClick={handleShowAddNews}/>
                            </div>
                        </div>
                    ): 
                    null
                }
                <div className='d-flex flex-wrap ml-4'>
                    {renderedListNews}
                </div>
            </div>

            <Footer/>
        </>
    )
}