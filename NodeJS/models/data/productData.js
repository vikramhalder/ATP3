var Promise = require("bluebird"); 
var getSqlConnection = require('./dataaccessP');
var Conn = require('./dataaccessC');
var v = require('./v');
function getProductCatagory(callback) {    
    Promise.using(getSqlConnection(), function (connection) { 
        return connection.query('select  *from product_catagory').then(function (rows) { 
            return callback(rows);
        }).catch(function (error) { 
            console.log(error);
            return callback(null);
        });
    })
} 
function AddCatagory(data, callback) {
    Conn.getData('INSERT INTO product_catagory SET ?', data, function (error, results) {
        if (error) {
            callback(error, null);
        } else {
            callback(null, results);
        }
    });
}
function catagorySHD(data, callback) {
    if (data.action == "delete") {
        Conn.getData('DELETE FROM product_catagory where id="' + data.id + '"', null, function (error, results) {
            callback(error, "true");
        });
    }
    else if (data.action == "hide" || data.action == "show") {
        var d = (data.action == "hide") ? 0 : 1;
        Conn.getData('update product_catagory SET active="' + d + '" where id="' + data.id + '"', null, function (error, results) {
            callback(error, "true");
        });
    }else{
        callback(null, "DB Invalid Action");
    }
}
function getProductByColoum(whereStatement, callback) {
    Promise.using(getSqlConnection(), function (connection) { 
        return connection.query("SELECT * FROM product where " + whereStatement).then(function (data) {
            return callback(data);
        }).catch(function (error) {
            return callback(null);
        });
    });
}
function getProductSearch(whereStatement, callback) {
    Promise.using(getSqlConnection(), function (connection) {
        return connection.query("SELECT * FROM product where product_id LIKE '%" + whereStatement + "%' or product_title LIKE '%" + whereStatement + "%' or product_price LIKE '%" + whereStatement + "%' or product_discription LIKE '%" + whereStatement + "%' or product_code LIKE '%" + whereStatement +"%'").then(function (data) {
            return callback(null, data);
        }).catch(function (error) {
            console.log(error);
            return callback(error, null);
        });
    });
} 
function getProductComment(id, callback) { 
    return new Promise(function (resolve) {
        Conn.getData("SELECT pc.id,pc.product_id,pc.people_id,p.fname,p.lname,pc.text,pc.datetime FROM people p,product_comment pc where pc.product_id=" + id+" AND p.id = pc.people_id" ,null, function (error,result) {
            return callback(result);
        });
    });
} 
function uploadProduct(product, callback) {
    Conn.getData('INSERT INTO product SET ?', product, function (error, results) {
        if (error) {
            callback(error, null);
        } else {
            callback(null, results);
        }
    });
}
function postComment(comment, callback) {
    Conn.getData('INSERT INTO product_comment SET ?', comment, function (error, results) {
        if (error) {
            callback(error, null);
        } else {
            callback(null, results);
        }
    });
}
function postWhitelist(product_order, callback) {
    Conn.getData('select *from product_order where product_id=' + product_order.product_id + ' and customer_id=' + product_order.customer_id + ' and action="Whitelist"', null, function (err, res) {
        if (res.length == 0) {
            Conn.getData('INSERT INTO product_order SET ?', product_order, function (error, results) {
                if (error) {
                    callback(error, null);
                } else {
                    callback(null, product_order.order_id);
                }
            });
        } else{
            var sql = 'UPDATE product_order SET   customer_name="' + product_order.customer_name + '",' +
                'customer_address="' + product_order.customer_address + '",' +
                'customer_district ="' + product_order.customer_district + '",' +
                'customer_phone ="' + product_order.customer_phone + '",' +
                'product_qty ="' + product_order.product_qty + '",' +
                'product_price ="' + product_order.product_price + '",' +
                'product_delivery_cost ="' + product_order.product_delivery_cost + '",' +
                'product_total_cost ="' + product_order.product_total_cost + '" ' +
                'WHERE order_id= "' + res[0].order_id + '"';

            Conn.getData(sql,product_order,function (error, results) { 
                if (error) {
                    callback(error, null);
                } else {
                    callback(null, res[0].order_id);
                }
            });
        }
    });
} 
function getOneWhitelist(order_id, callback) {
    Promise.using(getSqlConnection(), function (connection) {
        return connection.query('SELECT *FROM product_order WHERE order_id="' + order_id+'" and action="Whitelist"').then(function (rows) {
            return callback(null, rows);
        }).catch(function (error) {
            console.log(error);
            return callback(error, null);
        });
    })
} 
function delOneWhitelist(order_id, callback) {
    Promise.using(getSqlConnection(), function (connection) {
        return connection.query('DELETE FROM product_order WHERE order_id="' + order_id + '"').then(function (rows) {
            return callback(null, rows);
        }).catch(function (error) {
            console.log(error);
            return callback(error, null);
        });
    })
} 
function getWhitelist(customer_id, callback) {
    Promise.using(getSqlConnection(), function (connection) {
        return connection.query('SELECT *FROM product,product_order WHERE product_order.action="Whitelist" && product_order.product_id = product.product_id && product_order.customer_id=' + customer_id).then(function (rows) {
            return callback(null, rows);
        }).catch(function (error) {
            console.log(error);
            return callback(error, null);
        });
    })
} 
function getPanddinglist(customer_id, callback) {
    Promise.using(getSqlConnection(), function (connection) {
        return connection.query('SELECT *FROM product,product_order,product_payment WHERE product_order.action="Pandding" && product_order.product_id = product.product_id && product_order.customer_id=' + customer_id + ' && product_payment.order_id=product_order.order_id').then(function (rows) {
            return callback(null, rows);
        }).catch(function (error) {
            console.log(error);
            return callback(error, null);
        });
    })
} 
function getCompletelist(customer_id, callback) {
    Promise.using(getSqlConnection(), function (connection) {
        return connection.query('SELECT *FROM product,product_order,product_payment WHERE product_order.action="Complete" && product_order.product_id = product.product_id && product_order.customer_id=' + customer_id + '&& product_payment.order_id=product_order.order_id').then(function (rows) {
            return callback(null, rows);
        }).catch(function (error) {
            console.log(error);
            return callback(error, null);
        });
    })
} 
function postPayment(payment, callback) {
    Conn.getData('INSERT INTO product_payment SET ?', payment, function (error, results) {
        if (error) {
            callback(error, null, null);
        } else {
            Conn.getData('UPDATE product_order SET staff_use="Pandding",action="Pandding" WHERE order_id= "' + payment.order_id + '"', null, function (error, results) {
                if (error) {
                    callback(error, null, null);
                } else {
                    var notifi = { noti_user: "0", noti_order: payment.order_id, noti_type: "New Order", noti_date: v.datetime() };
                    Conn.getData('INSERT INTO notification SET ?', notifi, function (e, r) { });
                    callback(null, results, notifi);
                }
            });  
        }
    });
}
function getorder(ordertype, callback) {
    Promise.using(getSqlConnection(), function (connection) {
        return connection.query('SELECT *FROM product,product_order,product_payment WHERE product_order.staff_use="' + ordertype + '" && product_order.product_id = product.product_id && product_payment.order_id=product_order.order_id').then(function (rows) {
            return callback(null, rows);
        }).catch(function (error) {
            console.log(error);
            return callback(error, null);
        });
    })
} 
function proBuyByCat(callback) {
    Promise.using(getSqlConnection(), function (connection) {
        return connection.query("SELECT c.product_catagory as 'label',c.active as 'y' FROM product p, product_order o,product_catagory c WHERE o.product_id=p.product_id and p.product_catagory=c.id").then(function (rows) {
            return callback(null, rows);
        }).catch(function (error) {
            console.log(error);
            return callback(error, null);
        });
    })
} 
function payMethodUse(callback) {
    Promise.using(getSqlConnection(), function (connection) {
        return connection.query("SELECT *FROM product_payment").then(function (rows) {
            return callback(null, rows);
        }).catch(function (error) {
            console.log(error);
            return callback(error, null);
        });
    })
} 
function orderByDate(callback) {
    Promise.using(getSqlConnection(), function (connection) {
        return connection.query("SELECT *FROM product_order order BY order_date ASC ;").then(function (rows) {
            return callback(null, rows);
        }).catch(function (error) {
            console.log(error);
            return callback(error, null);
        });
    })
} 
module.exports.AddCatagory = AddCatagory; 
module.exports.getProductCatagory = getProductCatagory; 
module.exports.catagorySHD = catagorySHD;
module.exports.getProductByColoum = getProductByColoum; 
module.exports.getProductComment = getProductComment;
module.exports.uploadProduct = uploadProduct;
module.exports.postComment = postComment; 
module.exports.postWhitelist = postWhitelist;     
module.exports.getWhitelist = getWhitelist;
module.exports.getPanddinglist = getPanddinglist;
module.exports.getCompletelist = getCompletelist;
module.exports.getOneWhitelist = getOneWhitelist;  
module.exports.delOneWhitelist = delOneWhitelist;    
module.exports.getProductSearch = getProductSearch;   
module.exports.postPayment = postPayment;
module.exports.getorder = getorder;    
module.exports.proBuyByCat = proBuyByCat; 
module.exports.payMethodUse = payMethodUse;    
module.exports.orderByDate = orderByDate;              