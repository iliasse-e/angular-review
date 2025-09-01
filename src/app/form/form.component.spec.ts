import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { FormComponent } from './form.component';

describe('FormComponent', () => {


  it('should fill form', async () => {
    await render (FormComponent);

    const user = userEvent.setup();

    const nameControl = screen.getByRole('textbox', { name: /name/i });
    const emailControl = screen.getByRole('textbox', { name: /email/i });
    const ageControl = screen.getByRole('spinbutton', { name: /age/i });

    const form = screen.getByRole('form');

    await user.type(nameControl, 'Theo');
    await user.type(emailControl, 'theo@gmail.com');
    await user.type(ageControl, '34');

    expect(ageControl).toHaveValue(34);

    expect(form).toHaveFormValues({
      name: 'Theo',
      email: 'theo@gmail.com',
      age: 34
    })
  });
});
