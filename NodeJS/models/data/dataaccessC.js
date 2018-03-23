var mysql = require('mysql'); 
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'shopzoon2' 
}); 
module.exports = {
    getData: function (sql,param,callback) {
        connection.query(sql, function (err, res) {
            if(param == null){
                connection.query(sql, function (err, res) { 
                    callback(err, res);
                });
            } else { 
                connection.query(sql, param, function (err, res) {
                    callback(err, res);
                });
            }
        });  
    }
}; 