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
        cy.contains('Usuário ou senha inválido!');
    })
})