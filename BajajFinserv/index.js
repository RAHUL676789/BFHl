const express = require('express');
const bodyParser = require('body-parser');
const bfhlRoutes = require('./routes/bfhl');
const cors = require("cors");

const app = express();
app.use(cors());

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/bfhl', bfhlRoutes);

// Server Listener
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
