import { Component, OnInit, OnDestroy } from '@angular/core';
import { CometChat } from '@cometchat-pro/chat';

@Component({
  selector: 'app-com-chat',
  templateUrl: './com-chat.component.html',
  styleUrls: ['./com-chat.component.css']
})
export class ComChatComponent implements OnInit, OnDestroy {

  APP_ID = 'TON_APP_ID';        // Remplace par ton App ID CometChat
  USER_ID = 'USER_ID';          // Remplace par ton User ID
  AUTH_KEY = '2af948fdbef64e6a86dc779bc2136545b439d5e7';         // Remplace par ta clé API

  GROUP_ID = 'cometchat-guid-1';    // Remplace par l'ID de ton groupe CometChat
  listenerID = 'CHAT_LISTENER';

  messages: string[] = [];

  ngOnInit(): void {
    const appSettings = new CometChat.AppSettingsBuilder()
      .subscribePresenceForAllUsers()
      .setRegion('IN') // Remplace par la région de ton app ('IN', 'US', 'EU', etc.)
      .build();

    CometChat.init(this.APP_ID, appSettings).then(() => {
      console.log('CometChat initialisé');

      CometChat.login(this.USER_ID, this.AUTH_KEY).then(user => {
        console.log('Connecté en tant que :', user);

        CometChat.addMessageListener(
          this.listenerID,
          new CometChat.MessageListener({
            onTextMessageReceived: (message: CometChat.BaseMessage) => {
              // Utiliser les getters publics car propriétés sont protégées
              if (
                message.getReceiverType() === 'group' &&
                message.getReceiver() &&
                typeof (message.getReceiver() as any).getGuid === 'function' &&
                (message.getReceiver() as any).getGuid() === this.GROUP_ID
              ) {
                const sender = message.getSender();
                // Utilise l'UID comme identifiant (email ou userId)
                const senderId = sender ? sender.getUid() : 'Anonyme';
                // text n'est pas dans BaseMessage, donc cast en any pour y accéder
                const text = (message as any).text ?? '';
                this.messages.push(`${senderId}: ${text}`);
              }
            }
          })
        );

      }).catch(error => {
        console.error('Erreur de login CometChat:', error);
      });

    }).catch(error => {
      console.error('Erreur d\'initialisation CometChat:', error);
    });
  }

  ngOnDestroy(): void {
    CometChat.removeMessageListener(this.listenerID);
  }
}
