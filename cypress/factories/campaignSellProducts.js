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
  data: function () {
    return {
      name: faker.commerce.product() + faker.random.number(2),
      keyword: faker.commerce.product() + faker.random.number(2),
      products: this.generateProducts(5),
      initialMessage: faker.random.words(20),
      finalMessage: faker.random.words(20),
    };
  },
};
