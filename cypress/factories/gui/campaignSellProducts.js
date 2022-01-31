const faker = require("faker");

export default {
  generateProducts: function (number) {
    const arrayProducts = [];
    for (var product in Array.from(Array(number).keys())) {
      arrayProducts.push({
        productName: faker.commerce.product() + `${String(product)}`,
        productUrl: `http://${faker.commerce.product()}.com.br`,
      });
    }
    return arrayProducts;
  },
  data: function (fields) {
    const newFields = fields.reduce((acc, currentField) => {
      acc[currentField.name] = faker.random[currentField.typeData](
        currentField.numberData
      );
      return acc;
    }, {});

    return {
      ...newFields,
      products: this.generateProducts(5),
    };
  },
};
