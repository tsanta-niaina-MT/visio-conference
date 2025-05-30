import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  standalone: true,
  templateUrl: './chat.component.html',
})
export class ChatComponent implements OnInit {

  currentUser = 'Utilisateur'; // Exemple, tu peux récupérer ça depuis ton service d'auth

  constructor(private router: Router) {}

  ngOnInit(): void {
    const roomName = 'MaSalleVisioTest123';

    // Au lieu de rediriger direct, on intègre Jitsi dans le container
    this.startJitsiCall(roomName);
  }

  startJitsiCall(roomName: string) {
    const domain = 'meet.jit.si';
    const options = {
      roomName,
      parentNode: document.getElementById('jitsi-container'),
      width: '100%',
      height: 600,
    };

    // Charger l'API Jitsi via script si ce n'est pas déjà fait
    if ((window as any).JitsiMeetExternalAPI) {
      const api = new (window as any).JitsiMeetExternalAPI(domain, options);
      // Tu peux stocker api pour contrôler la réunion plus tard (ex: api.execute('hangup'))
      this.jitsiApi = api;
    } else {
      // Charger le script Jitsi puis initialiser
      const script = document.createElement('script');
      script.src = 'https://meet.jit.si/external_api.js';
      script.onload = () => {
        const api = new (window as any).JitsiMeetExternalAPI(domain, options);
        this.jitsiApi = api;
      };
      document.body.appendChild(script);
    }
  }

  jitsiApi: any;

  endCall() {
    // Déconnecter la réunion Jitsi si possible
    if (this.jitsiApi) {
      this.jitsiApi.execute('hangup');
      this.jitsiApi.dispose();
    }
    // Puis rediriger vers login
    this.router.navigate(['/login']);
  }

  logout() {
    // Ici tu peux appeler un service d'auth pour nettoyer le token/session
    // Par exemple : this.authService.logout();

    // Puis rediriger vers la page login
    this.router.navigate(['/login']);
  }
}
