class Campaigns {
  createCampaign(type, data) {

    const newStep = () =>
      cy.get("[data-test='btn-next-step-create-campaign-onboarding']").click();

    const addProducts = (products) => {
      for (var indexProduct in products) {
        cy.get("[data-test='btn-add-product-onboarding']").click();
        cy.get(
          `[data-test='input-product-name-${indexProduct}-onboarding']`
        ).type(products[indexProduct].productName);
        cy.get(
          `[data-test='input-url-product-${indexProduct}-onboarding']`
        ).type(products[indexProduct].productUrl);
      }
    };
    
    switch (type) {
      case "sell products":
        cy.get(
          "[data-test='container-create-campaign-sell-product-onboarding']"
        ).click();
        cy.url().should(
          "be.equal",
          `${Cypress.config(`baseUrl`)}campaigns/new/campaign-configs`
        );
        cy.get(
          "[data-test='input-campaign-name-onboarding'] > div > input"
        ).type(data.name);
        cy.get(
          "[data-test='input-initial-keyword-campaign-onboard'] > div > input"
        ).type(data.keyword);
        newStep();
        cy.url().should(
          "be.equal",
          `${Cypress.config(`baseUrl`)}campaigns/new/campaign-goal-messages`
        );
        addProducts(data.products);
        newStep();
        cy.url().should(
          "be.equal",
          `${Cypress.config(`baseUrl`)}campaigns/new/campaign-base-messages`
        );
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
        newStep();
        cy.url().should(
          "be.equal",
          `${Cypress.config(`baseUrl`)}campaigns/new/ready-to-publish`
        );
        cy.get("[data-test='btn-publish-campaign-onboarding']").click();
        cy.contains("Campanha ativada com sucesso!");
        cy.url().should("be.equal", `${Cypress.config(`baseUrl`)}campaigns`);
        cy.contains(data.name);
        cy.contains(data.keyword);
    }
  }
}

export default new Campaigns();
