import faker from "faker";
import contactVariables from "../../pages/contacts/variables";
import generalVariables from "../../pages/general/variables";
import contacts from "../../pages/contacts";
describe("Scenario - Functional - Edit Contact", () => {
  beforeEach(() => {
    cy.login();
    cy.get(generalVariables.btn.sideMenu.contacts).click();
    cy.get(contactVariables.btn.contactActions(0), {
      timeout: 20000,
    }).click();
    cy.contains("Editar").click();
  });
  it("DIRECTBUZZ-22", () => {
    contacts.editContact([
      {
        id: contactVariables.input.contactEmail,
        value: faker.random.alphaNumeric(90),
      },
    ]);
    cy.contains("Informe um email válido");
  });

  it("DIRECTBUZZ-24", () => {
    contacts.editContact([
      {
        id: contactVariables.input.contactEmail,
      },
    ]);
    cy.contains("Contato atualizado com sucesso");
  });

  it("DIRECTBUZZ-33", () => {
    contacts.editContact([
      {
        id: contactVariables.input.contactPhone,
        value: faker.random.hexaDecimal(15),
      },
    ]);
    cy.contains("Informe um telefone válido");
  });

  it("DIRECTBUZZ-34", () => {
    contacts.editContact([
      {
        id: contactVariables.input.contactPhone,
      },
    ]);
    cy.contains("Contato atualizado com sucesso");
  });
});
