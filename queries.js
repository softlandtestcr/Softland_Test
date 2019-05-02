

////////////////////////////////////////////////////////////////////////////////////////////////
//Definiciones para configurar la conexión a la base de datos
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'ohyrnggddvmqcr',
  host: 'ec2-50-19-114-27.compute-1.amazonaws.com',
  database: 'dhne1khmn18nf',
  password: '1fc0e5b04aa9b4c7bd9455082e4be62b97ec0fd196a4ca3c985dc52e1fe4b283',
  port: 5432,
})


////////////////////////////////////////////////////////////////////////////////////////////////

//Metodo para obtener todos los items o tareas
const getItems = (request, response) => {
  pool.query('SELECT * FROM tarea', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

////////////////////////////////////////////////////////////////////////////////////////////////

//Metodo para insertar un item o tarea
const createItem = (request, response) => {
  const { name,notes,done } = request.body

  pool.query('INSERT INTO tarea ("id","name","notes","done") VALUES (uuid_generate_v4(),$1,$2,$3)', [name,notes,done], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${response.results}`)
  })
}

////////////////////////////////////////////////////////////////////////////////////////////////

//Metodo para modificar un item o tarea. Recibe como parametro el id de la tarea
const modifyItem=(request,response)=>{
  
 
    pool.query('UPDATE tarea SET name=$2,notes=$3,done=$4 WHERE id=$1', [request.params.id,request.body.name,request.body.notes,request.body.done], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })

}

////////////////////////////////////////////////////////////////////////////////////////////////

//Metodo para elminar un item. Recibe como parametro el id a eliminar
const deleteItem=(request,response)=>{
  pool.query('DELETE FROM tarea WHERE id=$1', [request.params.id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

////////////////////////////////////////////////////////////////////////////////////////////////
//Exportar los metodos getItems,createItem,modifyItem,deleteItem para utilizarlos en el index.js
module.exports = {
    getItems,
    createItem,
    modifyItem,
    deleteItem,
}