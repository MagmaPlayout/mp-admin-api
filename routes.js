/**
 * @author Luis Muñoz <luismunoz.dh@gmail.com>
 */
/**
 * Rutas que no requieren autenticacion (por ahora)
 */
function setup(app, controllers) {
    app.post('/authenticate', controllers.user.authenticate);
    app.get('/playoutLog', controllers.playoutLog.listAll);
    app.get('/playoutLogFilter/:filter', controllers.playoutLog.getByFilter);
    app.post('/playoutLog', controllers.playoutLog.insert);
    app.post('/supplier', controllers.supplier.insert);
    app.get('/supplier', controllers.supplier.listAll);
    app.get('/supplier/name/:name', controllers.supplier.getByName);
    app.post('/rawMedia', controllers.rawMedia.insert);
    app.get('/rawMedia/location/:location', controllers.rawMedia.getByLocation);
    app.get('/permissions/userAction/:idUser', controllers.permission.getUserActions);
}

exports.setup = setup;