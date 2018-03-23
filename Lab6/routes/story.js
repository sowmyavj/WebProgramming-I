const express = require('express');
const router = express.Router();

// story page route (http://localhost:3000/story)
router.get('/', function(req, res) {
    res.json({
        "storyTitle": "That time I almost got mugged",
        "story": "A bunch of friends and me had gone for a music concert in New York. It was very late in the night by the time the concert got over. We were heading back home from the concert.\
While we were moving through a dark alley, a guy approached me and asked me to handover all the cash that i had on me. I was so dumbstruck that I didnt even scream for help. Luckily my friends shoted out for help and the guy got scared and ran off.\
I have heard a bunch of stories of how people get mugged in New york city all the time. But I never thought that I would ever encounter one myself. It was pretty scary."
      }); 
});

module.exports = router;