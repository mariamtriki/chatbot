const datasource = require('./datasource');
var mysql = require('mysql');

module.exports = {
    getClients: (id) => {
        var conn = mysql.createConnection({
            host: "sql11.freesqldatabase.com",
            user: "sql11214872",
            password: "t4jgbPdbsf",
            database: "sql11214872"
        });
        conn.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            var query = `SELECT * FROM client WHERE id = '${id}'`;
            console.log(query);
            conn.query(query, function (err, result) {
                if (err) throw err;
                console.log(result);
                return result;
              });
            })
        }
}