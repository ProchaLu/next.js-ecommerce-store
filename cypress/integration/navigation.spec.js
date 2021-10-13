describe('Navigation', () => {
  it('should navigate to most pages', () => {
    cy.visit('http://localhost:3000');
    // get to all products page
    cy.get('[data-cy="header-allProducts-link"]').click();
    // get to cart
    cy.get('[data-cy="header-cart-link"]').click();
    // get to landing page
    cy.get('[data-cy="header-landingPage-link"]').click();
  });
});
