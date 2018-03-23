var asyncValidator = require('async-validator');
var express = require('express');  
var router = express.Router();

var productFactory = require.main.require('./models/core/productFactory');
var myvalid = require.main.require('./models/core/validetion');
var rules = require.main.require('./models/core/rules');

router.all("*", (req, res, next) => {
    req.session.URL = "/product"+req.url; 
    next(); 
});
router.get('/details/:id', (req, response) => {
    if (myvalid.isNumber(req.params.id)) {
        productFactory.getProductList("product_id =" + req.params.id, function (result) {
            if (result !== null && result.length>0) {
                response.render('product/details', { data: result, user: req.session.USER });
            }else {
                response.render('error/404', { user: req.session.USER });
            }
        }); 
    } else {
        response.render('error/404', { user: req.session.USER });
    }
});
router.get('/buynow/:id', (req, response) => {
    if (typeof req.session.ROLE !== "undefined") {
        if (myvalid.isNumber(req.params.id)) {
            productFactory.getProductList("product_id =" + req.params.id, function (result) {
                if (result !== null && result.length > 0) {
                    response.render('product/buynow', { data: result, user: req.session.USER });
                } else {
                    response.render('error/404', { user: req.session.USER });
                }
            });
        } else {
            response.render('error/404', { user: req.session.USER });
        }
    } else {
        response.redirect ('/log');
    }
});
router.get('/buypayment/:order_id', (req, response) => {
    if (typeof req.session.ROLE !== "undefined") {
        productFactory.getOneWhitelist(req.params.order_id, function (result) {
            if (result.length > 0) {
                response.render('product/buypayment', { data: result, user: req.session.USER });
            } else {
                response.render('error/404', { user: req.session.USER });
            } 
        }); 
    } else {
        response.redirect('/log');
    }
});
router.get('/whitelist', (req, response) => {
    if (typeof req.session.ROLE !== "undefined") {
        response.render('product/whitelist', { user: req.session.USER });
    } else {
        response.redirect('/log');
    }
}); 
router.get('/pandding', (req, response) => {
    if (typeof req.session.ROLE !== "undefined") {
        response.render('product/pandding', { user: req.session.USER });
    } else {
        response.redirect('/log');
    }
}); 
router.get('/complete', (req, response) => {
    if (typeof req.session.ROLE !== "undefined") {
        response.render('product/complete', { user: req.session.USER });
    } else {
        response.redirect('/log');
    }
}); 
router.get('/:CatagoryID/*', (req, response) => {  
    if (myvalid.isNumber(req.params.CatagoryID)) {
        response.render('product/ByCatagory', { id: req.params.CatagoryID, user: req.session.USER });
    } else { 
        response.render('error/404', { user: req.session.USER });
    } 
});
 
module.exports = router;