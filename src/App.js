import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import './App.css';
import { Home } from './components/Home/home';
import { Login } from './components/Login/login';
import { Policies } from './components/Policies/policies';
import { Person } from './components/Person/person';
import { Objects } from './components/Objects/objects';
import { ObjectItem } from './components/Objects/objectitem';
import { Promotion } from './components/Home/promotion';
import { Promotions } from './components/Promo/promotions';
import { News } from './components/News/news';
import { Company } from './components/Company/company';
import { OBJECTS } from './static/Const/vars';
import { Contacts } from './components/Contacts/contacts';
import { OneNews } from './components/News/onenews';
import { OnePromo } from './components/Promo/onepromo';
import { BannerPromo } from './components/BannerPromo/bannerpromo';

function App() {
  const [userId, setUserId] = useState('')
  const [isCustomer, setIsCustomer] = useState(false)
  const [dataObject, setDataObject] = useState(OBJECTS)
  const [infoObject, setInfoObject] = useState({})
  const [menuItemText, setMenuItemText] = useState('Новостройки')
  const [menuText, setMenuText] = useState('Страхование ипотеки')
  
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home 
              setUserId={setUserId}  
              menuItemText={menuItemText}
              menuText={menuText}
              setMenuText={setMenuText}
              setMenuItemText={setMenuItemText}
            />
          }
        />
        <Route
          path="/login"
          element={<Login setUserId={setUserId} setIsCustomer={setIsCustomer}/>}
        />
        <Route
          path="/policies"
          element={<Policies setUserId={setUserId}/>}
        />
        <Route
          path="/person"
          element={
            <Person 
              userId={userId} 
              setUserId={setUserId} 
              isCustomer={isCustomer}
              menuItemText={menuItemText}
              menuText={menuText}
              setMenuText={setMenuText}
              setMenuItemText={setMenuItemText}
            />
          }
        />
        <Route
          path="/objects"
          element={
            <Objects 
              userId={userId} 
              setUserId={setUserId} 
              isCustomer={isCustomer}
              dataObject={dataObject}
              setDataObject={setDataObject}
              setInfoObject={setInfoObject}
              menuItemText={menuItemText}
              menuText={menuText}
              setMenuText={setMenuText}
              setMenuItemText={setMenuItemText}
            />
          }
        />
        <Route
          path="/objects/:userId"
          element={
            <ObjectItem 
              infoObject={infoObject} 
              objects={OBJECTS} 
              userId={userId} 
              setUserId={setUserId}
            />}
        />
        <Route
          path="/onenews/:newsId"
          element={<OneNews/>}
        />
        <Route
          path="/onepromo/:promoId"
          element={<OnePromo/>}
        />
        <Route
          path="/bannerpromo"
          element={<BannerPromo/>}
        />
        <Route
          path="/promo"
          element={
            <Promotions  
              menuItemText={menuItemText}
              menuText={menuText}
              isCustomer={isCustomer}
            />
          }
        />
        <Route
          path="/news"
          element={
            <News 
              menuItemText={menuItemText}
              menuText={menuText}
              isCustomer={isCustomer}
            />
          }
        />
        <Route
          path="/company"
          element={
            <Company 
              menuItemText={menuItemText}
              menuText={menuText}
              isCustomer={isCustomer}
            />
          }
        />
        <Route
          path="/contacts"
          element={
            <Contacts 
              menuItemText={menuItemText}
              menuText={menuText}
              isCustomer={isCustomer}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
