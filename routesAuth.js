/**
 * @author Luis Muñoz <luismunoz.dh@gmail.com>
 */
/**
 * rutas que requieren autenticacion.
 */
function setup(app, controllers) {
    //otros
    app.get("/",controllers.others.welcome);
    app.get("/check",controllers.others.check);

}

exports.setup = setup;