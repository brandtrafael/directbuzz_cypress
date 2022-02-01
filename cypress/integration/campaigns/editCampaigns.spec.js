describe("Edit Project", () => {
  beforeEach(() => cy.login());
  it("DIRECTBUZZ-41", () => {
    const oldCampaignData = campaignSellProducts.data();
    const newCampaignData = campaignSellProducts.data();
    campaigns.createCampaign("sell products", oldCampaignData);
    campaigns.editCampaigns("sell products", oldCampaignData, newCampaignData);
    campaigns.deleteCampaignByName(newCampaignData.name);
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

  it("DIRECTBUZZ-32", () => {
    const campaignData = campaignSellProducts.data([
      {
        name: "campaignName",
        typeData: "alphaNumeric",
        numberData: 80,
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
    campaigns.createCampaign("sell products", campaignData);
    campaigns.altereStatusOfCampaign(campaignData.name);
    campaigns.deleteCampaignByName(campaignData.name);
  });
});
