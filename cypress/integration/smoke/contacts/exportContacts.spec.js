import contactVariables from "../../../pages/contacts/variables";
import generalVariables from "../../../pages/general/variables";

describe("Scenario - Smoke - Export Contacts", () => {
  beforeEach(() => {
    cy.login();
    cy.get(generalVariables.btn.sideMenu.contacts).click();
  });
  it.only("DIRECTBUZZ-17", () => {
    cy.wait(10000);
    cy.get(contactVariables.btn.exportContacts)
      .should("not.be.disabled")
      .click();
    cy.contains("Exportação iniciada");
    cy.contains("Entendi").click();
  });
});
