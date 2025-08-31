import '@testing-library/jest-dom'
import { SelectComponent } from './select.component';
import {render, screen} from '@testing-library/angular';
import {userEvent} from '@testing-library/user-event';

const OPTIONS = [
  {key:'p1', label:'option 1'},
  {key:'p2', label:'option 2'}
]

describe('SelectComponent', () => {

  it('should handle select option behaviour', async () => {
    await render(SelectComponent, {
      inputs: {options: OPTIONS}
    })
    const user = userEvent.setup();
    const select = screen.getByLabelText('Products');

    await user.selectOptions(select, 'p2');

    expect(select).toHaveDisplayValue('option 2');
  });

});
