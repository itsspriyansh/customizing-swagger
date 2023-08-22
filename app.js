const express = require("express");
const cookieParser = require("cookie-parser");
require('./models/index')

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(cookieParser())

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));