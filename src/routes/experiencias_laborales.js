const Router = require('express');
const { addExperienciaLaboral } = require('../bml/controllers/experiencias-laborales');
const { check } = require('express-validator');
const { validFields } = require('../bml/middlewares/validar-campos');
const { validJWT } = require('../bml/middlewares/validar-jwt');

const router = Router();

router.post('/add', [
    validJWT,
    check('puesto', 'El puesto es obligatorio').notEmpty(),
    check('empresa', 'La empresa es obligatoria').notEmpty(),
    check('actividades', 'las actividades son obligatorias').notEmpty(),
    check('fecha_entrada', 'La fecha de entrada es obligatoria').notEmpty(),
    check('trabajando', 'El estado del trabajo es obligatorio').notEmpty(),
    check('id_postulante', 'El id del postulante es obligatorio').notEmpty(),
    validFields
], addExperienciaLaboral);

module.exports = router;