const mongoose = require('mongoose');
const express = require('express');
const app = express(); // Aplicación de API
const PORT = 4020 || process.env.PORT;
const routerIndex = require('./routers');
require('dotenv').config();
mongoose
  .connect(process.env.MONGO_ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database connected'))
  .catch(() => console.log('Error connecting to database...'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routerIndex);

app.listen(PORT, () => console.log("It's alive!"));
