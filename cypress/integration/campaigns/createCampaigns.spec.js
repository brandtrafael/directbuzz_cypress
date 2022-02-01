import campaigns from "../../pages/campaigns";
import campaignSellProducts from "../../factories/gui/campaignSellProducts";
import campaignGenerateContactList from "../../factories/gui/campaignGenerateContactList";

describe("Create Project", () => {
  beforeEach(() => cy.login());

  it("DIRECTBUZZ-25", () => {
    const campaignData = campaignSellProducts.data([
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
    ]);
    campaigns.createCampaign("sell products", campaignData);
    campaigns.deleteCampaignByName(campaignData.campaignName);
  });

  it("DIRECTBUZZ-2", () => {
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
    campaigns.createCampaign("generate contact list", campaignData);
    campaigns.deleteCampaignByName(campaignData.campaignName);
  });
  it('DIRECTBUZZ-3', ()=>{
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
      }
    ])
    cy.api_createCampaign(campaignData, "generate contact list")
    cy.get("[data-test='btn-create-new-campaign'").click()
    cy.get("[data-test='container-create-campaign-generate-list-onboarding']").click()
    cy.get("[data-test='input-campaign-name-onboarding'] > div > input")
      .type(campaignData.campaignName)
    cy.get("[data-test='input-initial-keyword-campaign-onboard'] > div > input")
      .type(campaignData.campaignKeyword)
    cy.get("[data-test='btn-next-step-create-campaign-onboarding']").click()
  })
});
