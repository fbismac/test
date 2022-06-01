const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const getAllItems = require("./lib/getAllItems");
const addNewItem = require("./lib/addNewItem");
const deleteItem = require("./lib/deleteItem");
const service = express();
// DB Config
const dbConfig = require("../config/db");

module.exports = (config) => {
  const log = config.log();

  // Connect to DB
  const mongooseOptions = {
    useFindAndModify: false,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  };
  mongoose
    .connect(dbConfig.url, mongooseOptions)
    .then(() => log.info("DB is connected"))
    .catch((err) => log.error(err));

  // Add a request logging middleware in development mode
  if (service.get("env") === "development") {
    service.use((req, res, next) => {
      log.debug(`${req.method}: ${req.url}`);
      return next();
    });
  }

  service.use(express.json());
  service.use(express.urlencoded());

  const allowedOrigins = ["http://localhost:1234"];

  service.use(
    cors({
      origin(origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        log.info("origin: ", origin);
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
          const msg =
            "The CORS policy for this site does not allow access from the specified Origin.";
          return callback(new Error(msg), false);
        }
        return callback(null, true);
      },
    })
  );

  service.options("*", cors());

  service.get("/getAllItems", getAllItems);
  service.post("/addNewItem", addNewItem);
  service.delete("/deleteItem/:id", deleteItem);

  // eslint-disable-next-line no-unused-vars
  service.use((error, req, res, next) => {
    res.status(error.status || 500);
    // Log out the error to the console
    log.error(error);
    return res.json({
      error: {
        message: error.message,
      },
    });
  });
  return service;
};
