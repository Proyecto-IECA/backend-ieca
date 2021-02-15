const Router = require('express');
const { getPostulantes, getPostulante, updatePostulante, deletePostulante } = require('../bml/controllers/postulantes');

const router = Router();

router.get('/', getPostulantes);
router.get('/:id', getPostulante);
router.put('/:id', updatePostulante);
router.delete('/:id', deletePostulante);

module.exports = router;