

const convert_sec_to_hr = function (secs) {
    var h = Math.floor(secs / 3600);
    var m = Math.floor(secs % 3600 / 60);
    var hour = h > 0 ? h + (h == 1 ? " hour " : " hours ") : "";
    var minute = m > 0 ? m + (m == 1 ? " minute" : " minutes") : "";
    return hour + minute
}


let isValidRequestBody = function (body) {
    if (Object.keys(body).length === 0) return true;
    return false;
}

let isEmpty = function (value) {
    if (typeof value === 'undefined' || value === null) return true;
    if (typeof value === 'string' && value.trim().length === 0) return true;


    return false;
}

let isValidPhone = function (number) {
    let phoneRegex = /^[+91]{3}?[6789]{1}\d{9}$/;
    return phoneRegex.test(number);
}

let isValidEmail = function (email) {
    let emailRegex = /^([A-Za-z0-9._-]{2,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6})+$/
    return emailRegex.test(email)
}



let anyObjectKeysEmpty = (value) => {
    let obArr = Object.keys(value)
    let str = ''
    obArr.forEach(e => {
        if (value.hasOwnProperty(e) && value[e].trim() == "") {
            str += `${e} `
        }
    })

    str = str.trim()
    return str == "" ? false : str
}


module.exports = {
    convert_sec_to_hr,
    isValidRequestBody,
    isEmpty,
    isValidEmail,
    isValidPhone,
    anyObjectKeysEmpty
}