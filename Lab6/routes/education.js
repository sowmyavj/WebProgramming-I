const express = require('express');
const router = express.Router();

// education page route (http://localhost:3000/education)
router.get('/', function(req, res) {
    res.json([
        {
          "schoolName": "Stevens Institute of technology",
          "degree": "Master of Computer science",
          "favoriteClass": "Knowledge discovery and Data Mining",
          "favoriteMemory": "I really enjoyed the Dandiya night conducted in Stevens recently. I had loads of fun dancing."
        },
        {
          "schoolName": "Father Agnels Institute of technology",
          "degree": "Bachelor of Computer science ",
          "favoriteClass": "Ananlysis of algorithms",
          "favoriteMemory": "The most memorable event from the time I was here is the when we went on an industrial visit to bangalore."
        },
        {
            "schoolName": "Vani Vidyalaya",
            "degree": "Higher secondary school certificate and Secondary school certificate",
            "favoriteClass": "Geometry  ",
            "favoriteMemory": "I have good memories about the time our class went on a trip to an amusement park called Essel world in Mumbai."
          }
    ]); 
});

module.exports = router;