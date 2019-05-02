////////////////////////////////////////////////////////////////////////////////////////////////
const express = require('express')//Declaracion de framework de express para node
const bodyParser = require('body-parser')//Declaracion de body parser en funcion de los payloads 
const app = express()
const db = require('./queries')//Utilizar metodos de queries.js
const port = process.env.PORT//Declaracion de Puerto para produccion
//const port = 3000//Declaracion de puerto para pruebas locales

////////////////////////////////////////////////////////////////////////////////////////////////
//Configuraciones de express...
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

////////////////////////////////////////////////////////////////////////////////////////////////
//Definicion de ruta inicial
app.get('/', (request, response) => {
  response.json({ info: 'Prueba Softland' })
})


////////////////////////////////////////////////////////////////////////////////////////////////
//Definicion de endpoints
app.get('/TodoApi/api/TodoItems/ConsultarItems', db.getItems)
app.post('/TodoApi/api/TodoItems/IngresarItem', db.createItem)
app.put('/TodoApi/api/TodoItems/ModificarItem/:id', db.modifyItem)
app.delete('/TodoApi/api/TodoItems/EliminarItem/:id', db.deleteItem)

////////////////////////////////////////////////////////////////////////////////////////////////
//Escuchar en el puerto ....
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

////////////////////////////////////////////////////////////////////////////////////////////////