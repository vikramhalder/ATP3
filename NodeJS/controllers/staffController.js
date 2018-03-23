var path = require('path');
var express = require('express');  
var formidable = require('formidable');
var mv = require('mv');
var router = express.Router(); 
var productFactory = require.main.require('./models/core/productFactory');
  
router.post('/upload', function (req, res) {  
    var form = new formidable.IncomingForm(); 
    form.parse(req, function (err, fields, files) { 
        if (files.product_image.size == 0) {
            res.render("staff/upload", { user: req.session.USER, err: "NO IMAGE IS FOUND" });
        } else {
            var oldpath = files.product_image.path; 
            req["body"] = fields;
            productFactory.uploadProduct(req, res, function (error, result) {
                if (error) { 
                    res.render("staff/upload", { user: req.session.USER, err: error });
                } else {
                    var newpath = 'E:/ATP3/public/img/product/' + result.product_image;
                    mv(oldpath, newpath, function (err) {
                        if (err) { 
                            res.render("staff/upload", { user: req.session.USER, err: "IMAGE UPLOAD FAILD" });
                        } else {
                            res.render("staff/upload", { user: req.session.USER, message: "Upload Successfull" });
                        }
                    })
                }
            });
        } 
    }); 
});
router.get('/upload', function (req, res) {
    if (typeof req.session.ROLE !== "undefined" || req.session.ROLE !== null) {
        if (req.session.ROLE == "Staff") {
            res.render("staff/upload", { user: req.session.USER });
        } else {
            res.render("error/401", { user: req.session.USER });
        }
    } else {
        req.session.URL = req.url;
        res.redirect('/log');
    }
});
router.get('/area', function (req, res) {
    if (typeof req.session.ROLE !== "undefined" || req.session.ROLE !== null) {
        if (req.session.ROLE == "Staff") {
            res.render("staff/area", { user: req.session.USER });
        } else {
            res.render("error/401", { user: req.session.USER });
        }
    } else {
        req.session.URL = req.url;
        res.redirect('/log');
    }
});
router.get('/neworder', function (req, res) {
    if (typeof req.session.ROLE !== "undefined" || req.session.ROLE !== null) {
        if (req.session.ROLE == "Staff") {
            res.render("staff/neworder", { user: req.session.USER });
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
        if (req.session.ROLE == "Staff") {
            res.render("staff/allorder", { user: req.session.USER });
        } else {
            res.render("error/401", { user: req.session.USER });
        }
    } else {
        req.session.URL = req.url;
        res.redirect('/log');
    }
}); 
module.exports = router