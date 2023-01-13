describe("Creating post", () => {

  before(() => {
    cy.signup("user@email.com", "12345678")
    cy.login("user@email.com", "12345678")
  })

  it("when a post is create, page is refreshed to see it", () => {
    cy.visit("/posts");
    cy.get("#postContent").type("e2e test post");
    cy.get("#submitButton").click();
    cy.visit("/posts");

    cy.get('#feed').should('contains.text', "e2e test post")
  })
})