//Se requiere el uso del framework express para manejo de las rutas
const Router = require('express');
const { getEmpresas, getEmpresa, deleteEmpresa, updateEmpresa, validPerfilCompletoEmpresa, updateFotoEmpresa } = require('../bml/controllers/empresas');

const { check } = require('express-validator');
//Se requieren los metodos de las empresas del archivo empresas.js
const { validFields } = require('../bml/middlewares/validar-campos');

const { validJWT } = require('../bml/middlewares/validar-jwt');

//Se crea una constante del tipo router
const router = Router();

//Rutas de nuestras empresas
router.get('/perfil-completo/:id', validJWT, getEmpresa);

router.get('/valid-perfil-completo', validJWT, validPerfilCompletoEmpresa);

router.put('/update', [
    validJWT,
    check('nombre', 'El nombre de la empresa es obligatorio').notEmpty(),
    check('administrador', 'El nombre del administrador es obligatorio').notEmpty(),
    check('ubicacion', 'La ubicacion es obligatoria').notEmpty(),
    check('giro', 'El giro es obligatorio').notEmpty(),
    validFields
], updateEmpresa);

router.put('/update-foto', [
    validJWT,
    check('foto_empresa', 'La foto es obligatoria').notEmpty(),
    validFields
], updateFotoEmpresa);

router.get('/', validJWT, getEmpresas);
router.delete('/:id', deleteEmpresa);

//Exportamos el router
module.exports = router;