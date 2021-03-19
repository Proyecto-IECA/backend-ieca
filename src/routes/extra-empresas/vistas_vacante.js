const Router = require('express');
const { addVistaVacante } = require('../../bml/controllers/extra-empresas/vistas_vacante');
const { check } = require('express-validator');
const { validFields } = require('../../bml/middlewares/validar-campos');
const { validJWT } = require('../../bml/middlewares/validar-jwt');

const router = Router();

router.post('/add', [
    validJWT,
    check('id_vacante', 'La vacante es obligatoria').isNumeric(),
    check('id_postulante', 'El id postulante es obligatorio').isNumeric(),
    validFields
], addVistaVacante);

module.exports = router;