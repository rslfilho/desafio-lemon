const cors = require('cors');
const express = require('express');

const root = require('../routes/root');
const { error } = require('../middlewares');

const app = express();

app.use(express.json());
app.use(cors());

app.use(root);
app.use(error);

module.exports = app;
