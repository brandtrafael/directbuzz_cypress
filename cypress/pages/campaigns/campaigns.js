import variables from "./variables";

class Campaigns {
  nextStep() {
    cy.get(variables.btn.nextStep).click();
  }

  deleteCampaignByName(name) {
    cy.contains(name)
      .parent()
      .parent()
      .parent()
      .find(".card-footer")
      .find("#settings-btn")
      .click();
    cy.contains("Excluir").click();
    cy.get(variables.btn.confirmDelete).click();
    cy.contains("A campanha foi excluída com sucesso.", { timeout: 10000 });
  }

  addOrEditProducts(products, action) {
    for (var indexProduct in products) {
      if (action === "new") {
        cy.get(variables.btn.addProduct).click();
      }
      cy.get(variables.input.productName(indexProduct))
        .clear()
        .type(products[indexProduct].productName);

      cy.get(variables.input.productUrl(indexProduct))
        .clear()
        .type(products[indexProduct].productUrl);
    }
  }

  fillFieldsCampaign(type, data, action) {
    cy.log(data);
    cy.get(variables.input.campaignName).clear().type(data.campaignName);
    cy.get(variables.input.campaignKeyword).clear().type(data.campaignKeyword);

    this.nextStep();

    if (type === "generate contact list") {
      cy.get(variables.input.emailRequest)
        .clear()
        .type(data.emailRequestMessage);
      this.nextStep();
    }

    if (type === "sell products") {
      this.addOrEditProducts(data.products, action);
      this.nextStep();
    }

    cy.get(variables.input.initalMessage).clear().type(data.initialMessage);
    cy.get(variables.input.finalMessage).clear().type(data.finalMessage);
    this.nextStep();
  }

  verifyFieldsEdited(type, data) {
    cy.get(variables.input.campaignName).should(
      "have.value",
      data.campaignName
    );

    cy.get(variables.input.campaignKeyword).should(
      "have.value",
      data.campaignKeyword
    );

    this.nextStep();

    if (type === "generate contact list") {
      cy.get(variables.input.emailRequest).should(
        "have.value",
        data.emailRequestMessage
      );
      this.nextStep();
    }

    if (type === "sell products") {
      for (var indexProduct in data.products) {
        cy.get(variables.input.productName(indexProduct)).should(
          "have.value",
          data.products[indexProduct].productName
        );

        cy.get(variables.input.productUrl(indexProduct)).should(
          "have.value",
          data.products[indexProduct].productUrl
        );
      }

      this.nextStep();
    }

    cy.get(variables.input.initalMessage).should(
      "have.value",
      data.initialMessage
    );
    cy.get(variables.input.finalMessage).should(
      "have.value",
      data.finalMessage
    );
  }

  editCampaigns(type, oldData, newData) {
    cy.contains(oldData.campaignName)
      .parent()
      .parent()
      .parent()
      .find(".card-footer")
      .find("#settings-btn")
      .click();
    cy.contains("Editar").click();
    this.fillFieldsCampaign(type, newData, "edit");
    cy.get(variables.btn.publishCampaign).click();
    cy.contains("Campanha alterada com sucesso!", { timeout: 10000 });
    cy.contains(oldData.campaignName)
      .parent()
      .parent()
      .parent()
      .find(".card-footer")
      .find("#settings-btn")
      .click();
    cy.contains("Editar").click();
    this.verifyFieldsEdited(type, newData);
    cy.visit("/campaigns");
  }

  createCampaign(type, data) {
    cy.contains("Nova campanha").click();
    if (type === "sell products") {
      cy.get(variables.btn.createCampainSellProducts).click();
    }
    if (type === "generate contact list") {
      cy.get(variables.btn.createCampainGenerateContactList).click();
    }

    this.fillFieldsCampaign(type, data, "new");
    cy.url().should(
      "be.equal",
      `${Cypress.config(`baseUrl`)}campaigns/new/ready-to-publish`
    );
    cy.get(variables.btn.publishCampaign).click();
    cy.contains("Campanha ativada com sucesso!", {
      timeout: 10000,
    });
    cy.url().should("be.equal", `${Cypress.config(`baseUrl`)}campaigns`);
    cy.contains(data.campaignName);
    cy.contains(data.campaignKeyword);
  }

  altereStatusOfCampaign(name) {
    for (var i = 0; i < 2; i++) {
      cy.contains(name)
        .parent()
        .parent()
        .parent()
        .find(".card-footer")
        .find("[class='customSwitch'] > span")
        .click();
      cy.wait(5000);
      cy.contains(name)
        .parent()
        .parent()
        .parent()
        .find(".card-footer")
        .find("input")
        .should(i % 2 ? "be.checked" : "not.be.checked");
    }
  }
  
  selectCampaignType(type){
    if(type === "generate contact list"){
      cy.get(variables.btn.newCampaign)
        .click();
      cy.get(variables.btn.createCampainGenerateContactList)
        .click();
    } else if (type === "sell products"){
      cy.get(variables.btn.newCampaign)
        .click();
      cy.get(variables.btn.createCampainSellProducts)
        .click();
    }
  }

  returnAndDeleteCampaign(campaignName){
    cy.visit(Cypress.config('baseUrl'));
    this.deleteCampaignByName(campaignName);
  }
}

export default new Campaigns();
