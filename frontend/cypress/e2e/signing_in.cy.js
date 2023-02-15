describe("Signing in", () => {

  before(() => {
    cy.signup("user500@email.com", "12345678", "user500")
  })

  it("with valid credentials, redirects to '/posts'", () => {
    cy.visit("/login");
    cy.get("#email").type("user500@email.com");
    cy.get("#password").type("12345678");
    cy.get("#submit").click();

    cy.url().should("include", "/posts");
  });

  it("with missing password, redirects to '/login'", () => {
    cy.visit("/login");
    cy.get("#email").type("user500@email.com");
    cy.get("#submit").click();

    cy.url().should("include", "/login");
  });

  it("with missing email, redirects to '/login'", () => {
    cy.visit("/login");
    cy.get("#password").type("12345678");
    cy.get("#submit").click();

    cy.url().should("include", "/login");
  });


  it("when a user doesn't exsist, error message appears'", () => {
    cy.visit("/login");
    cy.get("#email").type("email")
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.get(".errorMessageLogin").should("contains.text", "This user is not registered - please signup first")
  });

  it("user did not input email, error message appears'", () => {
    cy.visit("/login");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.get(".errorMessageLogin").should("contains.text", "Please enter both your password and email")
  });

  it("user did not input password, error message appears'", () => {
    cy.visit("/login");
    cy.get("#email").type("email");
    cy.get("#submit").click();

    cy.get(".errorMessageLogin").should("contains.text", "Please enter both your password and email")
  });
});
