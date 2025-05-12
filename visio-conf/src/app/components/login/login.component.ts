import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/AuthService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  async login(emailInput: HTMLInputElement, passwordInput: HTMLInputElement) {
    const email = emailInput.value;
    const password = passwordInput.value;

    try {
      const result = await this.authService.login(email, password);
      console.log('Résultat du login:', result);
      
      // Sauvegarde du token
      localStorage.setItem('token', result.token);
      alert("Connexion réussie !");
      this.router.navigate(['/chat']); // Ou une autre route après connexion
    } catch (err) {
      alert("Identifiants incorrects ou erreur serveur.");
    }
  }
}
