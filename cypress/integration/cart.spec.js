describe('add and remove quantity from cart and delete the cart', () => {
  it('visits singleProduct page, clicks item, clicks + / - and delete from cart', () => {
    cy.visit('http://localhost:3000');
    // get to products page
    cy.wait(1000);
    cy.get('[data-cy="header-allProducts-link"]').should('be.visible').click();
    // get to the first single product item
    cy.wait(1000);
    cy.contains('Nigeria Away Jersey').should('be.visible');
    cy.contains('Colombia Home Jersey').should('be.visible').click();
    // add to Cart visible
    cy.wait(1000);
    cy.contains('ADD TO CART').should('be.visible');
    // put first item in cart
    cy.get('[data-cy="add-to-Cart"]').should('be.visible').click();
    // go back to all products
    cy.wait(1000);
    cy.get('[data-cy="header-allProducts-link"]').should('be.visible').click();
    // get to the last single product item
    cy.wait(1000);
    cy.contains('England Away Jersey').should('be.visible');
    cy.contains('Nigeria Away Jersey').should('be.visible').click();
    // add to Cart visible
    cy.wait(1000);
    cy.contains('ADD TO CART').should('be.visible');
    // put last item in cart
    cy.get('[data-cy="add-to-Cart"]').should('be.visible').click();
    // press + 2 times first item
    cy.get('[data-cy="plus-quantity-in-cart"')
      .should('be.visible')
      .first()
      .dblclick();
    // press - 1 time first item
    cy.get('[data-cy="minus-quantity-in-cart"')
      .should('be.visible')
      .first()
      .click();
    // press - 2 times last item, so it delete from cart
    cy.get('[data-cy="minus-quantity-in-cart"')
      .should('be.visible')
      .last()
      .dblclick();
    // press delete all from cart
    cy.get('[data-cy="deleteAll-in-Cart"').should('be.visible').click();
  });
});
