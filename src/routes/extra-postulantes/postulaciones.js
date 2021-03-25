const Router = require('express');
const { addpostulaciones, cancelpostulaciones, deletepostulaciones, aceptarpostulante, rechazarpostulante } = require('../../bml/controllers/extra-postulantes/postulaciones');


const router = Router();


router.post('/addpostulantes', addpostulaciones);
router.put('/cancelar/:id', cancelpostulaciones);
router.delete('/delete/:id', deletepostulaciones);
router.put('/aceptar/:id', aceptarpostulante);
router.put('/rechazar/:id', rechazarpostulante);

module.exports = router;