//const Category = require('../models/Category');
const Comic = require('../models/comic');
const Category = require('../models/category');

exports.getComics = (req, res, next) => {
  Comic.find()
  .then(comics => {
    console.log(comics);
    res.status(200) .json(comics);
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
  };
  
  exports.createComic = (req, res, next) => {
    const title = req.body.title;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const idCat = req.body.categoryId
    var categComics;
    console.log("CREATION COMICS");
    console.log(req.body);

    Category.findById(idCat).then(cat => {
     
      console.log("CATEGORY");
     console.log(cat);
      console.log("CATEGORY");
      const comic = new Comic({
        title: title,
        description: description,
        imageUrl: imageUrl,
        category:{
          categoryId:cat,
          name:cat.title
        } 
      });
      console.log("COMIC");
      console.log(comic);
      comic.save().then(result => {
        res.status(201).json({
          message: 'Category created successfully!',
          comic: result
        });    
      })
      .catch(err => {
        console.log(err);
      })
    })
    // Create post in db
    res.status(201).json({
      message: 'Comics created successfully!',
    comics: { id: 
        new Date().toISOString()
        , title: title
        , description: description
        , imageUrl: imageUrl,

    }
    });

  }

  
  exports.getComic = (req, res,next) => {
    const comicId = req.params.comicId;
    Comic.findById(comicId)
    .then(comic => {
      if (!comic){
        // error 
      }
      res.status(200).json({comic:comic});
    })
    .catch(err => {
      console.log(err);
    });


  }  