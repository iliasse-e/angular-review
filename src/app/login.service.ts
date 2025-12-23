import {Injectable} from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  async login(email: string, password: string) {
    // Doit être :  "email": "john@mail.com", "password": "changeme"
    const credentials = { email, password };
    return await fetch('https://api.escuelajs.co/api/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    })
  }
}
