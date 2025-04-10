describe('Forecast Component Tests', () => {
    beforeEach(() => {
      // Visit the forecast page before each test
      cy.visit('http://localhost:4200/forecast');
    });
  
    it('should load the forecast component and display the header correctly', () => {
      cy.get('.app-header h1').should('have.text', 'Weather Forecast');
      cy.get('.search-card').should('be.visible');
      cy.get('.submit-button').should('be.visible')
        .and('contain.text', 'Get Forecast')
        .and('not.be.disabled');
    });
  
    it('should handle single city forecast search correctly', () => {
      // Type a single city ID
      cy.get('input[formControlName="cityIds"]').type('2172797');
      
      // Submit the form
      cy.get('.submit-button').click();
  
      // Check loading state
      cy.get('.spinner-container').should('be.visible');
      
      // After loading, verify forecast table appears
      cy.get('.forecast-table-container').should('be.visible');
      cy.get('table.forecast-table').should('exist');
      cy.get('th').should('have.length', 3); // Date, Temperature, Description columns
    });
  
    it('should handle multiple cities forecast search', () => {
      // Add multiple cities
      cy.get('input[formControlName="cityIds"]').type('2172797,2643743');
      
      // Submit form
      cy.get('.submit-button').click();
  
      // Verify multiple forecast tables are displayed
      cy.get('.forecast-table-container').should('have.length', 2);
    });
  
    it('should display weather icons in the forecast table', () => {
      // Search for a city
      cy.get('input[formControlName="cityIds"]').type('2172797');
      cy.get('.submit-button').click();
  
      // Verify weather icons are present in the description column
      cy.get('.weather-icon').should('exist');
      cy.get('.description-cell').should('exist')
    });
  
    it('should handle loading state correctly', () => {
      // Type city ID
      cy.get('input[formControlName="cityIds"]').type('2172797');
      
      // Click submit and verify loading states
      cy.get('.submit-button').click();
      
      // Button should show loading text
      cy.get('.submit-button').should('contain.text', 'Loading...');
      
      // Spinner should be visible
      cy.get('.spinner-container').should('be.visible');
      
      // After loading completes
      cy.get('.spinner-container').should('not.exist');
      cy.get('.submit-button').should('contain.text', 'Get Forecast');
    });
  });