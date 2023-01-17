import Comments from "./Comments";

describe("Comment", () => {
  it("renders a comment", () => {
    cy.mount(<Comments />)
    cy.get('[data-cy="comment"]').should('contain.text', 'Comments here')
  })
});