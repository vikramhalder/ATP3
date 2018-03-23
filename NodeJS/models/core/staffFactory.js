var staffData = require.main.require('./models/data/staffData');
 
function getAllArea(req, callback) {
    if (typeof req.session.ROLE !== "undefined" || req.session.ROLE !== null) {
        if (req.session.ROLE == "Staff") {
            staffData.getAllArea(function (errors, data) {
                if (errors) { callback("ERROR");}
                else { callback(data);}
            });
        } else {
            callback('auth false');
        }
    } else { 
        callback('auth false');
    }
} 
function postArea(req, callback) {
    if (typeof req.session.ROLE !== "undefined" || req.session.ROLE !== null) {
        if (req.session.ROLE == "Staff") { 
            staffData.postArea(req.body,function (errors, data) {
                if (errors) { callback("ERROR",null); } 
                else { callback(null, data); }
            });
        } else {
            callback('Auth False',null);
        }
    } else {
        callback('Auth False',null);
    }
} 
function delivering(req, callback) {
    if (typeof req.session.ROLE !== "undefined" || req.session.ROLE !== null) {
        if (req.session.ROLE == "Staff") {
            staffData.delivering(req.body, function (error, data) { 
                if (error) { console.log(error);callback("Error"); }
                else { callback("true");}
            });
        } else {
            callback('Auth False');
        }
    } else {
        callback('Auth False');
    }
} 

function deliverComplete(req, callback) {
    if (typeof req.session.ROLE !== "undefined" || req.session.ROLE !== null) {
        if (req.session.ROLE == "Deliver") {
            staffData.deliverComplete(req.body, function (error, data) {
                if (error) { console.log(error); callback("Error"); }
                else { callback("true"); }
            });
        } else {
            callback('Auth False');
        }
    } else {
        callback('Auth False');
    }
} 
module.exports.getAllArea = getAllArea; 
module.exports.postArea = postArea; 
module.exports.delivering = delivering; 
module.exports.deliverComplete = deliverComplete;  

