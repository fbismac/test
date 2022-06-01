const MODEL_NAME = "products";

const getModel = function (mongoose) {
  const conn = mongoose.connection;
  if (conn.models[MODEL_NAME]) {
    return conn.models[MODEL_NAME];
  }

  const Schema = mongoose.Schema;
  const productsSchema = new Schema({
    name: String,
    sku: String,
    brand: String,
    cost: String,
    category: String,
    item_type: String,
    item_value: String,
  });
  return mongoose.model(MODEL_NAME, productsSchema);
};

module.exports = getModel;
