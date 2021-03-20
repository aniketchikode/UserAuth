var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));

const db = require('./app/config/dbconfig.js');

(async ()=>{

    await db.sequelize.sync({force: false, alter:true}).then(()=>{
        console.log('Drop and resync')
    });

})();

require('./app/route/routes.js')(app);

var server = app.listen(8080, '0.0.0.0', function(){

    var host = server.address().address
    var port = server.address().port

    console.log('app is listening on port',host, port)
})