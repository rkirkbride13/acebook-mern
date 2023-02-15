describe("Creating post", () => {
  before(() => {
    cy.signup("user400@email.com", "12345678", "user400")
    cy.login("user400@email.com", "12345678")
  })

  it("when a post is created, page is refreshed to see it", () => {
    cy.visit("/posts");
    cy.get("#postContent").type("user400 e2e test post");
    cy.get("#submitButton").click();

    cy.get("#feed").should("contains.text", "user400 e2e test post");
  });
});
