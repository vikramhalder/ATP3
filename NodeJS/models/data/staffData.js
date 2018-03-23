var db = require('./dataaccessC');
var v = require('./v');
function getAllArea(callback) { 
    db.getData('SELECT id,fname,lname,area FROM people where type="Deliver"', null, function (error, results) {
        callback(error, results);
    });
}  
function postArea(area, callback) {
    db.getData('UPDATE people SET area="' + area.area + '" WHERE id= "' + area.id + '"', null, function (er, ra) {
        var notifi = {noti_user: area.id, noti_order: "No", noti_type: "Your Area is Change", noti_date: v.datetime()};
        db.getData('INSERT INTO notification SET ?', notifi, function (e, r) { });
        return callback(er, notifi)
    }); 
} 
function delivering(data, callback) {
    db.getData('UPDATE product_order SET deliver_id="' + data.deliver_id + '",staff_use="Delivering" WHERE order_id= "' + data.order_id + '"', null, function (er, ra) {
        if (er) {
            return callback(er, ra);
        } else { 
            db.getData('UPDATE product_payment SET success=+' +  parseInt(data.amount) + ' WHERE order_id= "' + data.order_id + '"', null, function (err, resau) {
                db.getData('INSERT INTO notification SET ?', { noti_user: data.deliver_id, noti_order: data.order_id, noti_type: "You Get a New Order", noti_date: v.datetime() }, function (e, r) { });
                return callback(err, resau);
            });
        }
    });
} 
function deliverComplete(data, callback) {
    db.getData('UPDATE product_order SET action="Completed",staff_use="Completed" WHERE order_id= "' + data.order_id + '"', null, function (er, ra) {
        if (er) {
            return callback(er, ra);
        } else {
            db.getData('UPDATE product_payment SET success =+' + parseInt(data.amount) + ' WHERE order_id= "' + data.order_id + '"', null, function (err, resau) {
                db.getData('INSERT INTO notification SET ?', { noti_user: data.people_id, noti_order: data.order_id, noti_type: "Your Order is Complete", noti_date: v.datetime() }, function (e, r) { });
                return callback(err, resau);
            });
        }
    });
} 

module.exports.postArea = postArea; 
module.exports.getAllArea = getAllArea; 
module.exports.delivering = delivering;
module.exports.deliverComplete = deliverComplete;  