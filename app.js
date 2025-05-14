const { config } = require('dotenv');
config();
const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');
const app = express();
const flash = require('connect-flash');
const session = require('express-session');
const authMiddleware = require('./src/middleware/authMiddleware')
const validateMiddleware = require('./src/middleware/validateMiddleware')

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
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60,
    httpOnly: true,
    secure: false
   }
}));
app.use(flash());
// Variables injectées dans les templates ejs
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success');
  res.locals.error_msg = req.flash('error');
  res.locals.user = (req?.session && req.session.user) ?? null;
  next();
});

//  VIEW ENGINE 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//  CONTROLLERS 
const homeController = require('./src/controllers/listPost');
const listPostController = require('./src/controllers/listPost');
const newPostController = require('./src/controllers/newPost');
const getPostController = require('./src/controllers/getPost');
const storePostController = require('./src/controllers/storePost');
const contactController = require('./src/controllers/contact');
const aboutController = require('./src/controllers/about');
const AuthController = require('./src/controllers/authController');
const { get } = require('http');

// ROUTES 
app.get('/', homeController);
app.get('/list', listPostController);         
app.get('/post/new', authMiddleware, newPostController);      
app.get('/post/:id', getPostController);      
app.post('/posts/store', validateMiddleware, storePostController); 
app.get('/contact', contactController);
app.get('/about', aboutController);
// AUTH ROUTES
app.get('/register', AuthController.register)
app.post('/auth/register', AuthController.storeUser)
app.get('/login', AuthController.login)
app.post('/auth/login', AuthController.signInUser)
app.get('/auth/logout', AuthController.logoutUser)

app.use((req, res) => {
  res.status(404).render('notfound');
});

//  SERVEUR 
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
