import variables from "../../pages/campaigns/variables";
import campaigns from "../../pages/campaigns";
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

  //Sell products

  it("DIRECTBUZZ-26", () => {
    campaigns.selectCampaignType('sell products');
    campaigns.nextStep();
    cy.contains("Informe a palavra-chave para sua campanha.");
    cy.contains("Informe um nome para sua campanha.");
    cy.url().should("include", "/campaigns/new/campaign-configs");
  });

  it("DIRECTBUZZ-27", () => {
    const campaignData = campaignSellProducts.data(defaultData, true, 5);
    campaigns.selectCampaignType('sell products');
    cy.get(variables.input.campaignName)
      .clear()
      .type(campaignData.campaignName);
    campaigns.nextStep();
    cy.contains("Informe a palavra-chave para sua campanha.");
    cy.url().should("include", "/campaigns/new/campaign-configs");
  });

  it("DIRECTBUZZ-28", () => {
    const campaignData = campaignSellProducts.data(defaultData, true, 5);
    campaigns.selectCampaignType('sell products');
    cy.get(variables.input.campaignKeyword)
      .clear()
      .type(campaignData.campaignKeyword);
    campaigns.nextStep();
    cy.contains("Informe um nome para sua campanha.");
    cy.url().should("include", "/campaigns/new/campaign-configs");
  });

  it("DIRECTBUZZ-29", () => {
    const campaignData = campaignSellProducts.data(defaultData, false, 1);
    campaigns.selectCampaignType('sell products');
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
    cy.url().should("include", "/campaigns/new/campaign-goal-messages");
  });

  it("DIRECTBUZZ-30", () => {
    const campaignData = campaignSellProducts.data(defaultData, true, 5);
    campaigns.createCampaign("sell products", campaignData);
    campaigns.deleteCampaignByName(campaignData.campaignName);
  });

  it("DIRECTBUZZ-69", () => {
    const campaignData = campaignSellProducts.data(defaultData);
    const campaignType = "sell products";

    cy.api_createCampaign(campaignData, campaignType);
    campaigns.selectCampaignType(campaignType);
    cy.get(variables.input.campaignName)
      .clear()
      .type(campaignData.campaignName);
    cy.get(variables.input.campaignKeyword)
      .clear()
      .type(faker.random.alphaNumeric(8));
    campaigns.nextStep();
    
    cy.contains("Já existe uma campanha com esse nome");
    cy.url().should("include", "/campaigns/new/campaign-configs");
    campaigns.returnAndDeleteCampaign(campaignData.campaignName);
  })

  it("DIRECTBUZZ-70", () => {
    const campaignData = campaignSellProducts.data(defaultData);
    const campaignType = "sell products";

    cy.api_createCampaign(campaignData, campaignType);
    campaigns.selectCampaignType(campaignType);
    cy.get(variables.input.campaignName)
      .clear()
      .type(faker.random.alphaNumeric(8));
    cy.get(variables.input.campaignKeyword)
      .clear()
      .type(campaignData.campaignKeyword);
    campaigns.nextStep();
    cy.contains("Já existe uma campanha com essa palavra-chave");
    cy.url().should("include", "/campaigns/new/campaign-configs");
    campaigns.returnAndDeleteCampaign(campaignData.campaignName);
  })

  //Generate contact list

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
    cy.get(variables.input.campaignName)
      .clear()
      .type(campaignData.campaignName);
    cy.get(variables.input.campaignKeyword)
      .clear()
      .type(faker.random.alphaNumeric(8));
    campaigns.nextStep();
    cy.contains("Já existe uma campanha com esse nome");
    cy.url().should("include", "/campaigns/new/campaign-configs");
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
      .clear()
      .type(faker.random.alphaNumeric(8));
    cy.get(variables.input.campaignKeyword)
      .clear()
      .type(campaignData.campaignKeyword);
    campaigns.nextStep();
    cy.contains("Já existe uma campanha com essa palavra-chave");
    cy.url().should("include", "/campaigns/new/campaign-configs");
    campaigns.returnAndDeleteCampaign(campaignData.campaignName);
  });

  it("DIRECTBUZZ-5", () => {
    campaigns.selectCampaignType("generate contact list");
    cy.get(variables.input.campaignKeyword)
      .clear()
      .type(faker.random.alphaNumeric(8));
    campaigns.nextStep();
    cy.contains("Informe um nome para sua campanha.");
    cy.url().should("include", "/campaigns/new/campaign-configs");
  });

  it("DIRECTBUZZ-6", () => {
    campaigns.selectCampaignType("generate contact list");
    cy.get(variables.input.campaignName)
      .clear()
      .type(faker.random.alphaNumeric(8));
    campaigns.nextStep();
    cy.contains("Informe a palavra-chave para sua campanha.");
    cy.url().should("include", "/campaigns/new/campaign-configs");
  });

  it("DIRECTBUZZ-67", () => {
    campaigns.selectCampaignType("generate contact list");
    cy.get(variables.input.campaignName)
      .clear()
      .type(faker.random.alphaNumeric(8));
    cy.get(variables.input.campaignKeyword)
      .clear()
      .type(faker.random.alphaNumeric(8));
    campaigns.nextStep();
    cy.get(variables.input.emailRequest)
      .clear();
    campaigns.nextStep();
    cy.contains("Informe uma mensagem.");
    cy.url().should("include", "/campaigns/new/campaign-goal-messages");
  });

  it("DIRECTBUZZ-68", () => {
    campaigns.selectCampaignType('generate contact list');
    campaigns.nextStep();
      
    cy.contains("Informe a palavra-chave para sua campanha.");
    cy.contains("Informe um nome para sua campanha.");
    cy.url().should("include", "/campaigns/new/campaign-configs");
  });

});
