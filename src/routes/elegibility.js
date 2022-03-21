const express = require('express');

const elegibilityController = require('../controllers/elegibility');
const { validateInput } = require('../middlewares');

const router = express.Router({ mergeParams: true });

router.post('/', validateInput, elegibilityController.check);

module.exports = router;
