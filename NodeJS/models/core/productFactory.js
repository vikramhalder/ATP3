var asyncValidator = require('async-validator');
var productData = require.main.require('./models/data/productData');
var validetionCore = require.main.require('./models/core/validetion');
var rules = require.main.require('./models/core/rules');


function getCatagoryList(callback) {
    productData.getProductCatagory(function (result) {
        callback(result);
    });
} 
function AddCatagory(req, callback) {
    if (req.body.product_catagory.length > 5) {
        productData.AddCatagory(req.body,function (error, result) { 
            callback("true");
        });
    } else {
        callback("At Least 5 Char");
    }
} 
function catagorySHD(req, callback) {
    if (req.body.action == "hide" || req.body.action == "show" || req.body.action == "delete") {
        productData.catagorySHD(req.body, function (error, result) {
            if (error) {
                console.log(error);
                callback("ERROR");
            }
            else {
                callback("true");
            }
        });
    } else { 
        callback("Factory Invalid Action");
    }
} 
function getProductList(whereStatement,callback) { 
    productData.getProductByColoum(whereStatement, function (result) {
        result.forEach(function (value) {
            var old=value.product_price; 
            if (value.product_discount > 0) { 
                value.product_price = old-((value.product_discount / 100) * value.product_price);
                value["product_old_price"] = old+" TK";
            } else {
                value["product_old_price"] = "";
            }
        });

        callback(result);
    });
} 
function getProductSearch(whereStatement,callback) {
    productData.getProductSearch(whereStatement,function (error,result) {
        callback(error,result);
    });
}
function getCommentList(id,callback) {
    productData.getProductComment(id,function (result) {
        callback(result);
    });
} 
function uploadProduct(req, res, callback) { 
    var uniqKey = validetionCore.uniqKey();
    var product = { 
        product_code: req.body.product_code,
        product_title: req.body.product_title,
        product_size: req.body.product_size,
        product_price: req.body.product_price,
        product_discount: req.body.product_discount,
        product_catagory: req.body.product_catagory,
        product_limit: req.body.product_limit,
        product_time: validetionCore.datetime(),
        product_image: req.session.USER[0].id+"_"+uniqKey+".png",
        product_discription: req.body.product_discription
    };
    var validator = new asyncValidator(rules.product);
    validator.validate(product, function (errors, fields) { 
        if (errors) {
            errors.forEach(function (value) { value.message = value.message.replace("_", " "); }); 
            callback(errors, null);
        } else {
            productData.uploadProduct(product, function (err, result) { 
                return callback(err, product);
            });
        }
    });
} 
function postComment(req,callback) { 
    var comment = {
        product_id: req.params.product_id,
        people_id: req.session.ID,
        text: req.body.text, 
        datetime: validetionCore.datetime()
    }; 
    var validator = new asyncValidator(rules.comment);
    validator.validate(comment, function (errors, fields) {
        if (errors) { 
            return callback("ERROR", "At Least 3 Char");
        } else {
            productData.postComment(comment, function (err, result) {
                if (err) {
                    return callback(err, "SQL Error ");
                } else {
                    return callback(err, "true");
                }
            });
        }
    });
}
function postWhitelist(req, callback) {
    var product_order = {           order_id: req.body.order_id,        customer_id: req.session.ID,        customer_name: req.body.customer_name,        customer_address: req.body.customer_address,        customer_district: req.body.customer_district,        customer_phone: req.body.customer_phone,        product_id: req.body.product_id,        product_qty: req.body.product_qty,        product_price: req.body.product_price,        product_delivery_cost: req.body.product_delivery_cost,        product_total_cost: req.body.product_total_cost, 
        action: "Whitelist",
        order_date: validetionCore.datetime()
    };
    productData.postWhitelist(product_order, function (err, result) {
        if (err) {
            return callback(err, "SQL Error ");
        } else {
            return callback(err, result);
        }
    });
}
function getWhitelist(req, callback) {
    productData.getWhitelist(req.session.ID, function (error, result) { 
        callback(error,result);
    });
}
function getPanddinglist(req, callback) {
    productData.getPanddinglist(req.session.ID, function (error, result) {
        callback(error, result);
    });
}
function getCompletelist(req, callback) {
    productData.getCompletelist(req.session.ID, function (error, result) {
        callback(error, result);
    });
}
function getOneWhitelist(order_id, callback) {
    productData.getOneWhitelist(order_id, function (error, result) {
        if (error) {
            return callback(null);
        } else {
            return callback(result);
        }
    });
}
function delOneWhitelist(order_id, callback) {
    productData.delOneWhitelist(order_id, function (error, result) {
        if (error) {
            return callback("ERROR");
        } else {
            return callback("ok");
        }
    });
}
function postPayment(req, callback) {
    var payment = {        order_id: req.params.order_id,        customer_id: req.session.ID,        product_id: req.body.product_id,        payment_type: req.body.payment_type,        payment_address: req.body.payment_address,        transaction_id: req.body.transaction_id,        amount: req.body.amount
    };
    productData.postPayment(payment, function (err, result,data) {
        if (err) {
            return callback(err, "SQL Error ", data);
        } else { 
            return callback(err, "Payment Update Seccessfully", data);
        }
    });
}
function getorder(req, callback) {
    productData.getorder(req.params.ordertype, function (error, result) {
        callback(error, result);
    });
}
function proBuyByCat(whereStatement, callback) {
    productData.proBuyByCat(function (error, result) {
        callback(error, result);
    });
}
function payMethodUse(whereStatement, callback) {
    productData.payMethodUse(function (error, result) {
        callback(error, result);
    });
}
function orderByDate(whereStatement, callback) {
    productData.orderByDate(function (error, result) {
        if (error) { callback(error, null); }
        else {
            result.forEach(function (val) {
                val.order_date = val.order_date.substring(0, 10);
            }); 
            callback(error, result);
        }
    });
}
module.exports.getCatagoryList = getCatagoryList;
module.exports.AddCatagory = AddCatagory;
module.exports.catagorySHD = catagorySHD;
module.exports.getCatagoryList = getCatagoryList;
module.exports.getProductList = getProductList;
module.exports.getCommentList = getCommentList;
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