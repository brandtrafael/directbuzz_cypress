
describe('testApi',()=>{
    it('apiCreateCampaign',()=>{
        cy.api_login().then((response)=>{
            cy.api_createCampaign(response.body.accessToken)
        })
    })
    it('apiCreateCampaign',()=>{
    })
})