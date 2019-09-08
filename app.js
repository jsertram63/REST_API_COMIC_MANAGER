const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const comicsRoutes= require('./routes/comics');
const categoriesRoutes = require('./routes/category');
const mongoose = require('mongoose');

const app = express();

 //app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
app.use('/images',express.static(path.join(__dirname,'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
  
app.use('/comics-manager', categoriesRoutes);
app.use('/comics-manager',comicsRoutes)

mongoose
  .connect(
    'mongodb+srv://username:password@cluster0-ytacm.mongodb.net/REST_API-comicsManager?retryWrites=true&w=majority',
  )
  .then(result => {
    app.listen(8080);
  })
  .catch(err => console.log(err));