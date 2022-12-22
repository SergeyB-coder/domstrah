import { URL } from "../../static/Const/vars";

export function sendReg(par, callback) {
    fetch('http://c61437.na4u.ru/reg', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    //   mode: 'no-cors',
      body: JSON.stringify({
        email: par.email,
        password: par.password,
      })
    })
    .then((response) => response.json())
    .then((data) => {
          return callback(data.res)
      });
  }

  export function sendForgetPassword(par, callback) {
    fetch(URL + '/forgetpassword', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    //   mode: 'no-cors',
      body: JSON.stringify({
        email: par.email,
      })
    })
    .then((response) => response.json())
    .then((data) => {
          return callback(data.res)
      });
  }

  
  export function sendLogin(par, callback) {
    fetch(URL + '/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    //   mode: 'no-cors',
      body: JSON.stringify({
        email: par.email,
        password: par.password,
      })
    })
    .then((response) => response.json())
    .then((data) => {
          return callback(data)
      });
  }

  export function sendSiteMap(par, callback) {
    fetch(URL + '/sitemap', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    //   mode: 'no-cors',
      body: JSON.stringify({
      })
    })
    .then((response) => response.json())
    .then((data) => {
          return callback(data)
      });
  }