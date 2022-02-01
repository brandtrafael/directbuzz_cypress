export default {
  data: (body, type) => {
    const handlerTriggers = (products) => {
      products.map((product, index) => ({
        answer: String(index),
        event: {
          flowOrder: String(index) + 1,
          messageOrder: 1,
        },
      }));
    };

    const handlerProductName = (products) => {
      return products.reduce(
        (acc, currrent) => acc.concat(`\n1 - ${currrent.productName}`),
        ""
      );
    };

    const handlerFlows = (type, products) => {
      if (type === "sell products") {
        return products.reduce((acc, current, index) => {
          acc[index] = {
            name: `Funil produto ${index + 1}`,
            messages: [
              {
                name: "Mensagem final",
                text: "Ótimo! Agora é só acessar o link abaixo:",
              },
              {
                name: "Mensagem link produto",
                text: current.productUrl,
              },
            ],
          };
          return acc;
        }, {});
      }
      return {
        0: {
          name: "Funil 2",
          messages: [
            {
              name: "Mensagem final",
              text: body.emailRequestMessage,
            },
          ],
        },
      };
    };

    return {
      name: body.campaignName,
      keyword: body.campaignKeyword,
      goalId: 2,
      instagramAccountId: 5633,
      initialData: {
        flows: [
          {
            name: "Funil 1",
            messages: [
              {
                name: "Mensagem inicial",
                text: body.initialMessage,
              },
              type === "sell products"
                ? {
                    name: "Mensagem de orientação",
                    text: "Digite apenas o NÚMERO correspondente para escolher:",
                  }
                : false,
              {
                name:
                  type === "sell products"
                    ? "Mensagem com as opções de produtos"
                    : "Mensagem para capturar email",
                text:
                  type === "sell products"
                    ? handlerProductName(body.products)
                    : "Vamos lá. Informe o seu e-mail para receber nossas novidades e ofertas",
                triggers:
                  type === "sell products"
                    ? handlerTriggers(body.products)
                    : [
                        {
                          captureEmail: true,
                          event: {
                            flowOrder: 2,
                            messageOrder: 1,
                          },
                        },
                      ],
              },
            ].filter(Boolean),
          },
          ...Object.values(handlerFlows(type, body.products)),
        ],
      },
    };
  },
};
