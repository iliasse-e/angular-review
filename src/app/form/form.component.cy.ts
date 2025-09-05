import { FormComponent } from './form.component';

describe('FormComponent', () => {
  it('should fill form', () => {
    cy.mount(FormComponent);

    cy.get('#name').type('Theo').should('have.value', 'Theo');

    cy.get('#email').type('theo@gmail.com').should('have.value', 'theo@gmail.com');

    cy.get('#age').type('34').should('have.value', '34');
  });
});
