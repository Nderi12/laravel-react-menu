describe('Menu Details Test', () => {
  beforeEach(() => {
    cy.visit('/menu-page'); // Visits http://localhost:3000/menu-page
  });

  it('should expand and collapse tree', () => {
    // Check if the buttons exist
    cy.get('[data-cy="expand-all-button"]').should('be.visible')
    cy.get('[data-cy="collapse-all-button"]').should('be.visible')

    // Click the buttons to ensure they work
    cy.get('[data-cy="expand-all-button"]', {
      timeout: 30000
    }).click();
    cy.get('[data-cy="collapse-all-button"]', {
      timeout: 30000
    }).click();
  });

  it('should display the menu details form', () => {
    cy.get('[data-cy="individual-menu-item"]').should('be.visible');
    cy.get('[data-cy="individual-menu-item"]').click();

    // Check for availability of the input fields and buttons
    cy.get('[data-cy="menu-id-input"]').should('be.visible');
    cy.get('[data-cy="menu-depth-input"]').should('be.visible');
    cy.get('[data-cy="save-menu-button"]').should('be.visible');
    cy.get('[data-cy="delete-menu-button"]').should('be.visible')
  });

  it('should add a new menu item', () => {
    // Open the form to add a new menu item
    cy.get('[data-cy="add-menu-item"]').click();

    cy.get('[data-cy="menu-name-input"]').type('Cypress Menu Item');
    cy.get('[data-cy="save-menu-button"]', {
      timeout: 30000 // Add a minor delay
    }).click();

    cy.get('[data-cy="expand-all-button"]').click()
  });
});
