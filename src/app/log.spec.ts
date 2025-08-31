import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/angular'
import {logRoles} from '@testing-library/dom'
import { SelectComponent } from './select/select.component';

const OPTIONS = [
  {key:'p1', label:'option 1'},
  {key:'p2', label:'option 2'}
]

describe('SelectComponent', () => {

  it('should render', async () => {
    await render(SelectComponent, {
      inputs: {options: OPTIONS}
    })

    expect(screen.getByText('Products')).toBeVisible();
  });

  it('should log debug', async () => {
    await render(SelectComponent, {
      inputs: {options: OPTIONS}
    })

    // Logs element (that we give as arg) or entire document
    screen.debug(screen.getByRole('option', { name: /option 1/i }));
  });

    it('should expose playground', async () => {
    await render(SelectComponent, {
      inputs: {options: OPTIONS}
    })

    // Exposes link of playground (of element or entire document)
    screen.logTestingPlaygroundURL(screen.getByRole('option', { name: /option 1/i }));
  });

      it('should log roles', async () => {
    await render(SelectComponent, {
      inputs: {options: OPTIONS}
    })

    // Exposes link of playground (of element or entire document)
    logRoles(screen.getByLabelText('Products'));
  });

});
