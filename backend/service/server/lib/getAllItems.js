const ProductsService = require("../lib/service/ProductsService");
const productsSchema = require("../db/schema/products");
const config = require("../../config")[process.env.NODE_ENV || "development"];
const log = config.log();

const mongoose = require("mongoose");
const productsService = new ProductsService(productsSchema(mongoose));

const getAllItems = (req, res) => {
  try {
    productsService.find({}, (err, doc) => {
      if (err) {
        log.error("Failed to get all items: ", err);
        return res.status(400).json(err);
      }
      if (!doc) {
        log.warn("No records found");
        return res.json({});
      }
      return res.json(doc);
    });
  } catch (exception) {
    log.error("Exception: ", exception);
    return res.status(500).json(exception);
  }
};

module.exports = getAllItems;
