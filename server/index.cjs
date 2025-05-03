const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// servir archivos estáticos desde la carpeta dist
app.use(express.static(path.join(__dirname, '../dist')));

// SPA
app.get(/.*/, (_, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Running in http://localhost:${port}`);
});
