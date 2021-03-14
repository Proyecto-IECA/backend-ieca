//Se requiere el uso del framework express para manejo de las rutas
const Router = require('express');
const { validFields } = require('../../bml/middlewares/validar-campos');
const { check } = require('express-validator');
const { validJWT } = require('../../bml/middlewares/validar-jwt');
const { getHabilidades, getHabilidadesPostulante, addHabilidades } = require('../../bml/controllers/extra-postulantes/habilidades');

//Se crea una constante del tipo router
const router = Router();

router.get('/', validJWT, getHabilidades);
router.get('/habilidades-postulante/:id', validJWT, getHabilidadesPostulante);
router.post('/add', [
    validJWT,
    check('id_postulante', 'El id_postulante es obligatorio').isNumeric(),
    validFields
], addHabilidades);

//Exportamos el router
module.exports = router;