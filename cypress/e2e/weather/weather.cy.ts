describe('Weather Component Tests', () => {
  beforeEach(() => {
    // Visit the weather page before each test
    cy.visit('http://localhost:4200/weather');
  });

  it('should load the weather component and display the header correctly', () => {
    cy.get('.app-header h1').should('have.text', 'Current Weather');
    cy.get('.search-card').should('be.visible');
    cy.get('.submit-button').should('be.visible')
      .and('contain.text', 'Get Weather')
      .and('not.be.disabled');
  });

  it('should handle single city weather search correctly', () => {
    // Type a single city ID
    cy.get('input[formControlName="cityIds"]').type('2172797');
    
    // Submit the form
    cy.get('.submit-button').click();

    // Check loading state
    cy.get('.spinner-container').should('be.visible');
    
    // After loading, verify weather card appears
    cy.get('.weather-card').should('be.visible');
    cy.get('.temperature').should('exist');
    cy.get('.city-details h2').should('exist');
    cy.get('.weather-icon').should('be.visible');
  });

  it('should handle multiple cities weather search with chips', () => {
    // Add multiple cities
    cy.get('input[formControlName="cityIds"]').type('2172797,2643743,5128581');
    
    // Submit form
    cy.get('.submit-button').click();

    // Verify multiple weather cards are displayed
    cy.get('.weather-card').should('have.length.gt', 1);
  });

  it('should display error message for invalid city ID', () => {
    // Type invalid city ID
    cy.get('input[formControlName="cityIds"]').type('99999999');
    
    // Submit form
    cy.get('.submit-button').click();

    // Verify error message appears (assuming you're using MatSnackBar)
    cy.get('.mat-mdc-snack-bar-container').should('be.visible')
      .and('contain.text', 'Error');
  });

  it('should allow removing cities using chips', () => {
    // Add multiple cities first
    cy.get('input[formControlName="cityIds"]').type('2172797,2643743');
    
    // Wait for chips to appear
    cy.get('mat-chip-row').should('have.length', 2);

    // Remove one city by clicking the cancel button
    cy.get('mat-chip-row').first().within(() => {
      cy.get('button[matchipremove]').click();
    });

    // Verify chip was removed
    cy.get('mat-chip-row').should('have.length', 1);
  });
});