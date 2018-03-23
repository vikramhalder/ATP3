var db = require('./dataaccessC');

var signin = function (people, callback) {
    var sql = "SELECT * FROM people WHERE email='" + people.email + "' AND password='" + people.password +"'";
    db.getData(sql, null, function (error, results) {
        callback(error, results);
    });
}
var registration = function (people, callback) { 
    db.getData('INSERT INTO people SET ?', people, function (error, results) { 
        if (error) {
            callback(error,null);
        } else {
            callback(null, results);
        }
    });
}
var itemHas = function (coloumName, coloumValue, callback) {
    var sql = "SELECT * FROM people WHERE " + coloumName + "='" + coloumValue+"'";
    db.getData(sql, null, function (error, results) {
        callback(error, results);
    });
}
var updateprofile = function (p, callback) {
    var sql = 'UPDATE people SET fname="' + p.fname + '",lname="' + p.lname + '",username="' + p.username + '",email="' + p.email + '",location="' + p.location +'" WHERE id= "' + p.id + '"';
    db.getData(sql, null, function (error, results) {
        callback(error, results);
    });
}
var updatepassword = function (p, callback) {
    var sql = 'UPDATE people SET password="' + p.passwordNew + '" WHERE id= "' + p.id + '"';
    db.getData(sql, null, function (error, results) {
        callback(error, results);
    });
}
var searchUser = function (value, callback) {
    var sql = "select id,fname,lname,username,type,active from people where id='" + value + "' or fname like '%" + value + "%' or lname like '%" + value + "%' or username like '%" + value + "%' or email like '%" + value + "%' or area like '%" + value + "%'";
    db.getData(sql, null, function (error, results) {
        callback(error, results);
    });
}

var notificationView = function (value, callback) {
    var sql = "select *from notification where noti_user='" + value + "' ORDER BY noti_date  DESC";
    db.getData(sql, null, function (error, results) {
        callback(error, results);
    });
}
var notiSeen = function (value, callback) {
    var sql = "update notification set noti_seen='seen' where noti_id='" + value + "'";
    db.getData(sql, null, function (error, results) {
        callback(error, results);
    });
}
var notiReduce = function (value, callback) {
    var sql = "select *from notification where noti_id='" + value + "'";
    db.getData(sql, null, function (error, results) {
        callback(error, results);
    });
}

var deactiveAccList = function (callback) {
    var sql = "select id,fname,lname,email,type,location,username,active from people";
    db.getData(sql, null, function (error, results) {
        callback(error, results);
    });
}
var ActDeacSeus = function (p,callback) {
    var sql = "update people set active='" + p.active + "' where id='" + p.id + "'";
    db.getData(sql, null, function (error, results) {
        callback(error, results);
    });
}
module.exports.signin = signin;
module.exports.registration = registration;
module.exports.itemHas = itemHas;
module.exports.updateprofile = updateprofile; 
module.exports.updatepassword = updatepassword; 
module.exports.searchUser = searchUser;
module.exports.notificationView = notificationView;
module.exports.notiSeen = notiSeen;  
module.exports.notiReduce = notiReduce; 
module.exports.deactiveAccList = deactiveAccList; 
module.exports.ActDeacSeus = ActDeacSeus; 