describe('Navigation and Routing', () => {
    it('should navigate between current weather and forecast pages', () => {
      // Start at current weather
      cy.visit('http://localhost:4200/weather');
      cy.url().should('include', '/weather');
      cy.get('.app-header h1').should('contain', 'Current Weather');
  
      // Navigate to forecast
      cy.visit('http://localhost:4200/forecast');
      cy.url().should('include', '/forecast');
      cy.get('.app-header h1').should('contain', 'Weather Forecast');
  
      // Verify components load correctly after navigation
      cy.get('.search-card').should('be.visible');
      cy.get('input[formControlName="cityIds"]').should('be.visible');
    });
  });