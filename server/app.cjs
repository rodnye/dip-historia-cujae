const express = require('express');
const path = require('path');
const app = express();

// servir archivos estáticos desde la carpeta dist
app.use(express.static(path.join(__dirname, '../dist')));

// SPA
app.get(/.*/, (_, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

module.exports = app;
