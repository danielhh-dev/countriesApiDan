const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");
const { loadApiDataToDB } = require("./controllers/DBController");

const server = express();
//Cargando los datos de la API a la DB
loadApiDataToDB();

server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

server.use(router);

module.exports = server;
