//Se requiere el uso del framework express para manejo de las rutas
const Router = require('express');
//Se requieren los metodos de auth-postulantes del archivo auth-postulantes.js
const { loginPostulante, renewPass, validEmail, registerPostulante } = require('../bml/controllers/auth-postulantes');

//Se crea una constante del tipo router
const router = Router();

//Rutas de nuestros auth-postulantes
router.post('/login', loginPostulante);
router.post('/register', registerPostulante);
router.put('/renewpass', renewPass);
router.put('/validemail', validEmail);

//Exportamos el router
module.exports = router;