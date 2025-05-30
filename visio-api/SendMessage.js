const axios = require('axios');

// Ta REST API Key CometChat (gardée secrète dans le backend)
const API_KEY = '2af948fdbef64e6a86dc779bc2136545b439d5e7';

// L'URL de base pour ton application CometChat
const BASE_URL = 'https://2727741f91e140ef.api-in.cometchat.io/v3';

// ID du groupe où tu veux envoyer le message
const GROUP_ID = 'cometchat-guid-1';

// ID de l'utilisateur qui envoie le message
const SENDER_ID = 'mon_id_utilisateur';

// Message à envoyer
const MESSAGE_TEXT = 'Salut tout le monde dans Hiking Group !';

async function sendGroupMessage() {
  try {
    const response = await axios.post(`${BASE_URL}/messages`, {
      category: "message",
      type: "text",
      data: { text: MESSAGE_TEXT },
      receiver: GROUP_ID,
      receiverType: "group",
      sender: SENDER_ID
    }, {
      headers: {
        'accept': 'application/json',
        'apikey': API_KEY,
        'content-type': 'application/json'
      }
    });

    console.log('Message envoyé:', response.data);
  } catch (error) {
    if (error.response) {
      console.error('Erreur API:', error.response.data);
    } else {
      console.error('Erreur:', error.message);
    }
  }
}

sendGroupMessage();
