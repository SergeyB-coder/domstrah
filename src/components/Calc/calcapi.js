export function getParseData(par, callback) {
    fetch('https://c61437.na4u.ru/parse', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    //   mode: 'no-cors',
      body: JSON.stringify({
        idBank: par.idBank,
        mortgageBalance: par.mortgageBalance,
      })
    })
    .then((response) => response.json())
    .then((data) => {
        return callback(data)
    });
}

export function getParseDataLife(par, callback) {
    fetch('https://c61437.na4u.ru/parselife', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    //   mode: 'no-cors',
      body: JSON.stringify({
        idBank: par.idBank,
        mortgageBalance: par.mortgageBalance,
        gender: par.gender_par,
        birthday: par.birthday,
      })
    })
    .then((response) => response.json())
    .then((data) => {
            return callback(data)
      });
}

export function getParseDataLifeAndProperty(par, callback) {
    fetch('https://c61437.na4u.ru/parselifeprop', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
    //   mode: 'no-cors',
        body: JSON.stringify({
            idBank: par.idBank,
            mortgageBalance: par.mortgageBalance,
            gender: par.gender_par,
            birthday: par.birthday,
        })
    })
    .then((response) => response.json())
    .then((data) => {
            return callback(data)
    });
}

export function getZetta1(callback) {
  fetch('https://c61437.na4u.ru/zetta', {
      method: 'POST',
      responseType: 'blob',
      headers: {
        // 'Accept': 'application/json',
        // 'Content-Type': 'application/json',
        responseType: 'blob'
      },
  //   mode: 'no-cors',
      body: JSON.stringify({
      })
  })
  .then((response) => response.json())
  .then((data) => {
          // return callback(data)
          console.log('zetta', data)
          return callback(data.res)
  });
}

export function getTokens(callback) {
  fetch('https://c61437.na4u.ru/tokens', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      })
  })
  .then((response) => response.json())
  .then((data) => {
          return callback(data)
  });
}

export function preCalc(par, callback) {
  // fetch('https://c61437.na4u.ru/precalc', {
  fetch('https://c61437.na4u.ru/precalc1', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: par.token,
        cookie: par.cookie,
        limit_sum: par.limit_sum,
        id_bank: par.id_bank
      })
  })
  .then((response) => response.json())
  .then((data) => {
          return callback(data)
  });
}

export function preCalcLife(par, callback) {
  fetch('https://c61437.na4u.ru/precalclife1', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_bank: par.id_bank,
        token: par.token,
        cookie: par.cookie,
        limit_sum: par.limit_sum,
        sex: par.sex,
        birthday: par.birthday,
      })
  })
  .then((response) => response.json())
  .then((data) => {
          return callback(data)
  });
}


export function testPrint(par, callback) {
  fetch('https://c61437.na4u.ru/testprint', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: par.id,
        cookie: par.cookie
      })
  })
  .then((response) => response.json())
  .then((data) => {
          return callback(data)
  });
}

