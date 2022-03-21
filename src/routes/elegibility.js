const express = require('express');

const { validateInput } = require('../middlewares');

const router = express.Router({ mergeParams: true });

router.post('/', validateInput);

module.exports = router;
