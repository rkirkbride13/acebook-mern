import Post from "./Post";

describe("Post", () => {
  it("renders a post with a message", () => {
    cy.mount(
      <Post
        post={{
          _id: 1,
          message: "Hello, world",
          likes: [],
          hearts: [],
          fires: [],
          angrys: [],
        }}
      />
    );
    cy.get('[data-cy="post"]').should("contain.text", "Hello, world");
  });

  it("renders a post with a time stamp", () => {
    cy.mount(
      <Post
        post={{
          _id: 1,
          message: "Hello, world",
          createdAt: "2023-01-13T10:01:40.382Z",
          likes: [],
          hearts: [],
          fires: [],
          angrys: [],
        }}
      />
    );

    cy.get('[data-cy="post"]').should("contain.text", "ago");
  });

  it("renders a post with likes", () => {
    cy.mount(
      <Post
        post={{
          _id: 1,
          message: "Hello, world",
          likes: [],
          hearts: ["user1", "user2"],
          fires: [],
          angrys: ["user3"],
          createdAt: "2023-01-13T10:01:40.382Z",
        }}
      />
    );

    cy.get('[data-cy="post"]').should("contain.text", "💚: 2🔥: 0😡: 1");
  });

  it("renders a long post with a reveal more button", () => {
    cy.mount(
      <Post
        post={{
          _id: 1,
          message:
            "This is a long message and hopefully part of it will get hidden once I've added some functionality where the",
          likes: [],
          hearts: [],
          fires: [],
          angrys: [],
          createdAt: "2023-01-13T10:01:40.382Z",
        }}
      />
    );

    cy.get('[data-cy="post"]').should(
      "contain.text",
      "This is a long message and hopefully part of it will get hidden once I've added some functionality w..."
    );
  });

  it("renders a delete button on post", () => {
    cy.mount(
      <Post
        post={{
          _id: 1,
          message: "Hello, world",
          likes: [],
          user_id: null,
          hearts: [],
          fires: [],
          angrys: [],
        }}
      />
    );
    cy.get('[data-cy="deleteButton"]').should("contains.text", "delete");
  });

  it("can create a DELETE request to /posts", () => {
    const setTokenMock = cy.stub();

    cy.mount(
      <Post
        post={{
          _id: 1,
          message: "Hello, world",
          createdAt: "2023-01-13T10:01:40.382Z",
          likes: [],
          user_id: null,
          hearts: [],
          fires: [],
          angrys: [],
        }}
        setToken={setTokenMock}
      />
    );

    cy.intercept("DELETE", "/posts", {
      message: "DELETE",
      token: "fakeToken",
    }).as("deletePostRequest");

    cy.get('[data-cy="deleteButton"]').click();
    cy.get("#confirmDeleteButton").click();
    cy.wait("@deletePostRequest").then((interception) => {
      expect(interception.response.body.message).to.eq("DELETE");
      expect(interception.response.body.token).to.eq("fakeToken");
    });
  });
});
