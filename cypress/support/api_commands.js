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

Cypress.Commands.add("api_createCampaign", (token, body) => {
  cy.request({
    url: `${Cypress.config("apiUrl")}/campaign`,
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
    },
    body: {
      name: "campaignName",
      keyword: "campaignKeyword",
      goalId: 2,
      instagramAccountId: 5633,
      initialData: {
        flows: [
          {
            name: "Funil 1",
            messages: [
              {
                name: "Mensagem inicial",
                text: "Oi *|PNOME|*!",
              },
              {
                name: "Mensagem de orientação",
                text: "Digite apenas o NÚMERO correspondente para escolher:",
              },
              {
                name: "Mensagem com as opções de produtos",
                text: "\n - produto1",
                triggers: [
                  {
                    answer: "1",
                    event: {
                      flowOrder: "2",
                      messageOrder: "1",
                    },
                  },
                ],
              },
            ],
          },
          {
            name: "Funil produto 1",
            messages: [
              {
                name: "Mensagem final",
                text: "Ótimo! Agora é só acessar o link abaixo:",
              },
              {
                name: "Mensagem link produto",
                text: "www.produto1.com",
              },
            ],
          },
        ],
      },
    },
  });
});
