import '@testing-library/jest-dom'
import { InputComponent } from './input.component';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

describe('InputComponent', () => {

  it('should render input label', async () => {
    await render(InputComponent);

    expect(screen.getByRole('textbox', {name: 'Name'})).toBeVisible();
  });

  it('should render the input value', async () => {
    await render(InputComponent);

    const user = userEvent.setup();

    const nameControl = screen.getByRole('textbox', {name: /name/i });

    await user.type(nameControl, 'Joey');

    expect(screen.getByText('My name is Joey')).toBeVisible();
  });
});
