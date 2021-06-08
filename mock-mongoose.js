class Schema {
  constructor(schema) {
    this.schema = schema;
  }
}

const model = function (name, schema) {
  return {
    insertMany: function (records) {
      return new Promise((resolve, reject) => {
        this.justInserted = records;
        resolve();
      });
    }
  };
};

const connection = {
  on: function (event, callback) { },
  once: function (event, callback) { callback(); },
  close: function () { }
};

const connect = function (url, options) {

};

module.exports = {
  Schema,
  model,
  connection,
  connect
};
