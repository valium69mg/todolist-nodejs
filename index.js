const express = require("express");
const auth = require('./routes/authRoutes.js');
const user = require('./routes/userRoutes.js');
const jwtAuth = require('./middleware/cookieJwtAuth.js');
var cookieParser = require('cookie-parser')
const userController = require('./controllers/userController.js');

// .env
require('dotenv').config();

const app = express();
const port = 3000;

// public folder
app.use(express.static(__dirname + '/public'));

// cookie parser
app.use(cookieParser());

// set the view engine to ejs
app.set('view engine', 'ejs');

// url encoded
app.use(express.urlencoded({ extended: true }));

// auth routes
app.use('/auth',auth);

//user routes
app.use('/user',user);

// routes
app.get('/',jwtAuth.validateJwt,(req, res) => {
  const data = {auth:true};
  res.render('home.ejs',{data});
});


// clear session
app.get('/clearCookies', (req,res) => {
  res.clearCookie("token").json({action: "Session erased"});
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

