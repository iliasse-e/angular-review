import { InputComponent } from './input.component';

describe('InputComponent', () => {

  beforeEach(() => {
    cy.mount(InputComponent);
  })

  it('should render input label', () => {
    cy.get('label').should('be.visible');
  });

  it('should render the input value', () => {
    cy.get('#name-control').type('Joey');
    cy.contains('My name is Joey');
  });

  it('should render error min lenght message', () => {
    cy.get('#name-control').type('J');
    cy.contains('Name should be at least 3 characters').should('be.visible');
  });

  it('should render error required message', () => {
    cy.get('#name-control').focus();
    cy.get('#name-control').blur();
    cy.contains('Name is required').should('be.visible');
  });
});
