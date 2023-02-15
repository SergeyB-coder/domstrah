export function validPhone(phone) {
    let valid_phone = ''
    let ind = 0
    if (phone.length > 0) {
        if (phone[0] === '+') {
            ind++
            valid_phone += '+'
        }
        else {
            if (!isNaN(phone[ind])) {
                if (phone[ind] !== '7') {
                    valid_phone += '+7(' + phone[ind]
                    ind += 2
                }
                else {
                    valid_phone += '+' + phone[ind]
                }
            }
            ind += 2
        }
        
        if (phone.length > ind) {
            if (!isNaN(phone[ind])) {
                valid_phone += phone[ind] + '('
                ind += 2
            }
            else  {
                valid_phone += '('
                ind+=2
            }
            

            for (let i=ind; i<ind + 3; i ++) {
                if (phone.length > i) {
                    if (!isNaN(phone[i])) {
                        valid_phone += phone[i]
                    }
                    else (
                        valid_phone += '0'
                    )
                }
                else {
                    break
                }
            }
            ind += 3
            // if (ind > 6) {
            //     ind--
            // }
            if (phone.length > ind) {
                if (!isNaN(phone[ind])) {
                    valid_phone += ')' + phone[ind]
                }
                else  {
                    valid_phone += ')'
                }
                ind++
                for (let i=ind; i<ind + 7; i ++) {
                    if (phone.length > i) {
                        if (!isNaN(phone[i])) {
                            valid_phone += phone[i]
                        }
                        else (
                            valid_phone += '0'
                        )
                        }
                        else {
                            break
                        }
                }
            }
        }
    }
    return valid_phone
}

export function digitNumber(str_num) {
    if (str_num === 0) {
        str_num = '0'
    }
    let num = [...str_num].reverse().join("");

    let s =''
    if (num.length > 0) {
    s += num[0]
    }
    let k = 1
    let raz = false
    for (let i=1; i<num.length; i++) {
        if (k % 3 === 0) {
            if (num[i] !== ' ') {
            if (raz) {
                s += num[i]
                raz = false
            }
            else {
                s += ' ' + num[i]
            }
            k++
            }
            else {
            s += ' '
            raz = true
            }
        }
        else if (num[i] !== ' ') {
            s += num[i]
            k++
        }
    }
    return [...s].reverse().join('')
}