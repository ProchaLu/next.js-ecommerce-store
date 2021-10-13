describe('add and remove quantity from cart and delete the cart', () => {
  it('visits singleProduct page, clicks item, clicks + / - and delete from cart', () => {
    cy.visit('http://localhost:3000');
    // get to products page
    cy.get('[data-cy="header-allProducts-link"]').click();
    // get to the first single product item
    cy.get('[data-cy="singleProduct-Link"]').first().click();
    // add to Cart visible
    cy.contains('ADD TO CART').should('be.visible');
    // put first item in cart
    cy.get('[data-cy="item-inCart"]').click();
    // go back to all products
    cy.get('[data-cy="header-allProducts-link"]').click();
    // get to the last single product item
    cy.get('[data-cy="singleProduct-Link"]').last().click();
    // add to Cart visible
    cy.contains('ADD TO CART').should('be.visible');
    // put last item in cart
    cy.get('[data-cy="item-inCart"]').click();
    // press + 2 times first item
    cy.get('[data-cy="plus-quantity-in-cart"').first().dblclick();
    // press - 1 time first item
    cy.get('[data-cy="minus-quantity-in-cart"').first().click();
    // press - 2 times last item, so it delete from cart
    cy.get('[data-cy="minus-quantity-in-cart"').last().dblclick();
    // press delete all from cart
    cy.get('[data-cy="deleteAll-in-Cart"').click();
  });
});
