describe('add 1 item to cart and checkout to thank you page', () => {
  it('visits singleProduct page, clicks item, checkout page and thank you', () => {
    cy.visit('http://localhost:3000');
    // get to products page
    cy.wait(2000)
      .get('[data-cy="header-allProducts-link"]')
      .should('be.visible')
      .click();
    // get to the first single product item
    cy.wait(2000);
    cy.contains('Nigeria Away Jersey').should('be.visible');
    cy.contains('Colombia Home Jersey').should('be.visible').click();
    // put first item in cart
    cy.wait(2000);
    cy.contains('Colombia Home Jersey').should('be.visible');
    cy.get('[data-cy="add-to-Cart"]').should('be.visible').click();
    // checkout page
    cy.wait(2000).contains('Colombia Home Jersey').should('be.visible');
    cy.wait(2000).get('[data-cy="move-to-Checkout"]').click();
    // press pay
    cy.wait(2000);
    cy.get('[data-cy="payment"]').should('be.visible').click();
    cy.contains('please enter your first name!').should('be.visible');
    // enter all forms from checkout page
    cy.wait(2000);
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
    cy.wait(2000).get('[data-cy="payment"]').should('be.visible').click();
    // thank you visible
    cy.wait(2000).contains('THANKS FOR YOUR ORDER').should('be.visible');
  });
});
