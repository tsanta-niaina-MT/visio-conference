const express = require('express');
const dotenv = require('dotenv');
const db = require('./config/db');
const cors = require('cors');


// Routes
const AuthRoutes = require('./routes/authRoutes'); // Import des routes d'authentification

// Charger les variables d'environnement depuis .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:4200', // ← met l’URL de ton appli Angular
  credentials: true
}));

// Middleware pour parser le JSON
app.use(express.json());

// Routes API pour l'authentification
app.use('/api/auth', AuthRoutes); // Routes d'inscription / connexion

// Connexion à la base de données
db.authenticate()
  .then(() => {
    console.log('Connexion à PostgreSQL réussie !');

    // Créera les tables si elles n'existent pas
    return db.sync();
  })
  .then(() => {
    // Démarrer le serveur
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erreur de connexion à la base de données :', err);
  });
