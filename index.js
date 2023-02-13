// import dotenv
const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");
dotenv.config();

app.use(cors());

// //parse Body Json
app.use(express.json());
app.use(fileUpload());

//Routes
app.use("/api/request-register", require("./routes/requestRegister"));

app.listen(process.env.PORT || "4000", () => {
  console.log("Servidor corriendo " + process.env.PORT || "4000");
});
