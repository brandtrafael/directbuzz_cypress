import campaigns from "../../pages/campaigns/campaigns";
import variables from "../../pages/campaigns/variables"
import campaignSellProducts from "../../factories/gui/campaignSellProducts";
import campaignGenerateContactList from "../../factories/gui/campaignGenerateContactList";
const faker = require('faker');

describe("Scenario - Functional - Create Project", () => {
  const defaultData = [
    {
      name: "campaignName",
      typeData: "alphaNumeric",
      numberData: 8,
    },
    {
      name: "campaignKeyword",
      typeData: "alphaNumeric",
      numberData: 8,
    },
    {
      name: "initialMessage",
      typeData: "words",
      numberData: 20,
    },
    {
      name: "finalMessage",
      typeData: "words",
      numberData: 20,
    },
  ];
  
  beforeEach(function () {
    cy.login();
  });

  it("DIRECTBUZZ-3", () => {
    defaultData.push({
      name: "emailRequestMessage",
      typeData: "words",
      numberData: 20,
    });
    const campaignData = campaignGenerateContactList.data(defaultData);
    const campaignType = "generate contact list";

    cy.api_createCampaign(campaignData, campaignType);
    campaigns.selectCampaignType(campaignType)
    cy.get(variables.input.campaignName)
      .type(campaignData.campaignName);
    cy.get(variables.input.campaignKeyword)
      .type(faker.random.alphaNumeric(8));
    cy.get(variables.btn.nextStep)
      .click();
    cy.contains("Já existe uma campanha com esse nome");
    cy.url().should("not.be.equal", `${Cypress.config(`baseUrl`)}campaigns/new/campaign-goal-messages`)
    campaigns.returnAndDeleteCampaign(campaignData.campaignName);
  });

  it("DIRECTBUZZ-4", () => {
    defaultData.push({
      name: "emailRequestMessage",
      typeData: "words",
      numberData: 20,
    });
    const campaignData = campaignGenerateContactList.data(defaultData);
    const campaignType = "generate contact list";

    cy.api_createCampaign(campaignData, campaignType);
    campaigns.selectCampaignType(campaignType);
    cy.get(variables.input.campaignName)
      .type(faker.random.alphaNumeric(8));
    cy.get(variables.input.campaignKeyword)
      .type(campaignData.campaignKeyword);
    cy.get(variables.btn.nextStep)
      .click();
    cy.contains("Já existe uma campanha com essa palavra-chave");
    cy.url().should("not.be.equal", `${Cypress.config(`baseUrl`)}campaigns/new/campaign-goal-messages`)
    campaigns.returnAndDeleteCampaign(campaignData.campaignName);
  });

  it('DIRECTBUZZ-5', () => {
    campaigns.selectCampaignType('generate contact list')
    cy.get(variables.input.campaignKeyword)
      .type(faker.random.alphaNumeric(8));
    cy.get(variables.btn.nextStep)
      .click();
    cy.contains("Informe um nome para sua campanha.")
    cy.url().should("not.be.equal", `${Cypress.config(`baseUrl`)}campaigns/new/campaign-goal-messages`)
  })

  it('DIRECTBUZZ-6', () => {
    campaigns.selectCampaignType('generate contact list')
    cy.get(variables.input.campaignName)
      .type(faker.random.alphaNumeric(8));
    cy.get(variables.btn.nextStep)
      .click();
    cy.contains("Informe a palavra-chave para sua campanha.")
    cy.url().should("not.be.equal", `${Cypress.config(`baseUrl`)}campaigns/new/campaign-goal-messages`)
  })

  it('DIRECTBUZZ-67', () => {
    campaigns.selectCampaignType('generate contact list')
    cy.get(variables.input.campaignName)
      .type(faker.random.alphaNumeric(8));
    cy.get(variables.input.campaignKeyword)
      .type(faker.random.alphaNumeric(8));
    cy.get(variables.btn.nextStep)
      .click();
    cy.get(variables.input.emailRequest)
      .clear();
    cy.get(variables.btn.nextStep)
      .click();
    cy.contains('Informe uma mensagem.')
    cy.url().should("not.be.equal", `${Cypress.config(`baseUrl`)}campaigns/new/campaign-base-messages`)
  })
});
