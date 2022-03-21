const cors = require('cors');
const express = require('express');

const root = require('../routes/root');

const app = express();

app.use(express.json());
app.use(cors());

app.use(root);

module.exports = app;
