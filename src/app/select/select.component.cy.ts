import { SelectComponent } from './select.component';

const OPTIONS = [
  {key:'p1', label:'option 1'},
  {key:'p2', label:'option 2'}
]

describe('SelectComponent', () => {

  it('should handle select option behaviour', () => {
    cy.mount(SelectComponent, {
      componentProperties: {
        options: OPTIONS
      }
    })

    cy.get("select").select('p2').should('have.value', 'p2');
  });

});
