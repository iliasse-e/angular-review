import { FormComponent } from './form.component';

describe('FormComponent', () => {
  it('should fill form', () => {
    cy.mount(FormComponent);

    cy.get('#name').type('Theo');
    cy.get('#name').should('have.value', 'Theo');

    cy.get('#email').type('theo@gmail.com');
    cy.get('#email').should('have.value', 'theo@gmail.com');

    cy.get('#age').type('34');
    cy.get('#age').should('have.value', '34');
  });
});
