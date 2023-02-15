describe("Creating post", () => {

    before(() => {
      cy.signup("user300@email.com", "12345678", "user300")
      cy.login("user300@email.com", "12345678")
    })
  
    it("Able to add comment to posts", () => {
      cy.visit("/posts");
      cy.get('.commentButton').first().click();
      cy.get("#commentContent").type("user300 e2e test comment");
      cy.get("#submitButton").click();
      
      cy.get('#feed').should('contains.text', "user300 e2e test comment");
    })
  })