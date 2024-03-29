//app setup
const express = require('express');
const app = express();

//conncting to database
const connectDB = require("./config/db");
connectDB();

//Middleware
const isAuth = require("./middleware/isAusth");
//CORS Middelware
const cors = require('cors')
const corsoption = {
    "origin": true,
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    "credentials": true,
  };
app.use(cors(corsoption));
app.use(express.json());

// Sessions Middelware
const session =require ("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);
const store = new MongoDBSession({
  uri : process.env.MONGO_URI, 
  collection : "mySessions",
})

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie:{}
  })
);

//Route Middleware
const authRoute = require('./routes/auth');
const watchList = require('./routes/watchlist')
const prediction = require('./routes/prediction')
//Routes
app.use('/api/user',authRoute);
app.use('/api/watchlist',isAuth,watchList);
app.use('/api/prediction',prediction);
app.get('/',isAuth,(req,res) => {
  res.send('session');
});

app.listen(process.env.PORT || 3000, ()=> console.log('Server Up and running'));
