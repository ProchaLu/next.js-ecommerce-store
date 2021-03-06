describe('add and remove quantity from cart and delete the cart', () => {
  it('visits singleProduct page, clicks item and delete from cart', () => {
    cy.visit('http://localhost:3000/products');
    // get to the first single product item
    cy.contains('Nigeria Away Jersey').should('be.visible');
    cy.contains('Colombia Home Jersey').should('be.visible').click();
    // put first item in cart
    cy.contains('Colombia Home Jersey').should('be.visible');
    cy.get('[data-cy="add-to-Cart"]').should('be.visible').click();
    // go back to all products
    cy.get('[data-cy="header-allProducts-link"]').should('be.visible').click();
    // get to the last single product item
    cy.contains('England Away Jersey').should('be.visible');
    cy.contains('Nigeria Away Jersey').should('be.visible').click();
    // add to Cart
    // put first item in cart
    cy.contains('Nigeria Away Jersey').should('be.visible');
    cy.get('[data-cy="add-to-Cart"]').should('be.visible').click();
    // press + 2 times first item
    cy.get('[data-cy="deleteAll-in-Cart"').should('be.visible').click();
  });
});
