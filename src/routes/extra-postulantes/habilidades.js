//Se requiere el uso del framework express para manejo de las rutas
const Router = require('express');
const { validFields } = require('../../bml/middlewares/validar-campos');
const { check } = require('express-validator');
const { validJWT } = require('../../bml/middlewares/validar-jwt');
const { getallHabilidades, addHabilidades, deleteHabilidades } = require('../../bml/controllers/extra-postulantes/habilidades');

//Se crea una constante del tipo router
const router = Router();

router.get('/', validJWT, getallHabilidades);
router.post('/add', [
    validJWT,
    check('id_postulante', 'El id_postulante es obligatorio').notEmpty(),
    check('descripcion', 'La descripcion es obligatorio').notEmpty(),
    validFields
], addHabilidades);
router.delete('/:id', deleteHabilidades);
//Exportamos el router
module.exports = router;