const faker = require("faker");

export default {
  data: function (fields) {
    return fields.reduce((acc, currentField) => {
      acc[currentField.name] = faker.random[currentField.typeData](
        currentField.numberData
      );
      return acc;
    }, {});
  },
};
