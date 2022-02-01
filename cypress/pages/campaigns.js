class Campaigns {
  nextStep() {
    cy.get("[data-test='btn-next-step-create-campaign-onboarding']").click();
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
    cy.get("[data-test='btn-confirm-delete-campaign-dialog']").click();
    cy.contains("A campanha foi excluída com sucesso.", { timeout: 10000 });
  }

  addOrEditProducts(products, action) {
    for (var indexProduct in products) {
      if (action === "new") {
        cy.get("[data-test='btn-add-product-onboarding']").click();
      }
      cy.get(
        `[data-test='input-product-name-${indexProduct}-onboarding'] > div > input`
      )
        .clear()
        .type(products[indexProduct].productName);

      cy.get(
        `[data-test='input-url-product-${indexProduct}-onboarding'] > div > input`
      )
        .clear()
        .type(products[indexProduct].productUrl);
    }
  }

  fillFieldsCampaign(type, data, action) {
    cy.log(data);
    cy.get("[data-test='input-campaign-name-onboarding'] > div > input")
      .clear()
      .type(data.campaignName);
    cy.get("[data-test='input-initial-keyword-campaign-onboard'] > div > input")
      .clear()
      .type(data.campaignKeyword);

    this.nextStep();

    if (type === "generate contact list") {
      cy.get(
        "[data-test='input-solicitation-message-onboarding'] > div > div > div > div > textarea"
      )
        .clear()
        .type(data.emailRequestMessage);
      this.nextStep();
    }

    if (type === "sell products") {
      this.addOrEditProducts(data.products, action);
      this.nextStep();
    }

    cy.get(
      "[data-test='input-initial-message-onboarding'] > div > div > div > div > textarea"
    )
      .clear()
      .type(data.initialMessage);
    cy.get(
      "[data-test='input-final-message-onboarding'] > div > div > div > div > textarea"
    )
      .clear()
      .type(data.finalMessage);
    this.nextStep();
  }

  verifyFieldsEdited(type, data) {
    cy.get("[data-test='input-campaign-name-onboarding'] > div > input").should(
      "have.value",
      data.campaignName
    );

    cy.get(
      "[data-test='input-initial-keyword-campaign-onboard'] > div > input"
    ).should("have.value", data.campaignKeyword);

    this.nextStep();

    if (type === "generate contact list") {
      cy.get(
        "[data-test='input-solicitation-message-onboarding'] > div > div > div > div > textarea"
      ).should("have.value", data.emailRequestMessage);
      this.nextStep();
    }

    if (type === "sell products") {
      for (var indexProduct in data.products) {
        cy.get(
          `[data-test='input-product-name-${indexProduct}-onboarding'] > div > input`
        ).should("have.value", data.products[indexProduct].productName);

        cy.get(
          `[data-test='input-url-product-${indexProduct}-onboarding'] > div > input`
        ).should("have.value", data.products[indexProduct].productUrl);
      }

      this.nextStep();
    }

    cy.get(
      "[data-test='input-initial-message-onboarding'] > div > div > div > div > textarea"
    ).should("have.value", data.initialMessage);
    cy.get(
      "[data-test='input-final-message-onboarding'] > div > div > div > div > textarea"
    ).should("have.value", data.finalMessage);
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
    cy.get("[data-test='btn-publish-campaign-onboarding']").click();
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
      cy.get(
        "[data-test='container-create-campaign-sell-product-onboarding']"
      ).click();
    }
    if (type === "generate contact list") {
      cy.get(
        "[data-test='container-create-campaign-generate-list-onboarding']"
      ).click();
    }

    this.fillFieldsCampaign(type, data, "new");
    cy.url().should(
      "be.equal",
      `${Cypress.config(`baseUrl`)}campaigns/new/ready-to-publish`
    );
    cy.get("[data-test='btn-publish-campaign-onboarding']").click();
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
}

export default new Campaigns();
