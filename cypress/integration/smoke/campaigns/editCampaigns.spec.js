import campaigns from "../../../pages/campaigns";
import campaignSellProducts from "../../../factories/gui/campaignSellProducts";
import campaignGenerateContactList from "../../../factories/gui/campaignGenerateContactList";

describe("Scenario - Smoke - Edit Project", () => {
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

  it("DIRECTBUZZ-41", function () {
    const oldCampaignData = campaignSellProducts.data(defaultData, true, 5);
    const newCampaignData = campaignSellProducts.data(defaultData, true, 5);
    cy.api_createCampaign(oldCampaignData, "sell products");
    cy.login();
    campaigns.editCampaigns("sell products", oldCampaignData, newCampaignData);
    campaigns.deleteCampaignByName(newCampaignData.campaignName);
  });

  it("DIRECTBUZZ-32", () => {
    const campaignData = campaignSellProducts.data(defaultData, true, 5);
    cy.api_createCampaign(campaignData, "sell products");
    cy.login();
    campaigns.altereStatusOfCampaign(campaignData.campaignName);
    campaigns.deleteCampaignByName(campaignData.campaignName);
  });

  it("DIRECTBUZZ-21", () => {
    defaultData.push({
      name: "emailRequestMessage",
      typeData: "words",
      numberData: 20,
    });
    const oldCampaignData = campaignGenerateContactList.data(defaultData);
    const newCampaignData = campaignGenerateContactList.data(defaultData);
    cy.api_createCampaign(oldCampaignData, "generate contact list");
    cy.login();
    campaigns.editCampaigns(
      "generate contact list",
      oldCampaignData,
      newCampaignData
    );
    campaigns.deleteCampaignByName(newCampaignData.campaignName);
  });

  it("DIRECTBUZZ-66", () => {
    defaultData.push({
      name: "emailRequestMessage",
      typeData: "words",
      numberData: 20,
    });
    const campaignData = campaignGenerateContactList.data(defaultData);
    cy.api_createCampaign(campaignData, "generate contact list");
    cy.login();
    campaigns.altereStatusOfCampaign(campaignData.campaignName);
    campaigns.deleteCampaignByName(campaignData.campaignName);
  });
});
