import campaigns from "../../pages/campaigns";
import campaignSellProducts from "../../factories/campaignSellProducts";
import campaignGenerateContactList from "../../factories/campaignGenerateContactList";

describe("Create Project", () => {
  beforeEach(() => cy.login());
  it("DIRECTBUZZ-25", () => {
    const campaignData = campaignSellProducts.data();
    campaigns.createCampaign("sell products", campaignData);
    campaigns.deleteCampaignByName(campaignData.name);
  });

  it("DIRECTBUZZ-41", () => {
    const oldCampaignData = campaignSellProducts.data();
    const newCampaignData = campaignSellProducts.data();
    campaigns.createCampaign("sell products", oldCampaignData);
    campaigns.editCampaigns("sell products", oldCampaignData, newCampaignData);
    campaigns.deleteCampaignByName(newCampaignData.name);
  });

  it("DIRECTBUZZ-32", () => {
    const campaignData = campaignSellProducts.data();
    campaigns.createCampaign("sell products", campaignData);
    campaigns.altereStatusOfCampaign(campaignData.name);
    campaigns.deleteCampaignByName(campaignData.name);
  });

  it("DIRECTBUZZ-2", () => {
    const campaignData = campaignGenerateContactList.data();
    campaigns.createCampaign("generate contact list", campaignData);
    campaigns.deleteCampaignByName(campaignData.name);
  });

  it("DIRECTBUZZ-21", () => {
    const oldCampaignData = campaignGenerateContactList.data();
    const newCampaignData = campaignGenerateContactList.data();
    campaigns.createCampaign("generate contact list", oldCampaignData);
    campaigns.editCampaigns(
      "generate contact list",
      oldCampaignData,
      newCampaignData
    );
    campaigns.deleteCampaignByName(newCampaignData.name);
  });

  it("DIRECTBUZZ-66", () => {
    const campaignData = campaignGenerateContactList.data();
    campaigns.createCampaign("generate contact list", campaignData);
    campaigns.altereStatusOfCampaign(campaignData.name);
    campaigns.deleteCampaignByName(campaignData.name);
  });
});
