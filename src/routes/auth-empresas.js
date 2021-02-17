const Router = require('express');
const { loginEmpresa, renewPass, validarEmail, registerEmpresas } = require('../bml/controllers/auth-empresas');


const router = Router();

router.post('/login', loginEmpresa);
router.post('/register', registerEmpresas);
router.put('/renewpass', renewPass);
router.put('/validaremail', validarEmail);

module.exports = router;