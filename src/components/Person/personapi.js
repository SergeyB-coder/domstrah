import { URL } from "../../static/Const/vars";

export function sendSavePerson(par, callback) {
    fetch(URL + '/saveperson', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    //   mode: 'no-cors',
      body: JSON.stringify({
        user_id: par.user_id,
        name: par.name,
        surname: par.surname,
        email: par.email,
        phone: par.phone,
      })
    })
    .then((response) => response.json())
    .then((data) => {
          return callback(data.res)
      });
}

export function setOrderArchive(par, callback) {
  fetch(URL + '/orderarchive', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      order_id: par.order_id,
    })
  })
  .then((response) => response.json())
  .then((data) => {
        return callback(data)
    });
}

export function getPerson(par, callback) {
  fetch(URL + '/getperson', {
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

export function sendChangePassword(par, callback) {
  fetch(URL + '/changepassword', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  //   mode: 'no-cors',
    body: JSON.stringify({
      user_id: par.user_id,
      password: par.password,
    })
  })
  .then((response) => response.json())
  .then((data) => {
        return callback(data)
    });
}

export function sendUploadFTP(par, callback) {
  fetch(URL + '/uploadftp', {
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

export function getPDF(par, callback) {
  fetch(URL + '/getpdf', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  //   mode: 'no-cors',
    body: JSON.stringify({
      isn: par.isn,
      token: par.token
    })
  })
  .then((response) => response.json())
  .then((data) => {
        return callback(data)
    });
}

export function sendSaveSettings(par, callback) {
  fetch(URL + '/savesettings', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  //   mode: 'no-cors',
    body: JSON.stringify({
      user_id: par.user_id,
      brokerCommission: par.brokerCommission,
      discount: par.discount,
      promt: par.promt,
      promt_credit: par.promt_credit,
      email_manager: par.email_manager
    })
  })
  .then((response) => response.json())
  .then((data) => {
        return callback(data.res)
    });
}

export function getSettings(par, callback) {
  fetch(URL + '/getsettings', {
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

export function getDeals(par, callback) {
  fetch(URL + '/getdeals', {
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

export function getPersonDeals(par, callback) {
  fetch(URL + '/getpersondeals', {
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

export function getCredits(callback) {
  fetch(URL + '/getcredits', {
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

export function getOrders(callback) {
  fetch(URL + '/getorders', {
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

export function testApiOtp() {
  fetch(URL + '/getotptoken', {
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
        console.log(data)
    });
}

export function getBanner(callback) {
  fetch(URL + '/getbanner', {
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
        console.log(data)
        return callback(data)
    });
}

