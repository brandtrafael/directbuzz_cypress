import variables from "../../../pages/general/variables";

describe("Scenario - Smoke - Show Contacts", () => {
  beforeEach(() => cy.login());
  it.only("DIRECTBUZZ-15", () => {
    cy.get(variables.btn.sideMenu.contacts).click();
    cy.get("[data-test='row-name-datable-0'] > span", {
      timeout: 20000,
    }).then(($span) => {
      const userName = $span.text();
      cy.get("[data-test='input-search-table']").type(userName);
      cy.get("[data-test='row-name-datable-0'] > span").should(
        "have.text",
        userName
      );
    });
  });
});
