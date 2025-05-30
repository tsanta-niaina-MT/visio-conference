const express = require('express');
const dotenv = require('dotenv');
const db = require('./config/db');
const cors = require('cors');
const AuthRoutes = require('./routes/authRoutes'); // ← AJOUT ICI

// Charger les variables d'environnement depuis .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));

// Middleware pour parser le JSON
app.use(express.json());

// Routes API pour l'authentification
app.use('/api/auth', AuthRoutes);

// Connexion à la base de données
db.authenticate()
  .then(() => {
    console.log('Connexion à PostgreSQL réussie !');
    return db.sync(); // Créera les tables si elles n'existent pas
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erreur de connexion à la base de données :', err);
  });
