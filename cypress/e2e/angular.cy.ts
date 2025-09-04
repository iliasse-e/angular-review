describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://angular.dev/overview');

    cy.contains('What is Angular?');

    cy.get('a.docs-card')
      .should('have.length', 17);

    cy.contains('Signals').click();

    cy.contains('Angular Signals');

  })
})
