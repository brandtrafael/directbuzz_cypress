const cypress = require("cypress");

Cypress.Commands.add("login", () => {
  cy.visit("/");
  cy.get("[data-test='input-email-login'] > div > input").type(
    Cypress.env("registeredUser").username
  );
  cy.get("[data-test='input-password-login'] > div > input").type(
    Cypress.env("registeredUser").password
  );
  cy.get("[data-test='btn-login']").click();
  cy.url().should("be.equal", `${Cypress.config(`baseUrl`)}campaigns`);
});

Cypress.Commands.add("api_login", () => {
  cypress.resquest({
    url: `${Cypress.config("apiUrl")}/auth/login`,
    method: "POST",
    body: {
      email: Cypress.env("registeredUser").username,
      password: Cypress.env("registeredUser").password,
    },
  });
}).then((res) => res.body.accessToken);

Cypress.Commands.add("api_createCampaign", (type) => {
  const body = {
    "sell products": {},
  };
  cypress.resquest({
    url: `${Cypress.config("apiUrl")}/campaigns`,
    method: "POST",
    body: {},
  });
});
