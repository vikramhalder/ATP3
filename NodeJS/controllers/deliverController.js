var express = require('express');   
var router = express.Router(); 
var productFactory = require.main.require('./models/core/productFactory'); 
 
router.get('/neworder', function (req, res) {
    if (typeof req.session.ROLE !== "undefined" || req.session.ROLE !== null) {
        if (req.session.ROLE == "Deliver") {
            res.render("deliver/neworder", { user: req.session.USER });
        } else {
            res.render("error/401", { user: req.session.USER });
        }
    } else {
        req.session.URL = req.url;
        res.redirect('/log');
    }
}); 
router.get('/allorder', function (req, res) {
    if (typeof req.session.ROLE !== "undefined" || req.session.ROLE !== null) {
        if (req.session.ROLE == "Deliver") {
            res.render("deliver/allorder", { user: req.session.USER });
        } else {
            res.render("error/401", { user: req.session.USER });
        }
    } else {
        req.session.URL = req.url;
        res.redirect('/log');
    }
}); 
 
module.exports = router