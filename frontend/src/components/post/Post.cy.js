import Post from "./Post";

describe("Post", () => {
  it("renders a post with a message", () => {
    cy.mount(<Post post={{ _id: 1, message: "Hello, world" }} />);
    cy.get('[data-cy="post"]').should("contain.text", "Hello, world");
  });

  it("renders a post with a time stamp", () => {
    cy.mount(<Post post={{ _id: 1, createdAt: "2023-01-13T10:01:40.382Z" }} />);

    cy.get('[data-cy="post"]').should("contain.text", "ago");
  });
});
