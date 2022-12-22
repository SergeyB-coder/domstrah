import { URL } from "../../static/Const/vars";

export function sendGetObjects(par, callback) {
    fetch(URL + '/getobjects', {
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


  export function sendGetObjectInfo(par, callback) {
    fetch(URL + '/getobjectinfo', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    //   mode: 'no-cors',
      body: JSON.stringify({
        ind: par.ind
      })
    })
    .then((response) => response.json())
    .then((data) => {
          return callback(data.info)
      });
  }