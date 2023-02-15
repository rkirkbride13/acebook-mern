describe("Liking post", () => {
  before(() => {
    cy.signup("user200@email.com", "12345678", "user200");
    cy.login("user200@email.com", "12345678");
  });

  it("when a post is liked, page is refreshed to see it", () => {
    cy.visit("/posts");
    cy.get("#postContent").type("user200 e2e test post");
    cy.get("#submitButton").click();
    cy.get("#heartButton").click();

    cy.get("#feed").should("contains.text", "💚: 1🔥: 0😡: 0");
    cy.get("#heartButton").click();
    cy.get("#feed").should("contains.text", "💚: 0🔥: 0😡: 0");
  });
});
