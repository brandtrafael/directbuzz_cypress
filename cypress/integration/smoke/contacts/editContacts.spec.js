import contactVariables from "../../../pages/contacts/variables";
import generalVariables from "../../../pages/general/variables";

describe("Scenario - Smoke - Edit Contacts", () => {
  beforeEach(() => {
    cy.login();
    cy.get(generalVariables.btn.sideMenu.contacts).click();
  });
  it.only("DIRECTBUZZ-23", () => {
    cy.get(contactVariables.btn.contactActions(0), {
      timeout: 20000,
    }).click();
    cy.contains("Editar").click();
    cy.get(contactVariables.btn.sectionDataContact).click();
    cy.get(contactVariables.input.contactEmail)
      .clear()
      .type("email@email.com.br");
    cy.get(contactVariables.input.contactPhone).clear().type("55 43 999999999");
    cy.get(contactVariables.input.contactBirthday).clear().type("08031997");
    cy.get(contactVariables.btn.confirmModal).click();
    cy.contains("Contato atualizado com sucesso");
  });
});
