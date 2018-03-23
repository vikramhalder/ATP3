function isNumber(str) {
    return !/\D/.test(str);
}

function uniqKey() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1; month = (month < 10 ? "0" : "") + month;
    var day = date.getDate(); day = (day < 10 ? "0" : "") + day;
    var hour = date.getHours(); hour = (hour < 10 ? "0" : "") + hour;
    var min = date.getMinutes(); min = (min < 10 ? "0" : "") + min;
    var sec = date.getSeconds(); sec = (sec < 10 ? "0" : "") + sec;
    return year + month + day + hour + min + sec;
}

function datetime() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1; month = (month < 10 ? "0" : "") + month;
    var day = date.getDate(); day = (day < 10 ? "0" : "") + day;
    var hour = date.getHours(); hour = (hour < 10 ? "0" : "") + hour;
    var min = date.getMinutes(); min = (min < 10 ? "0" : "") + min;
    var sec = date.getSeconds(); sec = (sec < 10 ? "0" : "") + sec;
    return day + "/" + month + "/" + year + " " + hour + ":" + min + ":" + sec;
}
module.exports.isNumber = isNumber;
module.exports.uniqKey = uniqKey;
module.exports.datetime = datetime; 