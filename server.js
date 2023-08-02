const express = require('express');
const bodyParser = require('body-parser');
const facilityRoutes = require('./routes/facilityRoutes');

const app = express();
app.use(bodyParser.json());

app.use(facilityRoutes);

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
