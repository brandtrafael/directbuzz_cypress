import variables from "./variables";

class Contacts {
  editContact(fields) {
    cy.get(variables.btn.sectionDataContact).click();
    for (var index in fields) {
      fields[index].value
        ? cy.get(fields[index].id).clear().type(fields[index].value)
        : cy.get(fields[index].id).clear();
    }
    cy.get(variables.btn.confirmModal).click();
  }
}

export default new Contacts();
