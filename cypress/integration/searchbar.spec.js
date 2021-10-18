describe('test to search for a product', () => {
  it('visits products page and search for a product', () => {
    cy.visit('http://localhost:3000/products');
    // enter a search term
    cy.get('[data-cy="searchbar"]').should('be.visible').type('Brasil');
    cy.contains('Brasil Home Jersey').should('be.visible');
  });
});
