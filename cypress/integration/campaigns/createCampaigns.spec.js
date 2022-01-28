import campaigns from "../../pages/campaigns";
import campaignSellProducts from "../../factories/campaignSellProducts";

describe("Create Project", () => {
  beforeEach(() => cy.login());
  it("DIRECTBUZZ-25", () => {
    const campaignData = campaignSellProducts.data();
    cy.get("[data-test='btn-create-new-campaign']").click();
    campaigns.createCampaign("sell products", campaignData);
  });
  
});
