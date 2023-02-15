import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './style.css'
import ReactQuill from "react-quill"
import { Button } from '../Buttons/button';
import { URL as Url } from '../../static/Const/vars';

import { selectBannerIsOn, selectBannerUrl, selectBannerUrlMobile, setBannerIsOn } from '../Home/homeSlice';

export function BannerEdit() {
    const dispatch = useDispatch();
    let xhr = new XMLHttpRequest();
    const [BannerFile, setBannerFile] = useState(null)
    const [BannerFileMobile, setBannerFileMobile] = useState(null)
    const [BannerPromoFile, setBannerPromoFile] = useState(null) 
    const [convertedText, setConvertedText] = useState("Введите текст промоакции");
    const bannerIsOn = useSelector(selectBannerIsOn)
    const banner_url = useSelector(selectBannerUrl)
    const banner_url_mobile = useSelector(selectBannerUrlMobile)

    const handleChangeSwitchBanner = (e) => {
        dispatch(setBannerIsOn(!bannerIsOn))
    }

    const handleSaveBannerPromo = () => {
        if (BannerPromoFile === null ) {
            alert('Прикрепите файл изображения')
        }
        else {
            let formData = new FormData();
            formData.append('message_files', BannerPromoFile);
            
            formData.append("text", convertedText);

            xhr.open('POST', Url + '/savebannerpromo')
            xhr.upload.addEventListener('progress', function(e) {
            });
            xhr.addEventListener('load', function(e) {
                alert('Изменеия сохранены')
            });
            xhr.addEventListener('abort', event => {
                alert('Отправка отменена')
            })
            xhr.send(formData)
        }
    }

    const handleAddBanner = () => {
        
        if (BannerFile === null && banner_url === null ) {
            alert('Добавьте файл')
        }
        else {
            let formData = new FormData();
            let is_banner_file = 0
            let is_banner_file_mobile = 0
            if (BannerFile !== null) {
                formData.append('message_files', BannerFile);
                is_banner_file = 1
            }
            if (BannerFileMobile !== null) {
                console.log('mobilefile is')
                formData.append('message_files', BannerFileMobile);
                is_banner_file_mobile = 1
            }
                                            
            
            formData.append("is_on", bannerIsOn);
            formData.append("is_banner_file", is_banner_file);
            formData.append("is_banner_file_mobile", is_banner_file_mobile);

            xhr.open('POST', Url + '/banner')
            // xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:5000/file')
            xhr.upload.addEventListener('progress', function(e) {
            });
            xhr.addEventListener('load', function(e) {
                // handleGetPromo()
                alert('Баннер добавлен', e)
                // setShowModalNewPromo(false)
            });
            xhr.addEventListener('abort', event => {
                alert('Отправка отменена')
            })
            xhr.send(formData)
        }
    }

    return (
        <div>
            <div className='row'> 
                <div className='col-7'>
                    <input id='bannerfile' name='bannerfile' type="file" 
                                onChange={() => {
                                    let files = document.getElementById("bannerfile")
                                    setBannerFile(files.files[0])                                            
                                }}
                    />
                </div>
                
                <div classname="col-3 form-check form-switch">
                    <input classname="form-check-input" type="checkbox" role="switch" checked={bannerIsOn} onChange={handleChangeSwitchBanner}/>
                    <label classname="form-check-label f-raleway-12">Отображение на главной странице</label>
                </div>
            </div>
            
            <div className='mt-2'>
                <img className='w-50' 
                    src={BannerFile !== null ? URL.createObjectURL(BannerFile): 
                        (banner_url !== null ? (Url + '/static/uploads/' + banner_url): null)} 
                    alt=''
                />
            </div>
            <div className='my-3 border p-2 rounded'>
                <label>Для мобильной версии</label>
                <div className='mt-3'>
                    <input id='bannerfilemobile' name='bannerfilemobile' type="file" 
                                onChange={() => {
                                    let files = document.getElementById("bannerfilemobile")
                                    setBannerFileMobile(files.files[0])                                            
                                }}
                    />
                </div>
                <img className='w-50' 
                    src={BannerFileMobile !== null ? URL.createObjectURL(BannerFileMobile): 
                        (banner_url_mobile !== null ? (Url + '/static/uploads/' + banner_url_mobile): null)} 
                    alt=''
                />
            </div>
            <div className='d-flex justify-content-end'>
                <div className='w-25'>
                    <Button text={'Сохранить'} handleClick={handleAddBanner}/>
                </div>
            </div>

            <div>
                <h3>
                    Баннер-акция
                </h3>
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
                    <input id='promobannerfile' name='promofile' type="file" 
                                onChange={() => {
                                    let files = document.getElementById("promobannerfile")
                                    setBannerPromoFile(files.files[0])                                            
                                }}
                    />
                </div>
                <div className='mt-2'>
                    <img className='w-50' src={BannerPromoFile !== null ? URL.createObjectURL(BannerPromoFile): ''} alt=''/>
                </div>
                <div className='d-flex justify-content-end'>
                    <div className='w-25'>
                        <Button text={'Сохранить'} handleClick={handleSaveBannerPromo}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

