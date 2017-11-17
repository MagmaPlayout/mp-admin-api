/**
 * @author Luis Muñoz <luismunoz.dh@gmail.com>
 */
/**
 * Rutas que no requieren autenticacion (por ahora)
 */
function setup(app, controllers) {
    //users api
    app.post('/authenticate', controllers.user.authenticate);
    app.get('/users', controllers.user.getAll);
    app.post('/users', controllers.user.insert);
    app.delete('/users/:id', controllers.user.delete);
    //playoutlogs api
    app.get('/playoutLog', controllers.playoutLog.listAll);
    app.get('/playoutLogFilter/:filter', controllers.playoutLog.getByFilter);
    app.post('/playoutLog', controllers.playoutLog.insert);
    //suppliers api
    app.post('/supplier', controllers.supplier.insert);
    app.get('/supplier', controllers.supplier.listAll);
    app.get('/supplier/name/:name', controllers.supplier.getByName);
    //rawmedias api
    app.post('/rawMedia', controllers.rawMedia.insert);
    app.get('/rawMedia/location/:location', controllers.rawMedia.getByLocation);
    //permissions api
    app.get('/permissions/userAction', controllers.permission.getUserActions);
    app.post('/permissions/userRole', controllers.permission.setUserRole);
    app.get('/permissions/roles', controllers.permission.getAllRoles);
}

exports.setup = setup;