const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const comicsRoutes= require('./routes/comics');
const authRoutes= require('./routes/auth');
const categoriesRoutes = require('./routes/category');

const mongoose = require('mongoose');
const multer = require('multer');

const app = express();

const fileStorage  = multer.diskStorage({
  destination: (res, file, cb) => {
    cb(null,'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.minetype === 'image/png' ||
    file.minetype === 'image/jpg' ||
    file.minetype === 'image/jpeg'
  ){
    cb(null, true);
  }else {
    cb(null, false);
  }

};

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
app.use(multer({storage:fileStorage, filefilter: fileFilter}).single('file'));
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
app.use('/comics-manager',comicsRoutes);
app.use('/comics-manager',authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(
    'mongodb+srv://lunack63:2Sd0TCqoOEhkjrb7@cluster0-ytacm.mongodb.net/REST_API-comicsManager?retryWrites=true&w=majority',
  )
  .then(result => {
    app.listen(8080);
  })
  .catch(err => console.log(err));