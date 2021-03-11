const Router = require('express');
const { addVacante } = require('../../bml/controllers/extra-empresas/vacantes');
const { check } = require('express-validator');
const { validFields } = require('../../bml/middlewares/validar-campos');
const { validJWT } = require('../../bml/middlewares/validar-jwt');

const router = Router();

router.post('/add', [
    validJWT,
    check('puesto', 'El puesto es obligatorio').notEmpty(),
    check('descripcion', 'La descripcion es obligatoria').notEmpty(),
    check('id_empresa', 'El id_empresa es obligatorio').isNumeric(),
    validFields
], addVacante);

module.exports = router;