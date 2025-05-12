import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000/api/auth';  // Base URL de l'API

  constructor() {}

  // Méthode pour se connecter
  async login(email: string, password: string): Promise<any> {
    try {
      const response = await axios.post(`${this.baseUrl}/login`, { email, password });
      return response.data;
    } catch (error) {
      console.error('Erreur login :', error);
      throw error;
    }
  }

  // Méthode pour s'inscrire
  async register(data: { email: string, password: string }): Promise<any> {
    try {
      const response = await axios.post(`${this.baseUrl}/register`, data);
      return response.data;  // Retourner la réponse de l'API (confirmation)
    } catch (error) {
      console.error('Erreur register :', error);
      throw error;
    }
  }

  // Méthode pour se déconnecter
  logout() {
    // Par exemple, supprimer le token du localStorage
    localStorage.removeItem('token');
  }

  // Vérifier si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
