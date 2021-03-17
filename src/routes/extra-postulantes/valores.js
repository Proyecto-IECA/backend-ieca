//Se requiere el uso del framework express para manejo de las rutas
const Router = require('express');
const { validFields } = require('../../bml/middlewares/validar-campos');
const { check } = require('express-validator');
const { validJWT } = require('../../bml/middlewares/validar-jwt');
const { getValores, getValoresPostulante, addValores } = require('../../bml/controllers/extra-postulantes/valores');

//Se crea una constante del tipo router
const router = Router();

router.get('/', validJWT, getValores);
router.get('/valores-postulante/:id', validJWT, getValoresPostulante);
router.post('/add', [
    validJWT,
    check('id_postulante', 'El id_postulante es obligatorio').isNumeric(),
    validFields
], addValores);

//Exportamos el router
module.exports = router;