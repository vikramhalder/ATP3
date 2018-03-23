var express = require('express');   
var router = express.Router(); 
var productFactory = require.main.require('./models/core/productFactory'); 
 
router.get('/catagory', function (req, res) {
    if (typeof req.session.ROLE !== "undefined" || req.session.ROLE !== null) {
        if (req.session.ROLE == "Admin") {
            res.render("admin/catagory", { user: req.session.USER });
        } else {
            res.render("error/401", { user: req.session.USER });
        }
    } else {
        req.session.URL = req.url;
        res.redirect('/log');
    }
}); 
router.get('/viewreport', function (req, res) {
    if (typeof req.session.ROLE !== "undefined" || req.session.ROLE !== null) {
        if (req.session.ROLE == "Admin") {
            res.render("admin/viewreport", { user: req.session.USER });
        } else {
            res.render("error/401", { user: req.session.USER });
        }
    } else {
        req.session.URL = req.url;
        res.redirect('/log');
    }
}); 
router.get('/employee', function (req, res) {
    if (typeof req.session.ROLE !== "undefined" || req.session.ROLE !== null) {
        if (req.session.ROLE == "Admin") {
            res.render("admin/employee", { user: req.session.USER });
        } else {
            res.render("error/401", { user: req.session.USER });
        }
    } else {
        req.session.URL = req.url;
        res.redirect('/log');
    }
}); 
router.get('/employeeactive', function (req, res) {
    if (typeof req.session.ROLE !== "undefined" || req.session.ROLE !== null) {
        if (req.session.ROLE == "Admin") {
            res.render("admin/employeeactive", { user: req.session.USER });
        } else {
            res.render("error/401", { user: req.session.USER });
        }
    } else {
        req.session.URL = req.url;
        res.redirect('/log');
    }
}); 
 
module.exports = router