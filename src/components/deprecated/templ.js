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

function T_APP() {
  
  

  function testAPI() {
    let body_req = {"limit_sum": 1000}
    fetch('https://represtapi.absolutins.ru/mortgage/sber/property/calculation/create',  
      {
        method: 'POST',
        headers: {
          "Accept": "application/json", 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(body_req)
      })
        .then(response => response.json())
        .then((data) => {
            console.log('res', data)
        });
  }
  
  return (
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header> */}
  );
}
