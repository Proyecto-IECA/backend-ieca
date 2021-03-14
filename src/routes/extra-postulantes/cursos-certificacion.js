const Router = require('express');
const { addCursoCertificacion, updateCursoCertificacion, deleteCursoCertificacion } = require('../../bml/controllers/extra-postulantes/cursos-certificaciones');
const { check } = require('express-validator');
const { validFields } = require('../../bml/middlewares/validar-campos');
const { validJWT } = require('../../bml/middlewares/validar-jwt');

const router = Router();

router.post('/add', [
    validJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('descripcion', 'La descripcion es obligatoria').notEmpty(),
    check('id_postulante', 'El id del postulante es obligatorio').isNumeric(),
    validFields
], addCursoCertificacion);

router.put('/update/:id', [
    validJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('descripcion', 'La descripcion es obligatoria').notEmpty(),
    check('id_postulante', 'El id del postulante es obligatorio').isNumeric(),
    validFields
], updateCursoCertificacion);

router.delete('/delete/:id_p/:id',
    validJWT,
    deleteCursoCertificacion);

module.exports = router;