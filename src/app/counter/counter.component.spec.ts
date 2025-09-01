import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/angular';
import { CounterComponent } from './counter.component';
import userEvent from '@testing-library/user-event';

describe('CounterComponent', () => {

  it('should create', async () => {
    await render(CounterComponent);

    const valueControl = screen.getByTestId('value');

    expect(valueControl).toHaveTextContent('0');
  });

    it('should increment', async () => {
    await render(CounterComponent);

    const user = userEvent.setup();

    const incrementBtn = screen.getByRole('button', { name: /Increment/i });
    const decrementBtn = screen.getByRole('button', { name: /Decrement/i });
    const valueControl = screen.getByTestId('value');

    await user.click(incrementBtn);
    await user.click(incrementBtn);

    expect(valueControl).toHaveTextContent('2');

    await user.click(decrementBtn);

    expect(valueControl).toHaveTextContent('1');
  });
});
