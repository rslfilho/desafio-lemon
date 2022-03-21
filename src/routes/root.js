const express = require('express');

const elegibilityRouter = require('./elegibility');

const root = express.Router({ mergeParams: true });

root.use('/elegibility', elegibilityRouter);

module.exports = root;
