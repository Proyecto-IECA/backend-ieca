//Se requiere el uso del framework express para manejo de las rutas
const Router = require('express');
const { getallPerfiles, addperfiles } = require('../bml/controllers/perfiles');

const { validJWT } = require('../bml/middlewares/validar-jwt');

//Se crea una constante del tipo router
const router = Router();

router.get('/', validJWT, getallPerfiles);
router.post('/add', addperfiles);
//Exportamos el router
module.exports = router;