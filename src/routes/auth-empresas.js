//Se requiere el uso del framework express para manejo de las rutas
const Router = require('express');
//Se requieren los metodos de auth-empresas del archivo auth-postulantes.js
const { loginEmpresa, renewPass, validarEmail, registerEmpresas } = require('../bml/controllers/auth-empresas');

//Se crea una constante del tipo router
const router = Router();

//Rutas de nuestras auth-empresas
router.post('/login', loginEmpresa);
router.post('/register', registerEmpresas);
router.put('/renewpass', renewPass);
router.put('/validaremail', validarEmail);

//Exportamos el router
module.exports = router;