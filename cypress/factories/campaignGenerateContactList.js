const faker = require("faker");

export default {
  data: function () {
    return {
      name: faker.random.alphaNumeric(8),
      keyword: faker.random.alphaNumeric(8),
      initialMessage: faker.random.words(20),
      emailRequestMessage: faker.random.words(20),
      finalMessage: faker.random.words(20),
    };
  },
};
