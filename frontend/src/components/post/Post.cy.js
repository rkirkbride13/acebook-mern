import Post from "./Post";

const navigate = () => {};

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

  it("renders a delete button on post", () => {
    cy.mount(<Post post={{ _id: 1, message: "Hello, world", likes: [] }} />);
    cy.get('[data-cy="deleteButton"]').should("contains.text", "delete");
  });

  it("can create a DELETE request to /posts", () => {
    const setTokenMock = cy.stub();

    cy.mount(
      <Post
        post={{ _id: 1, createdAt: "2023-01-13T10:01:40.382Z", likes: [] }}
        setToken={setTokenMock}
      />
    );

    cy.intercept("DELETE", "/posts", {
      message: "DELETE",
      token: "fakeToken",
    }).as("deletePostRequest");

    // cy.mount(<Post navigate={navigate} />);

    cy.get('[data-cy="deleteButton"]').click();
    cy.wait("@deletePostRequest").then((interception) => {
      expect(interception.response.body.message).to.eq("DELETE");
      expect(interception.response.body.token).to.eq("fakeToken");
    });
  });
});
