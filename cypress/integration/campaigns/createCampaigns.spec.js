import campaigns from "../../pages/campaigns/campaigns";
import variables from "../../pages/campaigns/variables"
import campaignSellProducts from "../../factories/gui/campaignSellProducts";
import campaignGenerateContactList from "../../factories/gui/campaignGenerateContactList";
const faker = require('faker');

describe("Scenario - Functional - Create Project", () => {
  beforeEach(() => cy.login());
  it("DIRECTBUZZ-26", () => {});

  it("DIRECTBUZZ-3", () => {
    const campaignData = campaignGenerateContactList.data([
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
      {
        name: "emailRequestMessage",
        typeData: "words",
        numberData: 20,
      },
    ]);
    cy.api_createCampaign(campaignData, "generate contact list");
    cy.get(variables.btn.newCampaign)
      .click();
    cy.get(variables.btn.createCampainGenerateContactList)
      .click();
    cy.get(variables.input.campaignName)
      .type(campaignData.campaignName);
    cy.get(variables.input.campaignKeyword)
      .type(faker.random.alphaNumeric(8));
    cy.get(variables.btn.nextStep)
      .click();
    cy.contains("Já existe uma campanha com esse nome")
    cy.url().should("not.be.equal", `${Cypress.config(`baseUrl`)}campaigns/new/campaign-goal-messages`)
    cy.visit(Cypress.config('baseUrl'))
    campaigns.deleteCampaignByName(campaignData.campaignName)
  });
  it("DIRECTBUZZ-4", () => {
    const campaignData = campaignGenerateContactList.data([
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
      {
        name: "emailRequestMessage",
        typeData: "words",
        numberData: 20,
      },
    ]);
    cy.api_createCampaign(campaignData, "generate contact list");
    cy.get(variables.btn.newCampaign)
      .click();
    cy.get(variables.btn.createCampainGenerateContactList)
      .click();
    cy.get(variables.input.campaignName)
      .type(faker.random.alphaNumeric(8));
    cy.get(variables.input.campaignKeyword)
      .type(campaignData.campaignKeyword);
    cy.get(variables.btn.nextStep)
      .click();
    cy.contains("Já existe uma campanha com essa palavra-chave")
    cy.url().should("not.be.equal", `${Cypress.config(`baseUrl`)}campaigns/new/campaign-goal-messages`)
    cy.visit(Cypress.config('baseUrl'))
    campaigns.deleteCampaignByName(campaignData.campaignName)
  });
  it('DIRECTBUZZ-5', () => {
    cy.get(variables.btn.newCampaign)
      .click();
    cy.get(variables.btn.createCampainGenerateContactList)
      .click();
    cy.get(variables.input.campaignKeyword)
      .type(faker.random.alphaNumeric(8));
    cy.get(variables.btn.nextStep)
      .click();
    cy.contains("Informe um nome para sua campanha.")
    cy.url().should("not.be.equal", `${Cypress.config(`baseUrl`)}campaigns/new/campaign-goal-messages`)
  })
  it('DIRECTBUZZ-6', () => {
    cy.get(variables.btn.newCampaign)
      .click();
    cy.get(variables.btn.createCampainGenerateContactList)
      .click();
    cy.get(variables.input.campaignName)
      .type(faker.random.alphaNumeric(8));
    cy.get(variables.btn.nextStep)
      .click();
    cy.contains("Informe a palavra-chave para sua campanha.")
    cy.url().should("not.be.equal", `${Cypress.config(`baseUrl`)}campaigns/new/campaign-goal-messages`)
  })
  it('DIRECTBUZZ-67', () => {
    cy.get(variables.btn.newCampaign)
      .click();
    cy.get(variables.btn.createCampainGenerateContactList)
      .click();
    cy.get(variables.input.campaignName)
      .type(faker.random.alphaNumeric(8));
    cy.get(variables.input.campaignKeyword)
      .type(faker.random.alphaNumeric(8));
    cy.get(variables.btn.nextStep)
      .click();
    cy.get
  })
});
