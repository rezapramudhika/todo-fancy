const express = require('express');
const router = express.Router();
const { create, findAll, findById, update, destroy } = require('../controllers/list.controller');

/* GET users listing. */
router.get('/', findAll);
router.get('/:id', findById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', destroy);

module.exports = router;
