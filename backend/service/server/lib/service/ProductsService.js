const DBService = require("./DBService");

class ProductsService extends DBService {
  constructor(schema) {
    super(schema);
    this.schema = schema;
  }
}

module.exports = ProductsService;
