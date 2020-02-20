describe("Todo app", () => {
  it("create a new todo with default priority and catogory", () => {
    cy.visit("/");
    cy.get("#input-add-todo").type("A new todo generated by cypress{enter}");
    cy.get("#input-add-todo").type(
      "Another new todo - will be deleted later{enter}"
    );
  });

  it("create a new todo with High priority and Life Changing catogory", () => {
    cy.get("#input-add-todo").type(
      "A new todo with High priority and Life Changing category"
    );
    cy.get("#btn-priority").click();

    cy.get("#list-priority-dropdown .v-list-item-group")
      .children()
      .eq(3)
      .click();

    cy.get("#btn-category").click();

    cy.get("#list-category-dropdown .v-list-item-group")
      .children()
      .eq(2)
      .click();
    cy.get("#input-add-todo").type("{enter}");
  });

  it("create a new todo with Medium priority and Important catogory", () => {
    cy.get("#input-add-todo").type(
      "A new todo with Medium priority and Importantcategory"
    );
    cy.get("#btn-priority").click();

    cy.get("#list-priority-dropdown .v-list-item-group")
      .children()
      .eq(2)
      .click();

    cy.get("#btn-category").click();

    cy.get("#list-category-dropdown .v-list-item-group")
      .children()
      .eq(1)
      .click();
    cy.get("#input-add-todo").type("{enter}");
  });

  it("create a new todo with Low priority and Meh catogory", () => {
    cy.get("#input-add-todo").type(
      "A new todo with Low priority and Meh category"
    );
    cy.get("#btn-priority").click();

    cy.get("#list-priority-dropdown .v-list-item-group")
      .children()
      .eq(1)
      .click();

    cy.get("#btn-category").click();

    cy.get("#list-category-dropdown .v-list-item-group")
      .children()
      .eq(0)
      .click();
    cy.get("#input-add-todo").type("{enter}");
  });

  it("edit todo item by double clicking item label", () => {
    cy.get("#list-todo")
      .children()
      .eq(2)
      .dblclick();

    cy.get("#list-todo .v-text-field__slot  input")
      .eq(2)
      .clear()
      .type("Edited with dblclick{enter}");
  });

  it("edit todo item by using the edit button", () => {
    cy.get("#list-todo .v-btn")
      .eq(2)
      .click()
      .get("#list-todo .v-text-field__slot  input")
      .eq(1)
      .clear()
      .type("Edited with edit button{enter}");
  });

  it("delete a todo", () => {
    cy.get("#list-todo .btn-delete-item")
      .eq(4)
      .click();
  });

  it("mark todo complete", () => {
    cy.get(".priority-checkbox")
      .eq(0)
      .click();
  });

  it("Sort by priority", () => {
    cy.get("#btn-sort-priority").click();
  });

  it("Sort by priority, again", () => {
    cy.get("#btn-sort-priority").click();
  });

  it("Clear all todos", () => {
    cy.get("#btn-clear-all").click();
  });
});
