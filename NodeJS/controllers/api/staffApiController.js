var express = require('express');
var router = express.Router();
var staffFactory = require.main.require('./models/core/staffFactory');

router.get('/area', function (req, res) {
    res.setHeader('content-type', 'application/json; charset=utf-8');  
    staffFactory.getAllArea(req, function (data) {    
        res.write(JSON.stringify(data)); 
        res.end();
    });
});

router.post('/areapost', function (req, res) { 
    staffFactory.postArea(req, function (error, data) {
        if (error) { res.write(error); res.end(); }
        else {
            req.io.sockets.on('connection', function (socket) { 
                socket.on('notification', function (msg) {
                    console.log(msg);
                    req.io.sockets.emit('notificationEC', { userID: msg.deliverID, msg: data });
                });  
            }); 
            res.write("true");
            res.end();
        }
    });
});

router.post('/delivering', function (req, res) { 
    staffFactory.delivering(req, function (data) {
        res.write(data);
        res.end();
    });
});
router.post('/deliverComplete', function (req, res) {
    staffFactory.deliverComplete(req, function (data) {  
        res.write(data);
        res.end();
    });
});
module.exports = router