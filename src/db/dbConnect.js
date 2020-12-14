const mongoose = require("mongoose");
// const cors = require("cors");
const config = require("config");
const logger = require("pino")();

const { dbConfig } = config.get("Customer");

try {
  mongoose.connect(dbConfig.host + dbConfig.dbName, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  if (process.env.NODE_ENV !== "prod") {
    logger.info("Connected to %s", dbConfig.host + dbConfig.dbName);
  }
} catch (err) {
  logger.error("DB connection error:", err);
}
