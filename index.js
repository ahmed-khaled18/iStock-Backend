//app setup
const express = require('express');
const app = express();

//conncting to database
const connectDB = require("./config/db");
connectDB();

//Middleware
//CORS Middelware
const cors = require('cors')
const corsoption = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204,
    //neww trial
    "Access-Control-Allow-Credentials": true,
    // credentials: true,
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
  })
);

//Route Middleware
const authRoute = require('./routes/auth');
const { collection } = require('./model/User');
app.use('/api/user',authRoute);

app.get('/',(req,res) => {
  res.send('session');
});

app.listen(process.env.PORT || 3000, ()=> console.log('Server Up and running'));
