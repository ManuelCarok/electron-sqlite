let db = require('../utils/sqlite')

module.exports.getPosts = function () {
    var query = 'INSERT OR REPLACE INTO test(Nombre) values (?);'
    var parametros = ['Mei'];
    db.exec(query, parametros, false).then((data) => {
        console.log(data)
    }).catch((err) => {
        console.log(err)
    })
}