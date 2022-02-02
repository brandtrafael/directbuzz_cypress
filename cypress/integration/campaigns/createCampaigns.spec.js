import variables from "../../pages/campaigns/variables";
import campaigns from "../../pages/campaigns/campaigns";
import campaignSellProducts from "../../factories/gui/campaignSellProducts";
import campaignGenerateContactList from "../../factories/gui/campaignGenerateContactList";
import faker from "faker";

describe("Scenario - Functional - Create Project", () => {
  beforeEach(() => cy.login());

  const defaultData = [
    {
      name: "campaignName",
      typeData: "alphaNumeric",
      numberData: 12,
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

  it("DIRECTBUZZ-26", () => {
    cy.contains("Nova campanha").click();
    cy.get(variables.btn.createCampainSellProducts).click();
    campaigns.nextStep();
    cy.contains("Informe a palavra-chave para sua campanha.");
    cy.contains("Informe um nome para sua campanha.");
    cy.url().should("include", "/campaigns/new/campaign-configs");
  });

  it("DIRECTBUZZ-27", () => {
    const campaignData = campaignSellProducts.data(defaultData, true, 5);
    cy.contains("Nova campanha").click();
    cy.get(variables.btn.createCampainSellProducts).click();
    cy.get(variables.input.campaignName)
      .clear()
      .type(campaignData.campaignName);
    campaigns.nextStep();
    cy.contains("Informe a palavra-chave para sua campanha.");
    cy.url().should("include", "/campaigns/new/campaign-configs");
  });

  it("DIRECTBUZZ-28", () => {
    const campaignData = campaignSellProducts.data(defaultData, true, 5);
    cy.contains("Nova campanha").click();
    cy.get(variables.btn.createCampainSellProducts).click();
    cy.get(variables.input.campaignKeyword)
      .clear()
      .type(campaignData.campaignKeyword);
    campaigns.nextStep();
    cy.contains("Informe um nome para sua campanha.");
    cy.url().should("include", "/campaigns/new/campaign-configs");
  });

  it("DIRECTBUZZ-29", () => {
    const campaignData = campaignSellProducts.data(defaultData, false, 1);
    cy.contains("Nova campanha").click();
    cy.get(variables.btn.createCampainSellProducts).click();
    cy.get(variables.input.campaignName)
      .clear()
      .type(campaignData.campaignName);
    cy.get(variables.input.campaignKeyword)
      .clear()
      .type(campaignData.campaignKeyword);
    campaigns.nextStep();
    campaigns.addOrEditProducts(campaignData.products, "new");
    campaigns.nextStep();
    cy.contains("Informe uma url válida.");
  });

  it("DIRECTBUZZ-30", () => {
    const campaignData = campaignSellProducts.data(defaultData, true, 5);
    cy.contains("Nova campanha").click();
    campaigns.createCampaign("sell products", campaignData);
    campaigns.deleteCampaignByName(campaignData.campaignName);
  });

  it("DIRECTBUZZ-31", () => {
    const campaignData = campaignSellProducts.data(defaultData, true, 1);
    cy.contains("Nova campanha").click();
    campaigns.createCampaign("sell products", campaignData);
    campaigns.deleteCampaignByName(campaignData.campaignName);
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
    campaigns.selectCampaignType(campaignType);
    cy.get(variables.input.campaignName).type(campaignData.campaignName);
    cy.get(variables.input.campaignKeyword).type(faker.random.alphaNumeric(8));
    cy.get(variables.btn.nextStep).click();
    cy.contains("Já existe uma campanha com esse nome");
    cy.url().should(
      "not.be.equal",
      `${Cypress.config(`baseUrl`)}campaigns/new/campaign-goal-messages`
    );
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
    cy.get(variables.input.campaignName).type(faker.random.alphaNumeric(8));
    cy.get(variables.input.campaignKeyword).type(campaignData.campaignKeyword);
    cy.get(variables.btn.nextStep).click();
    cy.contains("Já existe uma campanha com essa palavra-chave");
    cy.url().should(
      "not.be.equal",
      `${Cypress.config(`baseUrl`)}campaigns/new/campaign-goal-messages`
    );
    campaigns.returnAndDeleteCampaign(campaignData.campaignName);
  });

  it("DIRECTBUZZ-5", () => {
    campaigns.selectCampaignType("generate contact list");
    cy.get(variables.input.campaignKeyword).type(faker.random.alphaNumeric(8));
    cy.get(variables.btn.nextStep).click();
    cy.contains("Informe um nome para sua campanha.");
    cy.url().should(
      "not.be.equal",
      `${Cypress.config(`baseUrl`)}campaigns/new/campaign-goal-messages`
    );
  });

  it("DIRECTBUZZ-6", () => {
    campaigns.selectCampaignType("generate contact list");
    cy.get(variables.input.campaignName).type(faker.random.alphaNumeric(8));
    cy.get(variables.btn.nextStep).click();
    cy.contains("Informe a palavra-chave para sua campanha.");
    cy.url().should(
      "not.be.equal",
      `${Cypress.config(`baseUrl`)}campaigns/new/campaign-goal-messages`
    );
  });

  it("DIRECTBUZZ-67", () => {
    campaigns.selectCampaignType("generate contact list");
    cy.get(variables.input.campaignName).type(faker.random.alphaNumeric(8));
    cy.get(variables.input.campaignKeyword).type(faker.random.alphaNumeric(8));
    cy.get(variables.btn.nextStep).click();
    cy.get(variables.input.emailRequest).clear();
    cy.get(variables.btn.nextStep).click();
    cy.contains("Informe uma mensagem.");
    cy.url().should(
      "not.be.equal",
      `${Cypress.config(`baseUrl`)}campaigns/new/campaign-base-messages`
    );
  });

  it("DIRECTBUZZ-68", () => {
    campaigns.selectCampaignType('generate contact list');
    cy.get(variables.btn.nextStep)
      .click()
    cy.contains("Informe a palavra-chave para sua campanha.");
    cy.contains("Informe um nome para sua campanha.");
    cy.url().should("include", "/campaigns/new/campaign-configs");
  });

});
