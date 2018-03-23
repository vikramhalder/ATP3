var express = require('express');
var router = express.Router();

var productFactory = require.main.require('./models/core/productFactory');
router.get('/', function (req, res) {
    productFactory.getProductSearch(req.query.q,function (err, data) {
        res.render("search", { data:data,user: req.session.USER });
    }); 
}); 

module.exports = router