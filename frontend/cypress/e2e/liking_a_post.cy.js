describe("Liking post", () => {

  before(() => {
    cy.signup("user@email.com", "12345678", "username")
    cy.login("user@email.com", "12345678")
  })

  it("when a post is liked, page is refreshed to see it", () => {
    cy.visit("/posts");
    cy.get("#postContent").type("e2e test post");
    cy.get("#submitButton").click();
    cy.get("#likeButton").click();
    
    cy.get('#feed').should('contains.text', "heart_plus 1");
  })

  it("when a post is liked and then unliked, page is refreshed to see it", () => {
    cy.visit("/posts");
    cy.get("#postContent").type("e2e test post");
    cy.get("#submitButton").click();
    cy.get("#likeButton").click();
    cy.get('#feed').should('contains.text', "heart_plus 1");
    cy.get("#likeButton").click();
    cy.get('#feed').should('contains.text', "heart_plus 0");
  })
})