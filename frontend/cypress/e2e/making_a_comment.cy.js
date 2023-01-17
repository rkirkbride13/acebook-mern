describe("Creating post", () => {

    before(() => {
      cy.signup("user@email.com", "12345678", "test_person")
      cy.login("user@email.com", "12345678")
    })
  
    it("Able to add comment to posts", () => {
      cy.visit("/posts");
      cy.get("#commentContent").type("e2e test post");
      cy.get("#submitButton").click();
      
      cy.get('#feed').should('contains.text', "e2e test post");
    })
  })