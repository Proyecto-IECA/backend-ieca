//Se requiere el uso del framework express para manejo de las rutas
const Router = require('express');
//Se requieren los metodos de los postulantes del archivo postulantes.js
const { getPostulantes, getPostulante, updatePostulante, deletePostulante } = require('../bml/controllers/postulantes');

//Se crea una constante del tipo router
const router = Router();

//Rutas de nuestros postulantes
router.get('/', getPostulantes);
router.get('/:id', getPostulante);
router.put('/:id', updatePostulante);
router.delete('/:id', deletePostulante);

//Exportamos el router
module.exports = router;