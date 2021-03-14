//Se requiere el uso del framework express para manejo de las rutas
const Router = require('express');
const { getPerfiles, getPerfilesPostulante, addperfiles } = require('../../bml/controllers/extra-postulantes/perfiles');
const { validFields } = require('../../bml/middlewares/validar-campos');
const { check } = require('express-validator');
const { validJWT } = require('../../bml/middlewares/validar-jwt');

//Se crea una constante del tipo router
const router = Router();

router.get('/', validJWT, getPerfiles);
router.get('/perfiles-postulante/:id', validJWT, getPerfilesPostulante)
router.post('/add', [
    validJWT,
    check('id_postulante', 'El id postulante es obligatorio').isNumeric(),
    validFields
], addperfiles);

//Exportamos el router
module.exports = router;