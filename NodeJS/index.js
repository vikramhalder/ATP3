var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var shopzoon = express();

var http = require('http').Server(shopzoon);
var io = require('socket.io')(http);
var port = process.env.PORT || 5000; 
var clients = [];

var api = require('./controllers/apiController');
var staff = require('./controllers/staffController');
var admin = require('./controllers/adminController');
var deliver = require('./controllers/deliverController');
var search = require('./controllers/searchController');
var people = require('./controllers/people/peopleController');
var product = require('./controllers/product/indexController');

shopzoon.set('view engine', 'ejs');
shopzoon.set('socketio', io);
shopzoon.use(bodyParser.urlencoded({ extended: false }));
shopzoon.use(bodyParser.json()); 
shopzoon.use(expressSession({secret: 'My Secret key', saveUninitialized: true, resave: false}));
shopzoon.use(express.static('public'));  
shopzoon.use(function (req, res, next) { req.io = io; next(); });
 
shopzoon.use('/api', api);   
shopzoon.use('/product', product); 
shopzoon.use('/people', people);
shopzoon.use('/search', search);
shopzoon.use('/staff', staff);
shopzoon.use('/admin', admin);
shopzoon.use('/deliver', deliver);

shopzoon.get('/', function (req, res) { res.render('home', { url: "home", user: req.session.USER }); });
shopzoon.get('/profile', function (req, res) { res.redirect('/@' + req.session.USERNAME); });
shopzoon.get('/log', function (req, res) { var url = req.session.URL; req.session.destroy(); res.render('log', { url: url});});
shopzoon.get('/registration', function (req, res) {req.session.destroy(); res.render('registration'); });
shopzoon.get('/forgotpassword', function (req, res) { req.session.destroy(); res.render('forgotpassword'); });
shopzoon.get('/logout', function (req, res) { req.session.destroy(); res.redirect('/log');});
shopzoon.get('/404', function (req, res) { res.render('error/404'); });
shopzoon.get('/405', function (req, res) { res.render('error/405'); });
shopzoon.get('*', function (req, res) { 
    res.setHeader("Content-Type", "text/html");
    if (/^\/@[a-zA-Z0-9_]*$/.exec(req.url) !== null) {
        req.session.URL = req.url; 
        if (typeof req.session.ROLE !== "undefined") {
            if (req.session.USERNAME == req.url.split("@")[1]){
                res.render('profile', { user: req.session.USER });
            } else {
                res.render('error/401', { user: req.session.USER });
            }
        } else {
            res.redirect('/log');
        }
    } else {
        res.render('error/404', { user: req.session.USER });
    }
    res.end(); });
http.listen(port, function () { console.log('Server started at port ' + 5000 +" ["+ new Date()+"]");});
 