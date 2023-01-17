import Post from "./Post";

describe("Post", () => {
  it("renders a post with a message", () => {
    cy.mount(<Post post={{ _id: 1, message: "Hello, world", likes: [] }} />);
    cy.get('[data-cy="post"]').should("contain.text", "Hello, world");
  });

  it("renders a post with a time stamp", () => {
    cy.mount(<Post post={{ _id: 1, createdAt: "2023-01-13T10:01:40.382Z", likes: [] }} />);

    cy.get('[data-cy="post"]').should("contain.text", "ago");
  });

  it("renders a post with likes", () => {
    cy.mount(<Post post={{ _id: 1, message: "Hello, world", likes: ['user1', 'user2'], createdAt: "2023-01-13T10:01:40.382Z" }} />);

    cy.get('[data-cy="post"]').should("contain.text", "heart_plus");
  });

  xit("updates the likes when click the like button", () => {
    cy.mount(<Post post={{ _id: 1, message: "Hello, world", likes: ['user1', 'user2'], createdAt: "2023-01-13T10:01:40.382Z" }} />);
    
    cy.intercept('PATCH', '/posts/1', { message: "OK" }).as("likePost")

    // cy.get("#postContent").type("Making a post");
    // cy.get("#submitButton").click();    
    cy.get("#likeButton").click();
    cy.wait('@likePost').then( interception => {
      expect(interception.response.body.message).to.eq("OK")
    })
  })
});
