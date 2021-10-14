describe('add and remove quantity from cart and delete the cart', () => {
  it('visits singleProduct page, clicks item, clicks + / - and delete from cart', () => {
    cy.visit('http://localhost:3000');
    // get to products page
    cy.wait(1000);
    cy.get('[data-cy="header-allProducts-link"]').should('exist').click();
    // get to the first single product item
    cy.wait(1000);
    cy.contains('Nigeria Away Jersey').should('exist');
    cy.contains('Colombia Home Jersey').should('exist').click();
    // add to Cart
    cy.wait(1000);
    cy.contains('ADD TO CART').should('exist');
    // put first item in cart
    cy.get('[data-cy="add-to-Cart"]').should('exist').click();
    // go back to all products
    cy.wait(1000);
    cy.get('[data-cy="header-allProducts-link"]').should('exist').click();
    // get to the last single product item
    cy.wait(1000);
    cy.contains('England Away Jersey').should('exist');
    cy.contains('Nigeria Away Jersey').should('exist').click();
    // add to Cart
    cy.wait(1000);
    cy.contains('ADD TO CART').should('exist');
    // put last item in cart
    cy.get('[data-cy="add-to-Cart"]').should('exist').click();
    // press + 2 times first item
    cy.get('[data-cy="plus-quantity-in-cart"')
      .should('exist')
      .first()
      .dblclick();
    // press - 1 time first item
    cy.get('[data-cy="minus-quantity-in-cart"').should('exist').first().click();
    // press - 2 times last item, so it delete from cart
    cy.get('[data-cy="minus-quantity-in-cart"')
      .should('exist')
      .last()
      .dblclick();
    // press delete all from cart
    cy.get('[data-cy="deleteAll-in-Cart"').should('exist').click();
  });
});
