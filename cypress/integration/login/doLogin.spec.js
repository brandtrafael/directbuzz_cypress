describe('Do login',()=>{
    it('DIRECTBUZZ-12',()=>{
        cy.login();
    });
    it('DIRECTBUZZ-13',()=>{
        cy.visit("/");
        cy.get("[data-test='input-email-login'] > div > input").type(
          Cypress.env("unregisteredUser").username
        );
        cy.get("[data-test='input-password-login'] > div > input").type(
          Cypress.env("unregisteredUser").password
        );
        cy.get("[data-test='btn-login']").click();
        cy.url().should("not.be.equal", `${Cypress.config(`baseUrl`)}campaigns`);
        cy.get('#notistack-snackbar').should("have.text", "Usuário ou senha inválido!")
    })
})