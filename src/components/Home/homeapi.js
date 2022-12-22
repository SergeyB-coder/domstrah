import { URL } from "../../static/Const/vars";

export function sendGetDiscount(par, callback) {
    fetch(URL + '/getdiscount', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    //   mode: 'no-cors',
      body: JSON.stringify({
        user_id: par.user_id,
      })
    })
    .then((response) => response.json())
    .then((data) => {
          return callback(data)
      });
  }

export  function getCostPolicyLife(par, callback) {
    fetch(URL + '/sberlifecreate', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        //   mode: 'no-cors',
        body: JSON.stringify({
            token: par.token,
            limit_sum: parseInt(par.limit_sum),
            sex: par.sex,
            birthday: par.birthday,
        })
        })
        .then((response) => response.json())
        .then((data) => {
            return callback(data)

    });
}

export function getCostPolicy(par, callback) {
  fetch(URL + '/sberestateapi', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      //   mode: 'no-cors',
      body: JSON.stringify({
          token: par.token,
          limit_sum: parseInt(par.limit_sum),
      })
      })
      .then((response) => response.json())
      .then((data) => {
          return callback(data)
      });
}

export function getToken(par, callback) {
  fetch(URL + '/testapi', {
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
          return callback(data.res.access_token)
          // props.setToken(data.res.access_token)
          // getCostPolicy(data.res.access_token)
  });
}