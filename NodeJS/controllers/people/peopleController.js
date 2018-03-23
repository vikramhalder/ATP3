var formidable = require('formidable');
var nodemailer = require('nodemailer');
var express = require('express');
var mv = require('mv');
var router = express.Router();

var peopleFactory = require.main.require('./models/core/peopleFactory');
var peopleData = require.main.require('./models/data/dataaccessC');
router.post('/log', function (req, res) {  
    peopleFactory.signin(req, function (result) { 
        res.write(result);
        res.end();
    }); 
});
router.post('/registration', function (req, res) { 
    peopleFactory.registration(req, res, function (errs, result) { 
        if (errs) {
            res.render('registration', { errs: errs });
        } else {
            res.redirect('/log');
        }
    }); 
});
router.post('/itemhas', function (req, res) {
    res.setHeader('content-type', 'application/json; charset=utf-8');  
    peopleFactory.itemHas(req, function (result) {
        res.write(JSON.stringify(result)); 
        res.end();
    });
});
router.post('/imgupload', function (req, res) { 
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var oldpath = files.file.path;
        var newpath = 'E:/ATP3/public/img/user/user' + req.session.ID + ".png";
        mv(oldpath, newpath, function (err) {
            if (err) { 
                res.write("UPLOAD ERROR");
                res.end();
            } else {
                res.write('user' + req.session.ID + ".png");
                res.end();
            }
        });
    });
});
router.post('/updateprofile', function (req, res) {
    peopleFactory.updateprofile(req, function (result) { 
        res.write(result);
        res.end();
    });
});
router.post('/updatepassword', function (req, res) {
    peopleFactory.updatepassword(req, function (result) {
        res.write(result);
        res.end();
    });
}); 
router.post('/searchuser', function (req, res) {
    res.setHeader('content-type', 'application/json; charset=utf-8');
    peopleFactory.searchUser(req, function (result) {
        res.write(JSON.stringify(result));
        res.end();
    });
});
router.post('/f/email', function (req, res) {
    var code = Math.floor(Math.random() * 1000000);
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {user: 'aiubcomm@gmail.com', pass: '01771457065' }
    });
    var mailOptions = {
        from: 'aiubcomm@gmail.com', to: req.body.email,
        subject: 'ShopZone Code', text: 'Your Forgot Password Code is ' + code
    };
    req.body['coloumName'] = "email";
    req.body['coloumValue'] = req.body.email;
    peopleFactory.itemHas(req, function (result) { 
        if (result == "EMAIL Already Use") {
            transporter.sendMail(mailOptions, function (error, info) {peopleData
                if (error) {
                    console.log(error);
                    res.write("Something Error Try Again"); res.end(); 
                } else {
                    peopleData.getData('UPDATE people SET passcode="' + code + '" WHERE email= "' + req.body.email + '"', null, function (e, r) {
                        res.write('true'); res.end(); 
                    });
                } 
            }); 
        } else {
            res.write("Email Not Found");
            res.end();
        }
    });
});
router.post('/f/code', function (req, res) { 
    peopleData.getData('select *from people WHERE email= "' + req.body.email + '"', null, function (e, r) {
        if (e) { res.write('Try Again'); res.end(); }
        else {
            if (r[0].passcode == req.body.code) {
                res.write('true'); res.end();
            } else {
                res.write('Your Code Not Match'); res.end();
            }
        }
    });
});
router.post('/f/password', function (req, res) { 
    var p = { 
        e: req.body.email,
        c: req.body.code,
        p: req.body.password,
        pp: req.body.newpassword,
    };
    if (p.p !== p.pp) {
        res.write('Password Not Match'); res.end(); 
    } else if (/^.{6,}$/.exec(p.pp) == null) {
        res.write('Password At Least 6 Char'); res.end(); 
    }else{
        peopleData.getData('select *from people WHERE email= "' + p.e + '"', null, function (e, r) {
            if (e) { res.write('Try Again'); res.end(); }
            else {
                if (r[0].passcode == p.c) {
                    peopleData.getData('UPDATE people SET password="' + p.p + '" WHERE id= "' + r[0].id + '"', null, function (error, results) {
                        res.write('true'); res.end();
                    });
                } else {
                    res.write('Your Code Not Match' + r[0].passcode ); res.end();
                }
            }
        });
    } 
});
router.get('/notificationView', function (req, res) {
    res.setHeader('content-type', 'application/json; charset=utf-8');
    peopleFactory.notificationView(req, function (result) {
        res.write(JSON.stringify(result));
        res.end();
    });
});
router.get('/notiReduce/:noti_id', function (req, res) {
    res.setHeader('content-type', 'application/json; charset=utf-8');
    peopleFactory.notiReduce(req, function (result) {
        if (result != null) {
            if (req.session.TYPE == "Deliver") {
                if (result[0].noti_order == "15_1505640230944") { 
                    res.redirect("/Deliver/neworder");
                } else if (result[0].noti_type == "Your Area is Change") {
                    res.redirect("/profile");
                } else {
                    res.redirect("/notificationView");
                }
            } else {
                res.redirect("/notificationView");
            }
        } else {
            res.redirect("/notificationView");
        }
    });
});
router.get('/deactiveAccList', (req, response) => {
    response.setHeader('content-type', 'application/json; charset=utf-8')
    peopleFactory.deactiveAccList(function (result) {
        response.write(JSON.stringify(result, null, 2));
        response.end();
    });
});
router.post('/ActDeacSeus', (req, response) => { 
    peopleFactory.ActDeacSeus(req,function (result) {
        response.write(result);
        response.end();
    });
});
router.get('/registration', function (req, res) { res.redirect('/registration'); });
module.exports = router