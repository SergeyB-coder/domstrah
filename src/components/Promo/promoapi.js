import { URL } from "../../static/Const/vars";

export function sendGetPromo(par, callback) {
    fetch(URL + '/getpromo', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    //   mode: 'no-cors',
      body: JSON.stringify({
        // user_id: par.user_id,
      })
    })
    .then((response) => response.json())
    .then((data) => {
          return callback(data)
      });
  }

  export function sendDelPromo(par, callback) {
    fetch(URL + '/delpromo', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    //   mode: 'no-cors',
      body: JSON.stringify({
        id: par.id,
      })
    })
    .then((response) => response.json())
    .then((data) => {
          return callback(data)
      });
  }

  export function sendOnePromo(par, callback) {
    fetch(URL + '/onepromo', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    //   mode: 'no-cors',
      body: JSON.stringify({
        id: par.id,
      })
    })
    .then((response) => response.json())
    .then((data) => {
          return callback(data)
      });
  }

