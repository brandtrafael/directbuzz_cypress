export default {
  btn: {
    confirmDelete: "[data-test='btn-confirm-delete-campaign-dialog']",
    nextStep: "[data-test='btn-next-step-create-campaign-onboarding']",
    addProduct: "[data-test='btn-add-product-onboarding']",
    publishCampaign: "[data-test='btn-publish-campaign-onboarding']",
    createCampainSellProducts:
      "[data-test='container-create-campaign-sell-product-onboarding']",
    createCampainGenerateContactList:
      "[data-test='container-create-campaign-generate-list-onboarding']",
  },
  input: {
    productName: (index) =>
      `[data-test='input-product-name-${index}-onboarding'] > div > input`,
    productUrl: (index) =>
      `[data-test='input-url-product-${index}-onboarding'] > div > input`,
    campaignName: "[data-test='input-campaign-name-onboarding'] > div > input",
    campaignKeyword:
      "[data-test='input-initial-keyword-campaign-onboard'] > div > input",
    emailRequest:
      "[data-test='input-solicitation-message-onboarding'] > div > div > div > div > textarea",
    initalMessage:
      "[data-test='input-initial-message-onboarding'] > div > div > div > div > textarea",
    finalMessage:
      "[data-test='input-final-message-onboarding'] > div > div > div > div > textarea",
  },
};
