/* eslint-disable indent */
class DBService {
  constructor(schema) {
    this.schema = schema;
  }

  find(filter, cb) {
    this.schema.find(filter, (error, doc) => {
      if (error) {
        return cb(error);
      }
      return cb(null, doc);
    });
  }

  create(object, cb) {
    this.schema.create(object, (error, doc) => {
      if (error) {
        return cb(error);
      }
      return cb(null, doc);
    });
  }

  findOneAndUpdate(filter, object, cb) {
    this.schema.findOneAndUpdate(
      filter,
      { $set: object },
      { returnOriginal: false },
      (error, doc) => {
        if (error) {
          return cb(error);
        }
        return cb(null, doc);
      }
    );
  }

  findOneAndDelete(filter, cb) {
    this.schema.findOneAndDelete(filter, (error, doc) => {
      if (error) {
        return cb(error);
      }
      return cb(null, doc);
    });
  }
}

module.exports = DBService;
