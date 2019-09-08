# REST_API_COMIC_MANAGER
REST API for managing comics books
 POST:
- /add-book : add comics books
- /add-categorie : add category of saga

GET:
- /Books : get all books
- /categories : get all categories
- /Books/:id : get book with id

Install after git clone
- npm install 
- configure login:pwd in app.js for mongoDB :

.connect(
    'mongodb+srv://username:password@cluster0-ytacm.mongodb.net/REST_API-comicsManager?retryWrites=true&w=majority',
  )

  - npm run dev 