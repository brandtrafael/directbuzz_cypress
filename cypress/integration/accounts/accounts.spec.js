describe("Accounts", () => {
  beforeEach(() => cy.login());
  it("DIRECTBUZZ-57", () => {
    cy.get('[data-test="btn-sidemenu-contas"]').click();
    cy.contains("Nova conta").click();
    cy.get('[id="email"]').type(Cypress.env("facebookUser").username);
    cy.get('[id="pass"]').type(Cypress.env("facebookUser").password);
  });
});
