const { config } = require('dotenv');
config();
const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');
const app = express();
const flash = require('connect-flash');
const session = require('express-session');


//  DATABASE CONNECTION 
require('./config/db'); 

//  MIDDLEWARES 
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(session({
  secret: 'tonsecret',
  resave: false,
  saveUninitialized: true
}));
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success');
  res.locals.error_msg = req.flash('error');
  next();
});

//  VIEW ENGINE 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//  MIDDLEWARE validation
const validateMiddleware = (req, res, next) => {
    if (!req.files || !req.files.image || !req.body.title || !req.body.body || !req.body.username) {
        return res.redirect('/post/new');
    }
    next();
};

//  CONTROLLERS 
const homeController = require('./src/controllers/listPost');
const listPostController = require('./src/controllers/listPost');
const newPostController = require('./src/controllers/newPost');
const getPostController = require('./src/controllers/getPost');
const storePostController = require('./src/controllers/storePost');
const contactController = require('./src/controllers/contact');
const aboutController = require('./src/controllers/about');

// ROUTES 
app.get('/', homeController);
app.get('/list', listPostController);         
app.get('/post/new', newPostController);      
app.get('/post/:id', getPostController);      
app.post('/posts/store', validateMiddleware, storePostController); 
app.get('/contact', contactController);
app.get('/about', aboutController);

app.use((req, res) => {
  res.status(404).render('notfound');
});

//  SERVEUR 
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
