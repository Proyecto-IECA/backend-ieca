const Router = require('express');
const { addSucursal, updateSucursal, deleteSucursal } = require('../../bml/controllers/extra-empresas/sucursales_empresa');
const { check } = require('express-validator');
const { validFields } = require('../../bml/middlewares/validar-campos');
const { validJWT } = require('../../bml/middlewares/validar-jwt');

const router = Router();

router.post('/add', [
    validJWT,
    check('id_empresa', 'El id de la empresa es obligatorio').isNumeric(),
    check('direccion', 'La direccion es obligatoria').notEmpty(),
    check('etiqueta', 'La etiqueta de la sucursal es obligatoria').notEmpty(),
    validFields
], addSucursal);

router.put('/update/:id', [
    validJWT,
    check('id_empresa', 'El id de la empresa es obligatorio').isNumeric(),
    check('direccion', 'La direccion es obligatoria').notEmpty(),
    check('etiqueta', 'La etiqueta de la sucursal es obligatoria').notEmpty(),
    validFields
], updateSucursal);

router.delete('/delete/:id_e/:id',
    validJWT,
    deleteSucursal);

module.exports = router;