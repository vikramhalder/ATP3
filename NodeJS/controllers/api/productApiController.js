var express = require('express');  
var router = express.Router();
 
var productFactory = require.main.require('./models/core/productFactory');

//localhost:5000/api/product/catagory
router.get('/catagory',(req, response) => {  
    response.setHeader('content-type', 'application/json; charset=utf-8');  
    productFactory.getCatagoryList(function (result) {
        response.write(JSON.stringify(result, null, 2));
        response.end();
    });  
});
//localhost:5000/api/product/catagory
router.post('/catagory', (req, response) => { 
    productFactory.AddCatagory(req,function (result) {
        response.write(result);
        response.end();
    });
});
router.post('/catagorySHD', (req, response) => {
    productFactory.catagorySHD(req, function (result) {
        response.write(result);
        response.end();
    });
});
//localhost:5000/api/product/all
router.get('/all',(req, response) => {  
    response.setHeader('content-type', 'application/json; charset=utf-8') 
    productFactory.getProductList("product_id !=0", function (result) {
        response.write(JSON.stringify(result, null, 2));  
        response.end();
    }); 
});
//localhost:5000/api/product/catagory/3
router.get('/catagory/:product_catagory', (req, response) => {
    response.setHeader('content-type', 'application/json; charset=utf-8')
    var sql = "product_catagory='" + req.params.product_catagory + "'";
    productFactory.getProductList(sql, function (result) {
        response.write(JSON.stringify(result, null, 2));  
        response.end();
    }); 
}); 
//localhost:5000/api/product/range/20/30
router.get('/range/:startid/:endid',(req, response) => {  
    response.setHeader('content-type', 'application/json; charset=utf-8')
    var whereStatement="product_id BETWEEN "+req.params.startid+" AND "+req.params.endid+"";
    productFactory.getProductList(whereStatement,function(value){
        response.write(JSON.stringify(value, null, 2));
        response.end();
    });
});

//localhost:5000/api/product/comment/20
router.get('/comment/:product_id', (req, response) => {
    response.setHeader('content-type', 'application/json; charset=utf-8')
    productFactory.getCommentList(req.params.product_id, function (result) {
        response.write(JSON.stringify(result, null, 2));
        response.end();
    });
});

//localhost:5000/api/postcomment/20
router.post('/postcomment/:product_id', (req, response) => { 
    if (typeof req.session.ROLE !== "undefined") {
        productFactory.postComment(req, function (error,result) { 
            response.write(result);
            response.end();
        });
    } else {
        response.write("auth false");
        response.end();
    }
});

//localhost:5000/api/whitelist
router.post('/whitelist', (req, response) => { 
    if (typeof req.session.ROLE !== "undefined") {
        productFactory.postWhitelist(req, function (error, result) {
            if (error) { 
                response.write("ERROR");
                response.end();
            } else { 
                response.write(result);
                response.end();
            }
        });
    } else {
        response.write("auth false");
        response.end();
    }
});

//localhost:5000/api/whitelist
router.get('/whitelist', (req, response) => {
    response.setHeader('content-type', 'application/json; charset=utf-8')
    if (typeof req.session.ID !== "undefined") {
        productFactory.getWhitelist(req, function (error, result) {
            if (error) {  
                response.write(JSON.stringify(error, null, 2));  
            } else {
                response.write(JSON.stringify(result, null, 2)); 
            } 
            response.end();
        });
    } else {
        response.write("auth false"); 
        response.end();
    } 
});
//localhost:5000/api/whitelist
router.get('/delwhitelist/:order_id', (req, response) => {  
    if (typeof req.session.ID !== "undefined") {
        productFactory.delOneWhitelist(req.params.order_id, function (result) {
            response.write(result);
            response.end();
        });
    } else {
        response.write("auth false");
        response.end(); 
    }
});
//localhost:5000/api/pandding
router.get('/pandding', (req, response) => {
    response.setHeader('content-type', 'application/json; charset=utf-8')
    if (typeof req.session.ID !== "undefined") {
        productFactory.getPanddinglist(req, function (error, result) {
            if (error) {
                response.write(JSON.stringify(error, null, 2));
            } else {
                response.write(JSON.stringify(result, null, 2));
            }
            response.end();
        });
    } else {
        response.write("auth false");
        response.end();
    }
});

//localhost:5000/api/complete
router.get('/complete', (req, response) => {
    response.setHeader('content-type', 'application/json; charset=utf-8')
    if (typeof req.session.ID !== "undefined") {
        productFactory.getCompletelist(req, function (error, result) {
            if (error) {
                response.write(JSON.stringify(error, null, 2));
            } else {
                response.write(JSON.stringify(result, null, 2));
            }
            response.end();
        });
    } else {
        response.write("auth false");
        response.end();
    }
});

//localhost:5000/api/postpayment/20
router.post('/postpayment/:order_id', (req, response) => {
    if (typeof req.session.ROLE !== "undefined") {
        productFactory.postPayment(req, function (error, result,data) {
            req.io.sockets.on('connection', function (socket) { 
                socket.on('new order_payment', function (msg) { 
                    req.io.sockets.emit('notificationEC Payment',data);
                });
            }); 
            response.write(result);
            response.end();
        });
    } else {
        response.write("auth false");
        response.end();
    }
});

//localhost:5000/api/postpayment/20
router.get('/getorder/:ordertype', (req, response) => {
    response.setHeader('content-type', 'application/json; charset=utf-8')
    if (typeof req.session.ROLE !== "undefined") {
        productFactory.getorder(req, function (error, result) {
            response.write(JSON.stringify(result, null, 2));
            response.end();
        });
    } else {
        response.write("auth false");
        response.end();
    }
});

router.get('/proBuyByCat', (req, response) => {
    response.setHeader('content-type', 'application/json; charset=utf-8')
    productFactory.proBuyByCat(req, function (error, result) {
        response.write(JSON.stringify(result, null, 2));
        response.end();
    });
});

router.get('/payMethodUse', (req, response) => {
    response.setHeader('content-type', 'application/json; charset=utf-8')
    productFactory.payMethodUse(req, function (error, result) {
        response.write(JSON.stringify(result, null, 2));
        response.end();
    });
});

router.get('/orderByDate', (req, response) => {
    response.setHeader('content-type', 'application/json; charset=utf-8')
    productFactory.orderByDate(req, function (error, result) {
        response.write(JSON.stringify(result, null, 2));
        response.end();
    });
});
module.exports = router;