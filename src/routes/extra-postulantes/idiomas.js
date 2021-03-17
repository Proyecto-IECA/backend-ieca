//Se requiere el uso del framework express para manejo de las rutas
const Router = require('express');
const { validFields } = require('../../bml/middlewares/validar-campos');
const { check } = require('express-validator');
const { validJWT } = require('../../bml/middlewares/validar-jwt');
const { getIdiomas, getIdiomasPostulante, addIdiomas } = require('../../bml/controllers/extra-postulantes/idiomas');

//Se crea una constante del tipo router
const router = Router();

router.get('/', validJWT, getIdiomas);
router.get('/idiomas-postulante/:id', validJWT, getIdiomasPostulante);
router.post('/add', [
    validJWT,
    check('id_postulante', 'El id_postulante es obligatorio').notEmpty(),
    validFields
], addIdiomas);

//Exportamos el router
module.exports = router;