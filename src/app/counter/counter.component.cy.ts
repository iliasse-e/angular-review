import { CounterComponent } from "./counter.component";

describe('CounterComponent', () => {

  it('should create', () => {
    cy.mount(CounterComponent)

    cy.get('[data-cy=count]').should('have.text', 0);
  });

  it('should increment', () => {
    cy.mount(CounterComponent)

    cy.get('[data-cy=increment]').click();
    cy.get('[data-cy=increment]').click();

    cy.get('[data-cy=count]').should('have.text', 2);

    cy.get('[data-cy=decrement]').click();

    cy.get('[data-cy=count]').should('have.text', 1);
  });
});
