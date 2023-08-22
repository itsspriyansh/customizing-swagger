const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require('./routes/authRoutes')
require('./models/index')
require('dotenv').config()

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(cookieParser())

app.use(authRoutes)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
