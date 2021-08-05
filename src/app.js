// Importación de las librarías necesarias
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./services/mysql/db");
const routes = require("./routes/app");
const moment = require("moment");
const path = require("path");

// Configuración del server de express
const app = express();
app.use(express.static(path.join(__dirname, '/public/dist')));
app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", routes);

// Se levanta el servidor 
app.listen(process.env.PORT || 3000, () => {
    console.log("Server listening on port 3000");
    console.log(moment().format());
    // sequelize
    //     .sync({ alter: false })
    //     .then(() => {
    //         console.log("We connect to the database");
    //     })
    //     .catch((error) => {
    //         console.log("An error has occurred", error);
    //     });
});