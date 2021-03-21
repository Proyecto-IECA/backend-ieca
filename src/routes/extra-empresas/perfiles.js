const Router = require('express');
const { getPerfilesVacante, addPerfiles } = require('../../bml/controllers/extra-empresas/perfiles');
const { validFields } = require('../../bml/middlewares/validar-campos');
const { check } = require('express-validator');
const { validJWT } = require('../../bml/middlewares/validar-jwt');

//Se crea una constante del tipo router
const router = Router();

router.get('/perfiles/:id', validJWT, getPerfilesVacante)
router.post('/add', [
    validJWT,
    check('id_vacante', 'El id vacante es obligatorio'),
    validFields
], addPerfiles);

//Exportamos el router
module.exports = router;