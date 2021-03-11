//Se requiere el uso del framework express para manejo de las rutas
const Router = require('express');
const { validFields } = require('../../bml/middlewares/validar-campos');
const { check } = require('express-validator');
const { validJWT } = require('../../bml/middlewares/validar-jwt');
const { getallValores, addValores, deleteValores } = require('../../bml/controllers/extra-postulantes/valores');

//Se crea una constante del tipo router
const router = Router();

router.get('/', validJWT, getallValores);
router.post('/add', [
    validJWT,
    check('id_postulante', 'El id_postulante es obligatorio').notEmpty(),
    check('descripcion', 'La descripcion es obligatorio').notEmpty(),
    validFields
], addValores);
router.delete('/:id', deleteValores);
//Exportamos el router
module.exports = router;