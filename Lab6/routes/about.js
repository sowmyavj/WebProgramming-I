const express = require('express');
const router = express.Router();


// about page route (http://localhost:3000/about)
router.get('/', function(req, res) {
    res.json({
        "name": "Sowmya Vijayakumar",
        "biography": "I am currently pursuing my Masters in Computer Science at Stevens.\
I do love technology but I also have an other side to me. I am obsessed about watching reality tv shows",
        "favoriteShows": ["Game of thrones", "Seinfeld", "Breaking Bad"],
        "hobbies": ["Watching lame reality tv shows", "Shopping", "Reading about GOT trivia"]
      }); 
}); 

module.exports = router;