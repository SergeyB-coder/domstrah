import React, { useState, useEffect } from 'react';
import FolderTree, { testData } from 'react-folder-tree';
import { BsPlusCircle } from "react-icons/bs";
import {BiMinusCircle} from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import 'react-folder-tree/dist/style.css';
import BounceLoader from "react-spinners/BounceLoader";

import './style.css'
import { Header } from '../Header/header';
import { sendGetObjects } from './objectsapi';
import {ObjectItem } from './objectitem'
import { Footer } from '../Home/footer';


  

export function Objects(props) {
    const navigate = useNavigate();
    const [showInfoObject, setShowInfoObject] = useState(false)
    const [modalLoadIsOpen, setModalLoadIsOpen] = useState(false)

    const EditIcon = (...args) => null;
    const FolderIcon = (...args) => null;
    const FolderOpenIcon = (...args) => null;
    const FileIcon = (...args) => null;
    
    const CaretRightIcon = ({ onClick: defaultOnClick, nodeData }) => {
        const {
          path,
          name,
          checked,
          isOpen,
          ...restData
        } = nodeData;
    
        // custom event handler
        const handleClick = () => {   
        //   doSthBad({ path, name, checked, isOpen, ...restData });
    
          defaultOnClick();
        };
    
        // custom Style
        return <BsPlusCircle onClick={ handleClick } />;
      };

    const CaretDownIcon = ({ onClick: defaultOnClick, nodeData }) => {
        const {
          path,
          name,
          checked,
          isOpen,
          ...restData
        } = nodeData;
    
        // custom event handler
        const handleClick = () => {   
        //   doSthBad({ path, name, checked, isOpen, ...restData });
    
          defaultOnClick();
        };
    
        // custom Style
        return <BiMinusCircle onClick={ handleClick } />;
      };
    
      

    const onNameClick = ({ defaultOnClick, nodeData }) => {
        defaultOnClick();
      
        const {
          // internal data
          path, name, checked, isOpen, ind, developer, project_declaration, class_object, walls,
          num_floors, num_flats, commissioning, issuance_keys,
          // custom data
          url, ...whateverRest
        } = nodeData;
      
        props.setInfoObject(
          {
            name: name, 
            developer: developer, 
            project_declaration: project_declaration,
            class_object: class_object,
            walls: walls,
            num_floors: num_floors,
            num_flats: num_flats,
            commissioning: commissioning,
            issuance_keys: issuance_keys,
          })
        // setShowInfoObject(true)
        navigate('/objects/' + ind.toString(), {replace: true})
      };

    const handleGetObjects = () => {
        sendGetObjects({user_id: props.userId}, function(data) {
            if (data.res) {
                let dicObjects = {
                    name: 'Новостройки',
                    isOpen: true,   // this folder is opened, we can see it's children
                    children: [
                        {   name: 'Россия', 
                            children: [
                            ], 
                        },
                    ],
                  };
                for (let k in data.data) {
                    dicObjects.children[0].children.push(
                        {
                            name: k,
                            children: []
                        }
                    )
                    if (data.data[k] !== undefined) {
                      for (let i=0; i<data.data[k].length; i++ ) {
                            dicObjects.children[0].children[dicObjects.children[0].children.length - 1].children.push(
                                {
                                    ind: data.data[k][i].ind,
                                    name: data.data[k][i].name,
                                    developer: data.data[k][i].company,
                                    project_declaration: data.data[k][i].declar,
                                    class_object: data.data[k][i].class_estate,
                                    walls: data.data[k][i].walls,
                                    num_floors: data.data[k][i].q_floors,
                                    num_flats: data.data[k][i].q_flats,
                                    commissioning: data.data[k][i].commiss,
                                    issuance_keys: data.data[k][i].get_keys,
                                    addres: data.data[k][i].address,
                                }
                            )
                        }

                    }
                }    
                props.setDataObject(dicObjects)
                setModalLoadIsOpen(false)
            }
        })
    }

    const BasicTree = () => {
        const onTreeStateChange = (state, event) => {};
      
        return (
          <FolderTree
            data={ props.dataObject }
            onChange={ onTreeStateChange }
            showCheckbox={ false }
            initOpenStatus={ 'closed' }
            onNameClick={ onNameClick }
            iconComponents={{
                EditIcon,
                FolderIcon,
                FolderOpenIcon,
                CaretRightIcon,
                CaretDownIcon,
                FileIcon,
                /* other custom icons ... */
              }}
          />
        );
      };

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

    useEffect(() => {
        // setModalLoadIsOpen(true)
        handleGetObjects()
        props.setMenuText('Новостройки')
        props.setMenuItemText('Страхование ипотеки')
        
    }, [])
    return (
        <>
            <BounceLoader  color={'#24A200'} loading={modalLoadIsOpen} cssOverride={customStyles.spinner} size={80} />
            <Header 
              setUserId={props.setUserId}
              menuText={props.menuText} 
              menuItemText={props.menuItemText}
            />
            <div className='container-objects'>
              { !showInfoObject ? (
                  <div className='ms-10'>
                      <h5 className='my-3'>Новостройки</h5>
                      <BasicTree/>
                  </div>
              ): (
                  <ObjectItem  
                    userId={props.userId}  
                    setUserId={props.setUserId}
                  />
              )} 
            </div>
              
            <Footer/>         
        </>
    );
}
