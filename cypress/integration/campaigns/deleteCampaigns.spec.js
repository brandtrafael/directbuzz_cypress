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

  it("DIRECTBUZZ-61", () => {
    const campaignData = campaignSellProducts.data(defaultData, true, 5);
    cy.api_createCampaign(campaignData, "sell products");
    cy.wait(60000);
    cy.reload();
    campaigns.deleteCampaignByName(campaignData.campaignName);
  });
});
