describe('add 1 item to cart and checkout to thank you page', () => {
  it('visits singleProduct page, clicks item, checkout page and thank you', () => {
    cy.visit('http://localhost:3000');
    // get to products page
    cy.get('[data-cy="header-allProducts-link"]').should('be.visible').click();
    // get to the first single product item
    cy.contains('Colombia Home Jersey').should('be.visible').click();
    // add to Cart visible
    cy.contains('ADD TO CART').should('be.visible');
    // put first item in cart
    cy.get('[data-cy="item-inCart"]').should('be.visible').click();
    // checkout visible
    cy.contains('CHECKOUT').should('be.visible');
    // check total Items
    cy.contains('Total Items: 1').should('be.visible');
    // check total amount
    cy.contains('Total Price: 90.00€').should('be.visible');
    // go to checkout
    cy.get('[data-cy="item-toCheckout"]').should('be.visible').click();
    // enter all forms from checkout page
    cy.contains('First Name').should('be.visible');
    cy.get('[data-cy="first-name"]').type('Max');
    cy.get('[data-cy="last-name"]').type('Mustermann');
    cy.get('[data-cy="mail"]').type('max@mustermann.at');
    cy.get('[data-cy="address"]').type('Markhof 19');
    cy.get('[data-cy="zipcode"]').type('1030');
    cy.get('[data-cy="city"]').type('Vienna');
    cy.get('[data-cy="state"]').type('Austria');
    cy.get('[data-cy="creditcardholder"]').type('Max Mustermann');
    cy.get('[data-cy="creditcardnumber"]').type('4000 1000 1000 1000');
    cy.get('[data-cy="creditcardexpirydate"]').type('01/23');
    cy.get('[data-cy="ccv"]').type('123');
    // press pay
    cy.get('[data-cy="payment"]').should('be.visible').click();
    // thank you visible
    cy.contains('THANKS FOR YOUR ORDER').should('be.visible');
  });
});
