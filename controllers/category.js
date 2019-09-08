const Category = require('../models/category');

/*
exports.getCategories = (req, res, next) => {
    res.status(200).json({
      posts: 
      [{_id:'1',
       title: 'First category',
       description: 'This is the first category!'
     }]
    });
  };*/

  exports.getCategories = (req, res, next) => {
  
    Category.find()
      .then(categories => {
        res
          .status(200)
          .json({
           
            categories:categories
          });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  };
  
  exports.createCategory = (req, res, next) => {
    const title = req.body.title;
    const description = req.body.description;
    console.log(req.body);
    const category = new Category({
        title: title,
        description: description
     });
     category
     .save()
     .then(result => {
         console.log(res);
        res.status(201).json({
            message: 'Category created successfully!',
            category: result
          });    
     }).catch(err=> {
        console.log(err);
     });
    // Create post in db
   
  };
  