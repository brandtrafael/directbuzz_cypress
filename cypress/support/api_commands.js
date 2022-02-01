import campaignDataCreate from "../factories/api/campaignDataCreate";

Cypress.Commands.add("api_login", () => {
  cy.request({
    url: `${Cypress.config("apiUrl")}/auth/login`,
    method: "POST",
    body: {
      email: Cypress.env("registeredUser").username,
      password: Cypress.env("registeredUser").password,
    },
  });
});

Cypress.Commands.add("api_createCampaign", (body, type) => {
  cy.api_login().then((res) => {
    return cy.request({
      url: `${Cypress.config("apiUrl")}/campaign`,
      method: "POST",
      headers: {
        authorization: `Bearer ${res.body.accessToken}`,
      },
      body: campaignDataCreate.data(body, type),
    });
  });
});
