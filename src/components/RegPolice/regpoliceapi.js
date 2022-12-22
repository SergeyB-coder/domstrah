import { URL } from "../../static/Const/vars";

export function sendPayment(par, callback) {
    fetch(URL + '/payment', {
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
    });
}

export function sendSberpropertyagree(par, callback) {
    fetch(URL + '/sberpropertyagree', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        //   mode: 'no-cors',
        body: JSON.stringify({
            token: par.token,
            lastname: par.lastname,
            firstname: par.firstname,
            parentname: par.parentname,
            birthday: par.birthday,
            sex: par.sex,
            addres_holder_reg: par.addres_holder_reg,

            limit_sum: par.limit_sum,
            agr_credit_number: par.agr_credit_number,
            agr_credit_date_conc: par.agr_credit_date_conc,
            email: par.email,
            phone: par.phone,
            date_begin: par.dateBegin,
            addres_object: par.addres_object,

            issue_date: par.issue_date,
            issue_by: par.issue_by,
            series_doc: par.series_doc,
            number_doc: par.number_doc,
        })
        })
        .then((response) => response.json())
        .then((data) => {
            return callback(data)
    });
}

export function sendSberLifeAgree(par, callback) {
    fetch(URL + '/sberlifeagree', {
    // fetch(URL + '/sberlifepolice', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        //   mode: 'no-cors',
        body: JSON.stringify({
            company: par.company,
            token: par.token,
            cookie: par.cookie,
            lastname: par.lastname,
            firstname: par.firstname,
            parentname: par.parentname,
            birthday: par.birthday,
            sex: par.sex,
            addres_holder_reg: par.addres_holder_reg,

            limit_sum: par.limit_sum,
            agr_credit_number: par.agr_credit_number,
            agr_credit_date_conc: par.agr_credit_date_conc,
            email: par.email,
            phone: par.phone,
            date_begin: par.dateBegin,
            addres_object: par.addres_object,
            yearh_build: par.yearh_build,
            issue_date: par.issue_date,
            issue_by: par.issue_by,
            series_doc: par.series_doc,
            number_doc: par.number_doc,
        })
        })
        .then((response) => response.json())
        .then((data) => {
            return callback(data)
    });
}

export function sendOrderManager(par, callback) {
    fetch(URL + '/ordermanager', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        //   mode: 'no-cors',
        body: JSON.stringify(par)
        })
        .then((response) => response.json())
        .then((data) => {
            return callback(data)
    });
}


export function sendGetPayment(par, callback) {
    fetch(URL + '/payment', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        //   mode: 'no-cors',
        body: JSON.stringify({
            token: par.token,
            isn: par.isn,
        })
        })
        .then((response) => response.json())
        .then((data) => {
            return callback(data)
    });
}

export function sendGetFias(par, callback) {
    fetch(URL + '/dadata', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        //   mode: 'no-cors',
        body: JSON.stringify({
            addres: par.addres,
        })
        })
        .then((response) => response.json())
        .then((data) => {
            return callback(data)
    });
}

export function confirmEmail(par, callback) {
    fetch(URL + '/confirmemail', {
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
            return callback(data)
    });
}

export function sendCode(par, callback) {
    fetch(URL + '/code', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        //   mode: 'no-cors',
        body: JSON.stringify({
            email: par.email,
            code: par.code,
        })
        })
        .then((response) => response.json())
        .then((data) => {
            return callback(data)
    });
}

