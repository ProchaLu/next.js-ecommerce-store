describe('Navigation', () => {
  it('should navigate to most pages', () => {
    cy.visit('http://localhost:3000');
    // get to all products page
    cy.wait(1000);
    cy.get('[data-cy="header-allProducts-link"]').should('exist').click();
    // get to cart
    cy.wait(1000);
    cy.get('[data-cy="header-cart-link"]').should('exist').click();
    // get to landing page
    cy.wait(1000);
    cy.get('[data-cy="header-landingPage-link"]').should('exist').click();
  });
});
