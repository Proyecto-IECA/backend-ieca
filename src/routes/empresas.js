//Se requiere el uso del framework express para manejo de las rutas
const Router = require('express');
//Se requieren los metodos de las empresas del archivo empresas.js
const { getEmpresas, getEmpresa, deleteEmpresa, comRegEmpresa } = require('../bml/controllers/empresas');

const { validJWT } = require('../bml/middlewares/validar-jwt');

//Se crea una constante del tipo router
const router = Router();

//Rutas de nuestras empresas
router.get('/', validJWT, getEmpresas);
router.get('/completInfo_empresa', validJWT, comRegEmpresa);
router.get('/:id', getEmpresa);
router.delete('/:id', deleteEmpresa);

//Exportamos el router
module.exports = router;