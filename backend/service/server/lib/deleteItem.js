const ProductsService = require("./service/ProductsService");
const productsSchema = require("../db/schema/products");
const config = require("../../config")[process.env.NODE_ENV || "development"];
const log = config.log();

const mongoose = require("mongoose");
const productsService = new ProductsService(productsSchema(mongoose));

const deleteItem = (req, res) => {
  try {
    productsService.findOneAndDelete(req.body, (err, doc) => {
      if (err) {
        log.error("Failed to delete item: ", err);
        return res.status(400).json(err);
      }
      return res.json(doc);
    });
  } catch (exception) {
    log.error("Exception: ", exception);
    return res.status(500).json(exception);
  }
};

module.exports = deleteItem;
