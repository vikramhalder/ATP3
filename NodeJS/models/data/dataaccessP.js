var mysql = require('promise-mysql'); 

var pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'shopzoon2',
    connectionLimit: 10
});
function getSqlConnection() {
    return pool.getConnection().disposer(function (connection) {
        pool.releaseConnection(connection);
    });
}  
module.exports = getSqlConnection; 