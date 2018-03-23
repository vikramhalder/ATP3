var asyncValidator = require('async-validator');
var peopleData = require.main.require('./models/data/peopleData');
var rules = require('./rules');
function signin(req,callback) {
    var people = {
        email: req.body.email,
        password: req.body.password
    };
    peopleData.signin(people, function (error,result) {
        if (error) { 
            return callback("SQL Failed ! Try Again");
        } else {
            if (result.length > 0) {
                if (result[0].active == 1){
                    req.session.USER = result;
                    req.session.ROLE = result[0].type;
                    req.session.ID = result[0].id;
                    req.session.EMAIL = result[0].email;
                    req.session.USERNAME = result[0].username;
                    req.session.TYPE = result[0].type;
                    req.session.ACTIVE = result[0].active;
                    req.session.PASSWORD = result[0].password;
                    return callback("valid");
                } else if (result[0].active == 0) {
                    return callback("Your Account Is Deactive");
                }
                else {
                    return callback("Your Account Waiting for Active");
                }
            } else {
                return callback("Invalid Email or Password");
            }
        }  
    });
}
function registration(req, res, callback) {
    if (req.body.type == "Customar") { req.body["active"] = 1; } else { req.body["active"] = 10;}
    var people = {
        fname: req.body.fname,
        lname: req.body.lname,
        username: req.body.username,
        email: req.body.email,
        type: req.body.type,
        active: req.body.active,
        password: req.body.password,
        location: req.body.location
    };
    var validator = new asyncValidator(rules.registration);
    validator.validate(people, function (errors, fields) {  
        if (errors) { 
            callback(errors,null);
        }else {
            peopleData.registration(people, function (err, result) { 
                return callback(err,result);
            });
        }
    });
}
function itemHas(req, callback) {
    var coloumName = req.body.coloumName; 
    var coloumValue = req.body.coloumValue; 
    peopleData.itemHas(coloumName, coloumValue, function (error, result) {  
        if (error) {
            console.log(error);
            return callback("loading...");
        }else if (result.length==0) { 
            return callback("true");
        } else {
            return callback(coloumName.toUpperCase()+" Already Use");
        }
    });
}
function updateprofile(req, callback) {
    var people = {
        id: req.session.ID,
        fname: req.body.fname,
        lname: req.body.lname,
        username: req.body.username,
        email: req.body.email,
        type: req.session.TYPE,
        active: req.session.ACTIVE,
        password: req.session.PASSWORD,
        location: req.body.location
    };
     
    var validator = new asyncValidator(rules.registration);
    validator.validate(people, function (errors, fields) {
        if (errors) {  
            return callback("Velidetion ERROR");
        } else {
            peopleData.updateprofile(people, function (err, result) {
                if (err) { 
                    return callback("SQL ERROR");
                } else {
                    req.body["password"] = people.password;
                    signin(req, function (valid) {
                        if (valid == "valid") {
                            return callback("ok");
                        } else {
                            return callback(valid);
                        }
                    }); 
                }
            });
        }
    });
} 
function updatepassword(req, callback) {
    var check = true;
    var p = {
        id: req.session.ID, 
        password: req.session.PASSWORD,
        passwordCur: req.body.passwordCur,
        passwordNew: req.body.passwordNew,
        passwordAgain: req.body.passwordAgain,
    };
    if (p.password !== p.passwordCur) {
        check = false;return callback("Current Password Not Match");
    }else if (p.passwordNew !== p.passwordAgain) {
        check = false; return callback("Password Not Match");
    }else if (/^.{6,}$/.exec(p.passwordNew) == null) {
        check = false; return callback("Password At Least 6 Char");
    }
    if (check) { 
        peopleData.updatepassword(p, function (err, result) {
            if (err) {
                return callback("SQL ERROR");
            } else {
                req.session.PASSWORD = p.passwordNew;
                return callback("ok");
            }
        }); 
    }
} 
function searchUser(req, callback) { 
    peopleData.searchUser(req.body.value, function (error, result) {
        if (error) { 
            return callback(error);
        }else {
            return callback(result);
        }
    });
}
function notificationView(req, callback) {
    peopleData.notificationView(req.session.ID, function (error, result) {
        if (error) {
            return callback(null);
        } else {
            return callback(result);
        }
    });
}
function notiSeen(value, callback) {
    peopleData.notiSeen(value, function (error, result) { 
        if (error) {
            return callback(null);
        } else {
            return callback(result);
        }
    });
}
function notiReduce(req, callback) {
    peopleData.notiReduce(req.params.noti_id, function (error, result) {
        if (error) {
            return callback(null);
        } else {
            if (result.length > 0) {
                peopleData.notiSeen(result[0].noti_id, function (e, r) { });
                return callback(result);
            } else {
                return callback(null);
            }
        }
    });
}
function deactiveAccList(callback) {
    peopleData.deactiveAccList(function (error, result) {
        if (error) { 
            return callback(null);
        } else {
            return callback(result);
        }
    });
}
function ActDeacSeus(req, callback) {
    if (typeof req.session.ROLE !== "undefined" || req.session.ROLE !== null) {
        if (req.session.ROLE == "Admin") {
            var p = { id: req.body.id, active: req.body.active }
            peopleData.ActDeacSeus(p,function (error, result) {
                if (error) {
                    return callback(null);
                } else {
                    return callback("true");
                }
            });
        } else {
            return callback("Auth False");
        }
    } else {
        return callback("Auth False");
    }
}
module.exports.signin = signin;
module.exports.itemHas = itemHas; 
module.exports.registration = registration; 
module.exports.updateprofile = updateprofile; 
module.exports.updatepassword = updatepassword; 
module.exports.searchUser = searchUser; 
module.exports.notificationView = notificationView; 
module.exports.notiSeen = notiSeen; 
module.exports.notiReduce = notiReduce; 
module.exports.deactiveAccList = deactiveAccList; 
module.exports.ActDeacSeus = ActDeacSeus; 

