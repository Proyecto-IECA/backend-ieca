const Router = require('express');
const { addExperienciaAcademica, updateExperienciaAcademica, deleteExperienciaAcademica } = require('../../bml/controllers/extra-postulantes/experiencias-academicas');
const { check } = require('express-validator');
const { validFields } = require('../../bml/middlewares/validar-campos');
const { validJWT } = require('../../bml/middlewares/validar-jwt');

const router = Router();

router.post('/add', [
    validJWT,
    check('nivel', 'El nivel es obligatorio').notEmpty(),
    check('institucion', 'La institucion es obligatoria').notEmpty(),
    check('carrera', 'La carrera es obligatoria').notEmpty(),
    check('anio_entrada', 'El año de entrada es obligatorio').notEmpty(),
    check('estudiando', 'El estado de la la carrera es obligatorio').isBoolean(),
    check('id_postulante', 'El id del postulante es obligatorio').isNumeric(),
    validFields
], addExperienciaAcademica);

router.put('/update/:id', [
    validJWT,
    check('nivel', 'El nivel es obligatorio').notEmpty(),
    check('institucion', 'La institucion es obligatoria').notEmpty(),
    check('carrera', 'La carrera es obligatoria').notEmpty(),
    check('anio_entrada', 'El año de entrada es obligatorio').notEmpty(),
    check('estudiando', 'El estado de la la carrera es obligatorio').isBoolean(),
    check('id_postulante', 'El id del postulante es obligatorio').isNumeric(),
    validFields
], updateExperienciaAcademica);

router.delete('/delete/:id', [
    validJWT,
    check('id_postulante', 'El id del postulante es obligatorio').isNumeric(),
    validFields
], deleteExperienciaAcademica);

module.exports = router;