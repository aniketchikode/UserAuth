module.exports = function (app) {


    const auths = require('../controller/authController.js');
    const users = require('../controller/userController.js');
    const authtoken = require('../middleware/token.js');

    app.post('/api/register', auths.register);
    app.post('/api/login',auths.login)

    app.get('/api/userslist/:page', [authtoken.verifyToken], users.userslist);
    app.patch('/api/UpdateUser/:id', [authtoken.verifyToken], users.UpdateUser)
    app.get('/api/SearchUser', [authtoken.verifyToken], users.SearchUser);

}