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

