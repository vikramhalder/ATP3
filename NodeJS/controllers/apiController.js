var express = require('express');
var router = express.Router();

var productController = require('./api/productApiController');
var staffController = require('./api/staffApiController');

router.use('/product', productController);   
router.use('/staff', staffController);   

module.exports = router;