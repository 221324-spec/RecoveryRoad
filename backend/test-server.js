const express = require('express');
const app = express();

app.get('/test', (req, res) => {
  res.json({ message: 'Test server working' });
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Test server listening on port ${PORT}`);
});