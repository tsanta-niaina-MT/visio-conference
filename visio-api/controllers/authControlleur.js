const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: 'Email déjà utilisé.' });
    }

    const newUser = await User.create({ email, password });
    res.status(201).json({
      message: 'Utilisateur inscrit avec succès',
      user: { id: newUser.id, email: newUser.email }
    });
  } catch (err) {
    res.status(500).json({
      message: 'Erreur lors de l\'inscription',
      error: err.message
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Identifiants incorrects.' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Connexion réussie', token });
  } catch (err) {
    res.status(500).json({
      message: 'Erreur lors de la connexion',
      error: err.message
    });
  }
};
