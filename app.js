const express = require("express");
const config = require("config");
const logger = require("pino")();

require("./src/db/dbConnect");

const userRoute = require("./src/routes/user");

const { apiConfig } = config.get("Customer");

const app = express();

const port = apiConfig.port || 3000;

// Built-In Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", userRoute);

// app.get("/", (req, res, next) => {
//   try {
//     res.status(200).send("Hello");
//   } catch (err) {
//     next(err);
//   }
// });

app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).send({ success: false, error: err.message });
  // if (200 <= err.httpCode && err.httpCode < 600) {
  //   res.status(err.httpCode).send(err.message);
  // } else res.status(500).send(err.status);
});

app.get("/*", (req, res) => {
  res.status(404).send({ success: false, message: "Route not found" });
});

app.listen(port, () => {
  logger.info(`App listening at http://localhost:${port}`);
});

process.on("unhandledRejection", (reason, p) => {
  throw reason;
});

process.on("uncaughtException", (error) => {
  errorManagement.handler.handleError(error);
  if (!errorManagement.handler.isTrustedError(error)) process.exit(1);
});
