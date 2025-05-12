import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/AuthService';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private router: Router, private authService: AuthService) {}

  async register(emailInput: HTMLInputElement, passwordInput: HTMLInputElement, confirmPasswordInput: HTMLInputElement) {
    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
   

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      await this.authService.register({
        email,
        password,
      });
      alert("Compte créé avec succès !");
      this.router.navigate(['/login']);
    } catch {
      alert("Échec de l'inscription. Réessayez.");
    }
  }
}
