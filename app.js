const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require('./routes/authRoutes');
const statusRoutes = require('./routes/statusRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger_output.json');
require('./models/index');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(authRoutes);
app.use(statusRoutes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));