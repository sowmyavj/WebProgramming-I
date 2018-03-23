const express = require('express');
const router = express.Router();

router.get("/static", (req, res) => {
    res.render("palindrome/static", {});
});

router.get("/server", (req, res) => {
    res.render("palindrome/server", {});
});


module.exports = router;