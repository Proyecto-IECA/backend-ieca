require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: true,
  })
);
app.use(express.json());
app.use("/api/postulantes", require("./routes/postulantes"));
app.use("/api/auth-postulantes", require("./routes/auth-postulantes"));
app.use("/api/empresas", require("./routes/empresas"));
app.use("/api/auth-empresas", require("./routes/auth-empresas"));
app.listen(process.env.PORT);
