const express = require('express');
const mongoose = require('mongoose');
const app = express();
const BlogPost = require('./models/BlogPost');
const ContactPost = require('./models/ContactPost');

mongoose.connect('mongodb://127.0.0.1:27017/my_blog', { useNewUrlParser: true, useUnifiedTopology: true });

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/', async (req, res) => {
    const posts = await BlogPost.find().sort({ createdAt: -1 });
  res.render('index', { posts });
});

app.get('/post/:id', async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).send("Article introuvable.");
    res.render('post', { post });
  } catch (err) {
    res.status(500).send("Erreur lors du chargement de l'article.");
  }
});

app.get('/about', (req, res) => {
    res.render('about'); // fichier views/index.ejs
});

app.get('/contact', (req, res) => {
    res.render('contact'); // fichier views/index.ejs
});

app.get('/posts/create', (req, res) => {
  res.render('create'); // views/create.ejs
});


app.get('/post', (req, res) => {
    res.render('post'); // fichier views/index.ejs
});

app.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Création du message de contact
    await ContactPost.create({ name, email, phone, message });

    res.send('Votre message a été enregistré avec succès !');
  } catch (err) {
    console.error('Erreur lors de l\'enregistrement du message :', err);
    res.status(500).send('Une erreur est survenue.');
  }
});

app.post('/posts/store', async (req, res) => {
  try {
    const { title, body, username } = req.body;
    await BlogPost.create({ title, body, username });
    res.redirect('/'); // ou une page de confirmation
  } catch (err) {
    res.status(500).send("Erreur lors de la création de l'article.");
  }
});

app.listen(3000, () => {
    console.log("Serveur démarré sur http://localhost:3000");
});