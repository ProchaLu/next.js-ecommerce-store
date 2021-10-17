describe('Navigation', () => {
  it('should navigate to most pages', () => {
    cy.visit('http://localhost:3000');
    // get to all products page
    cy.get('[data-cy="header-allProducts-link"]').should('be.visible').click();
    // get to cart
    cy.get('[data-cy="header-cart-link"]').should('be.visible').click();
    // get to landing page
    cy.get('[data-cy="header-landingPage-link"]').should('be.visible').click();
  });
});
