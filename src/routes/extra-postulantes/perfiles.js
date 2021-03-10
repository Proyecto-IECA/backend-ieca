//Se requiere el uso del framework express para manejo de las rutas
const Router = require('express');
const { getallPerfiles, addperfiles } = require('../../bml/extra-postulantes/perfiles');
const { validFields } = require('../../bml/middlewares/validar-campos');
const { check } = require('express-validator');
const { validJWT } = require('../../bml/middlewares/validar-jwt');

//Se crea una constante del tipo router
const router = Router();

router.get('/', validJWT, getallPerfiles);
router.post('/add', [
    validJWT,
    check('id_postulante', 'El id_postulante es obligatorio').notEmpty(),
    check('descripcion', 'La descripcion es obligatorio').notEmpty(),
    validFields
], addperfiles);
//Exportamos el router
module.exports = router;