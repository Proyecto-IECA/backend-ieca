require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());
app.use('/api/postulantes', require('./routes/postulantes'));
app.use('/api/auth-postulante', require('./routes/auth-postulantes'));
app.listen(process.env.PORT);