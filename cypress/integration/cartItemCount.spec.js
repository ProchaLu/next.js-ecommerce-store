describe('add and remove quantity', () => {
  it('visits singleProduct page, clicks + - ', () => {
    cy.visit('http://localhost:3000/products');
    // get to the first single product item
    cy.contains('Nigeria Away Jersey').should('be.visible');
    cy.contains('Colombia Home Jersey').should('be.visible').click();
    // put first item in cart
    cy.contains('Colombia Home Jersey').should('be.visible');
    cy.get('[data-cy="add-to-Cart"]').should('be.visible').click();
    // press + itemCount
    cy.get('[data-cy="plus-quantity-in-cart"')
      .should('be.visible')
      .dblclick()
      .dblclick();
    // press - 1 time first item
    cy.get('[data-cy="minus-quantity-in-cart"').should('be.visible').click();
    // check total Items
    cy.contains('Total Items: 4').should('be.visible');
  });
});
