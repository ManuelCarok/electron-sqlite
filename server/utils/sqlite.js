const sqlite = require('sqlite3')
let path = require('path')
let db = new sqlite.Database(':memory:');

db.serialize(function() {
    db.run("CREATE TABLE test (Nombre TEXT)");    
});

exports.exec = function (query, params, retorna = false) {
    return new Promise((resolve, reject) => {
        stmt = db.prepare(query);
        if(retorna) {
            stmt.all(params, function(err, rows) {
                if(err) {
                    reject(err)
                }
                resolve(rows)
            });
        } else {
            stmt.run(params,function(err) {
                if(err) {
                    reject(err)
                }
                resolve({ok:true})
            });
        }
        
        stmt.finalize();
    })
}