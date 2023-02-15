import { URL } from "../../static/Const/vars";
import { testPrint } from "../Calc/calcapi";

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

export async function sendSberpropertyagree(par) {
    console.log('par', par)
    // fetch(URL + '/sberpropertyagree', {
    let sub_url = '/sberpropertypolice'
    if (par.id_bank === '2') {sub_url = '/vtbpropertypolice'}
    const response = await fetch(URL + sub_url, {
        
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        //   mode: 'no-cors',
        body: JSON.stringify({
            is_two_polices: par.is_two_polices,
            company1: par.company1,
            company2: par.company2,
            token: par.token,
            cookie: par.cookie,
            lastname: par.lastname,
            firstname: par.firstname,
            parentname: par.parentname,
            birthday: par.birthday,
            sex: par.sex,
            addres_holder_reg: par.addres_holder_reg,
            addres_holder_fact: par.addres_holder_reg,
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

            company: par.company,
        })
        })
    const data = response.json()
    return data
}

export async function sendSberLifeAgree(par) {
    // fetch(URL + '/sberlifeagree', {

    let sub_url = '/sberlifepolice'
    if (par.id_bank === '2') {sub_url = '/vtblifepolice'}

    const response = await fetch(URL + sub_url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        //   mode: 'no-cors',
        body: JSON.stringify({
            is_two_polices: par.is_two_polices,
            company1: par.company1,
            company2: par.company2,
            token: par.token,
            cookie: par.cookie,
            lastname: par.lastname,
            firstname: par.firstname,
            parentname: par.parentname,
            birthday: par.birthday,
            sex: par.sex,
            addres_holder_reg: par.addres_holder_reg,
            addres_holder_fact: par.addres_holder_reg,
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
        // .then((response) => response.json())
        // .then((data) => {
        //     return data
        
    const data = await response.json()
    return data
    
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



export async function finalCreatePolicies (params, lifeOption, propertyOption, idBank) {
    let isn =  0
    let isn2 =  0
    let premium_sum_final = 0
    let premium_sum_final2 = 0
    let is_success = true
    let invalid_token = false
    try {
        if (lifeOption) {
            console.log('life')
            const data = await sendSberLifeAgree(params)
            console.log('sendSberLifeAgree', data)
            if (params.company2 === 'absolute' && idBank === '1') {
                if (data.res.status.code === 'error') {
                    alert(data.res.status.message[0].text)
                    is_success = false
                }
                else {
                    isn2 = data.res.result.data.isn
                    premium_sum_final2 = data.res.result.data.premium_sum
                }
            }
            else {
                if (data.res[0].result.IsSuccess) {
                    if (idBank === '1') {
                        isn2 = data.res[0].result.LifePolicyId
                        testPrint({cookie: params.cookie, id: isn2}, (data) => {
                            console.log('print res', data)
                        })
                    }
                    else {
                        isn2 = data.res[0].result.PolicyId
                    }
                    
                    premium_sum_final2  = data.res[0].result.Premium
                }
                else {
                    alert('Error Zetta ' + data.res[0].result.Message )
                    is_success = false
                }
                
            }                   
        }
        if (propertyOption) {
            console.log('property', )
            const data_property = await sendSberpropertyagree(params)
            console.log('sendSberpropertyagree', data_property)

            if (params.company1 === 'absolute') {
                if (data_property.res.status.code === "success") {
                    isn = data_property.res.result.data.isn
                    premium_sum_final = data_property.res.result.data.premium_sum
                }
                else {
                    alert(data_property.res.status.message[0].text)
                    is_success = false
                }
            }
            else {
                if (data_property.res[0].result.IsSuccess) {
                    isn =  data_property.res[0].result.PolicyId
                    premium_sum_final = data_property.res[0].result.Premium
                }
                else {
                    alert('Error Zetta')
                    is_success = false
                }
            }                    
        }
    }
    catch {
        invalid_token = true
        is_success = false
    }
    return {
        isn: isn, isn2: isn2, 
        premium_sum_final: premium_sum_final, premium_sum_final2: premium_sum_final2, 
        is_success: is_success, invalid_token: invalid_token
    }
}

