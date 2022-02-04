import campaigns from "../../../pages/campaigns";
import campaignSellProducts from "../../../factories/gui/campaignSellProducts";
import campaignGenerateContactList from "../../../factories/gui/campaignGenerateContactList";

describe("Scenario - Smoke - See Project Contacts", () => {
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

  it("DIRECTBUZZ-64", () => {
    const campaignData = campaignSellProducts.data(defaultData);
    cy.api_createCampaign(campaignData, "sell products");
    cy.login();
    campaigns.seeCampaignContacts(campaignData.campaignName);
    campaigns.returnAndDeleteCampaign(campaignData.campaignName);
  });

  it("DIRECTBUZZ-65", () => {
    defaultData.push({
      name: "emailRequestMessage",
      typeData: "words",
      numberData: 20,
    });
    const campaignData = campaignGenerateContactList.data(defaultData);
    cy.api_createCampaign(campaignData, "generate contact list");
    cy.login();
    campaigns.seeCampaignContacts(campaignData.campaignName);
    campaigns.returnAndDeleteCampaign(campaignData.campaignName);
  });
});
