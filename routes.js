/**
 * @author Luis Muñoz <luismunoz.dh@gmail.com>
 */
/**
 * Rutas que no requieren autenticacion (por ahora)
 */
function setup(app, controllers) {
    app.post('/authenticate', controllers.user.authenticate);
    app.get('/playoutLog', controllers.playoutLog.listAll);
    app.get('/playoutLogFilter', controllers.playoutLog.getByFilter);
    app.post('/playoutLog', controllers.playoutLog.insert);
}

exports.setup = setup;