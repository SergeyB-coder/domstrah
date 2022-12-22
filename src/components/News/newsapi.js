import { URL } from "../../static/Const/vars";

export function sendGetNews(par, callback) {
    fetch(URL + '/getnews', {
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

  export function sendDelNews(par, callback) {
    fetch(URL + '/delnews', {
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

  export function sendOneNews(par, callback) {
    fetch(URL + '/onenews', {
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

