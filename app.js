
const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');
const app = express();

// ======== DATABASE CONNECTION =========
require('./config/db'); 

// ======== MIDDLEWARES =========
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());

// ======== VIEW ENGINE =========
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ======== VALIDATION MIDDLEWARE =========
const validateMiddleware = (req, res, next) => {
    if (!req.files || !req.files.image || !req.body.title || !req.body.body || !req.body.username) {
        return res.redirect('/post/new');
    }
    next();
};

// ======== CONTROLLERS =========
const homeController = require('./src/controllers/listPost');
const listPostController = require('./src/controllers/listPost');
const newPostController = require('./src/controllers/newPost');
const getPostController = require('./src/controllers/getPost');
const storePostController = require('./src/controllers/storePost');

// ======== ROUTES =========
app.get('/', homeController);
app.get('/list', listPostController);         
app.get('/post/new', newPostController);      
app.get('/post/:id', getPostController);      
app.post('/posts/store', validateMiddleware, storePostController); 


// ======== SERVEUR =========
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
