const Router = require('express');
const { getVacantesEmpresa, getVacante, addVacante, updateVacante, updateImagenVacante, deleteVacante, desactivarVacante, activarVacante } = require('../../bml/controllers/extra-empresas/vacantes');
const { check } = require('express-validator');
const { validFields } = require('../../bml/middlewares/validar-campos');
const { validJWT } = require('../../bml/middlewares/validar-jwt');

const router = Router();

router.get('/vacantes-empresa/:id',
    validJWT,
    getVacantesEmpresa);

router.get('/vacante/:id',
    validJWT,
    getVacante);

router.post('/add', [
    validJWT,
    check('puesto', 'El puesto es obligatorio').notEmpty(),
    check('descripcion', 'La descripcion es obligatoria').notEmpty(),
    check('id_empresa', 'El id_empresa es obligatorio').isNumeric(),
    check('modalidad', 'La modalidad es obligatorio').notEmpty(),
    check('nivel', 'El nivel es obligatorio').notEmpty(),
    validFields
], addVacante);

router.put('/update/:id', [
    validJWT,
    check('puesto', 'El puesto es obligatorio').notEmpty(),
    check('descripcion', 'La descripcion es obligatoria').notEmpty(),
    check('modalidad', 'La modalidad es obligatorio').notEmpty(),
    check('nivel', 'El nivel es obligatorio').notEmpty(),
    check('id_empresa', 'El id_empresa es obligatorio').isNumeric(),
], updateVacante);

router.put('/update-imagen/:id', [
    validJWT,
    check('imagen', 'La imagen es obligatoria').notEmpty(),
    validFields
], updateImagenVacante);

router.delete('/delete/:id_e/:id',
    validJWT,
    deleteVacante);

router.put('/desactivar', [
    validJWT,
    check('id_empresa', 'El id de la empresa es obligatorio').isNumeric(),
    check('id_vacante', 'El id de la vacante es obligatorio').isNumeric(),
    validFields
], desactivarVacante);

router.put('/activar', [
    validJWT,
    check('id_empresa', 'El id de la empresa es obligatorio').isNumeric(),
    check('id_vacante', 'El id de la vacante es obligatorio').isNumeric(),
    validFields
], activarVacante);

module.exports = router;