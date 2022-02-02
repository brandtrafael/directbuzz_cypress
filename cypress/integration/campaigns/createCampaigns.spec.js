import variables from "../../pages/campaigns/variables";
import campaigns from "../../pages/campaigns/campaigns";
import campaignSellProducts from "../../factories/gui/campaignSellProducts";

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
});
