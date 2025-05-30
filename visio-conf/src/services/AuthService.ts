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
      return response.data;  
    } catch (error) {
      console.error('Erreur register :', error);
      throw error;
    }
  }
  // Méthode pour se déconnecter
  logout() {
    localStorage.removeItem('token');
  }

  // Vérifier si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
    }

getCurrentUser(): any {
  if (typeof window === 'undefined' || !window.localStorage) {
    // Pas dans un environnement navigateur, on retourne null
    return null;
  }

  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    // Décoder le token JWT pour obtenir les informations utilisateur
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch (e) {
    console.error('Erreur lors du décodage du token :', e);
    return null;
  }
}
}
