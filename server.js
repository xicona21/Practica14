const express = require('express'); //Importa el módulo 'express' para utilizarlo en la aplicación.


const app = express();//Crea una instancia de express.


const PORT = process.env.PORT || 3000; //Establece el puerto de escucha del servidor.


app.use('/assets', express.static(__dirname + '/public'));//Establece el directorio de recursos estáticos.


app.set('view engine', 'ejs'); //Establece el motor de plantillas 'ejs'.

app.use('/', function(req, res, next) {
    console.log('Request Url: ' + req.url);
    next();
});


app.get('/person/:id', function(req, res) {
   
    const message = req.query.message;
    const times = parseInt(req.query.times);
    const person = req.params.id;

    switch (message) {
        case "Hola":
        case "Adios":
        case "Bienvenido":
            break;
        default:
            message = "Hola";
    }

   
    let cad = "";
    if (!isNaN(times) && times > 0) {
        for (let i = 0; i < times; i++) {
            cad += message + " " + person + "\n";
        }
    }

    
    res.render('person', {
        ID: req.params.id,
        message: message,
        times: times,
        cad: cad
    });
});


app.listen(PORT); //Pone en marcha el servidor y lo deja a la escucha en el puerto especificado.