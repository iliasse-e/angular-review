import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";


// Validateurs synchrones

export const nameValidator = (): ValidatorFn => {
  return (control: AbstractControl<string>): {[key: string]: any} | null => {
      const forbidden = control.value?.toLowerCase().startsWith('du');
    return forbidden ? {'forbiddenName': {value: control.value}} : null;
  };
}

export const forbidEmailValidator = (content: string): ValidatorFn => {
    return (control: AbstractControl<string>): {[key: string]: any} | null => {
        const forbidden = control.value?.toLowerCase().includes(content.toLowerCase());
        return forbidden ? {'forbiddenMail': {value: control.value}} : null;
    };
}

// Validateur pour formulaire (compare deux controls)
export const passwordMatchValidator: ValidatorFn = (group: AbstractControl<FormGroup>): ValidationErrors | null => {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');
  
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
  
    return null;
  };


// Validateurs asynchrones

export async function emailExistsValidatorAsync(control: AbstractControl):  Promise<ValidationErrors | null> {
  const exists = await randomAPI(control.value);
  return exists ? { emailExists: true } : null;
}

// Service HTTP
const randomAPI = async (arg: any) => {
  return new Promise((resolve, reject) => {
    const isTrue = (Math.random() * 10) > 5;
    setTimeout(() => resolve(isTrue), 1000)
  })
}