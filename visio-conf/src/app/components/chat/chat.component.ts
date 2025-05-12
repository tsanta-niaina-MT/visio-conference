import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  currentUser = 'Moi';  // Changez-le avec le nom de l'utilisateur actuel
  currentMessage = '';   // Message en cours
  messages = [
    { user: 'Utilisateur 1', text: 'Bonjour tout le monde!' },
    { user: 'Utilisateur 2', text: 'Salut!' },
  ];

  sendMessage() {
    if (this.currentMessage.trim()) {
      this.messages.push({
        user: this.currentUser,
        text: this.currentMessage
      });
      this.currentMessage = '';  // Réinitialise l'input après l'envoi
    }
  }
}
