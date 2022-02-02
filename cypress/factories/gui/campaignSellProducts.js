const faker = require("faker");

export default {
  generateProducts: function (number, urlValid) {
    const arrayProducts = [];
    for (var product in Array.from(Array(number).keys())) {
      arrayProducts.push({
        productName: faker.commerce.product() + `${String(product)}`,
        productUrl: urlValid
          ? `http://${faker.commerce.product()}.com.br`
          : faker.commerce.product(),
      });
    }
    return arrayProducts;
  },
  data: function (fields, urlValid, numberOfProducts) {
    const newFields = fields.reduce((acc, currentField) => {
      acc[currentField.name] = faker.random[currentField.typeData](
        currentField.numberData
      );
      return acc;
    }, {});

    return {
      ...newFields,
      products: this.generateProducts(numberOfProducts, urlValid),
    };
  },
};
