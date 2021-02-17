const Router = require('express');
const { getAllEmpresa, getEmpresaid, updateEpresa, deleteEmpresa } = require('../bml/controllers/empresas');

const router = Router();

router.get('/', getAllEmpresa);
router.get('/:id', getEmpresaid);
router.put('/:id', updateEpresa);
router.delete('/:id', deleteEmpresa);

module.exports = router;