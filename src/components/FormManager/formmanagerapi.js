import { URL } from "../../static/Const/vars";


export function sendToManager(par, callback) {
    fetch(URL + '/manager', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    //   mode: 'no-cors',
      body: JSON.stringify({
        name: par.name,
        phone: par.phone,
        addres: par.addres,
        date_start: par.date_start,
        messenger: par.messenger,
        comment: par.comment,
        checkedSelf: par.checkedSelf,
      })
    })
    .then((response) => response.json())
    .then((data) => {
          return callback(data)
      });
  }