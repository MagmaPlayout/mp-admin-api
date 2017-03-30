//creamos la base de datos tienda y el objeto SHOP donde iremos almacenando la info
var fs = require("fs");
var file = "mp_admin.db";
var exists = fs.existsSync(file);

var sqlite3 = require('sqlite3').verbose(),
db = new sqlite3.Database(file);

var mp_admin = {};

//elimina y crea la tabla clientes
mp_admin.createTable = function()
{
	
}

//inserta un nuevo usuario en la tabla clientes
mp_admin.insertUser = function(userData)
{
	var stmt = db.prepare("INSERT INTO Users VALUES (?,?,?,?,?,?,?)");
	stmt.run(
			null,
			userData.name, 
			userData.surname, 
			userData.username, 
			userData.password,
			userData.email,
			userData.phone
			);
	stmt.finalize();
	console.log("User saved successfully");
}

//obtenemos un usuario por su usr y pass, en este caso hacemos uso de db.get
//ya que sólo queremos una fila
mp_admin.findUser = function(usr,pass,callback)
{
	stmt = db.prepare("SELECT * FROM Users WHERE username = ? AND password = ?");
	//pasamos el id del cliente a la consulta
    stmt.bind(usr, pass); 
    stmt.get(function(error, row)
    {
    	if(error) 
        {
            throw err;
        } 
        else 
        {
        	//retornamos la fila con los datos del usuario
            if(row) 
            {
                callback("", row);
            }
            else
            {
				callback("", false);
            	console.log("user not exists");
            }
        }
    });
}

 /*
//elimina y crea la tabla orders
SHOP.ordersTable = function()
{
	db.run("DROP TABLE IF EXISTS orders");
	db.run("CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY AUTOINCREMENT, customerId INTEGER, price INT)");
	console.log("La tabla orders ha sido correctamente creada");
}
 
//inserta un nuevo usuario en la tabla clientes
SHOP.insertUser = function(userData)
{
	var stmt = db.prepare("INSERT INTO clientes VALUES (?,?,?)");
	stmt.run(null,userData.nombre,userData.edad);
	stmt.finalize();
}
 
//inserta un nuevo pedido en la tabla orders
SHOP.insertOrder = function(userData)
{
	var stmt = db.prepare("INSERT INTO orders VALUES (?,?,?)");
	stmt.run(null,userData.customerId,userData.price);
	stmt.finalize();
}

//obtiene todos los clientes y sus pedidos, utilizamos left join por
//si el cliente no tiene pedidos nos devulelva el registro con valores null
SHOP.user_orders = function(callback)
{
	db.all("SELECT c.id,c.nombre,c.edad,o.customerId,o.price FROM clientes AS c LEFT JOIN orders AS o ON c.id = o.customerId", function(err, rows) 
	{
		if(err)
		{
			throw err;
		}
		else
		{
			callback(null, rows);
		}
	});
}
 
//obtenemos todos los clientes de la tabla clientes
//con db.all obtenemos un array de objetos, es decir todos
SHOP.getUsers = function(callback)
{
	db.all("SELECT * FROM clientes", function(err, rows) {
		if(err)
		{
			throw err;
		}
		else
		{
			callback(null, rows);
		}
	});
}
 
//obtenemos un usuario por su id, en este caso hacemos uso de db.get
//ya que sólo queremos una fila
SHOP.getUser = function(userId,callback)
{
	stmt = db.prepare("SELECT * FROM clientes WHERE id = ?");
	//pasamos el id del cliente a la consulta
    stmt.bind(userId); 
    stmt.get(function(error, row)
    {
    	if(error) 
        {
            throw err;
        } 
        else 
        {
        	//retornamos la fila con los datos del usuario
            if(row) 
            {
                callback("", row);
            }
            else
            {
            	console.log("El usuario no existe");
            }
        }
    });
}
*/

db.serialize(function() {
  if(!exists) {
    db.run("DROP TABLE IF EXISTS Users");
	db.run("CREATE TABLE IF NOT EXISTS " +
			"Users ("+
				"id INTEGER PRIMARY KEY AUTOINCREMENT," + 
				"name TEXT, " +
				"surname TEXT," +
				"username TEXT," +
				"password TEXT," +
				"email TEXT," +
				"phone TEXT" +
				")"
			);
	console.log("User table created successfully");

	/*==================================
	--------setup db--------------------
	==================================*/
	mp_admin.insertUser({name:"Luis", surname:"Muñoz",username:"luis", password: "luis"});
	mp_admin.insertUser({name:"Iber", surname:"Parodi",username:"iber", password: "iber"});
	mp_admin.insertUser({name:"Franco", surname:"Magrini",username:"franco", password: "franco"});
  }
});

//exportamos el modelo para poder utilizarlo con require
module.exports = mp_admin;