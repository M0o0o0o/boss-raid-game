require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
// const db = require("./database/models");
const errorHandler = require("./middlewares/errorHandler");
const routes = require("./routes");
// const { swaggerUi, specs } = require("./swagger/swagger");
const errorCodes = require("./codes/errorCodes");
const Redis = require("ioredis");

const app = express();
app.set("port", process.env.PORT);

// db.sequelize
//   .sync({ force: true })
//   .then(async () => {
//     console.log("Synced database.");
//   })
//   .catch((err) => {
//     console.log("Failed to sync database: " + err.message);
//   });

const redis = new Redis({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  username: "default",
  password: process.env.REDIS_KEY,
  db: 0,
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}

app.use(routes);
app.use((req, res) => {
  res.status(404).json({ message: errorCodes.pageNotFound });
});
app.use(errorHandler);

module.exports = app;
