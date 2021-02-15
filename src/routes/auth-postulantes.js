const Router = require('express');
const { loginPostulante, renewPass, validEmail, registerPostulante } = require('../bml/controllers/auth-postulantes');

const router = Router();

router.post('/login', loginPostulante);
router.post('/register', registerPostulante);
router.put('/renewpass', renewPass);
router.put('/validemail', validEmail);

module.exports = router;