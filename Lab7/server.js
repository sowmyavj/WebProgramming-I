// We first require our express package
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var recipeData = require('./data.js');
//const recipeData = require("./advanced_mongo.js");
// We create our express isntance:
var app = express();

app.use(cookieParser());
app.use(bodyParser.json()); // for parsing application/json

// Middlewares:

// 1. One which will count the number of requests made to your website
var currentNumberOfRequests = 0;
app.use(function(request, response, next) {
    currentNumberOfRequests++;
    console.log("There have now been " + currentNumberOfRequests + " requests made to the website.");
    next();
});

// 2. One which will count the number of requests that have been made to the current path
var pathsAccessed = {};
app.use(function(request, response, next) {
    if (!pathsAccessed[request.path]) pathsAccessed[request.path] = 0;

    pathsAccessed[request.path]++;

    console.log("There have now been " + pathsAccessed[request.path] + " requests made to " + request.path);
    next();
});

// 3. One which will log the last time the user has made a request, and store it in a cookie.
app.use(function(request, response, next) {
    // If we had a user system, we could check to see if we could access /admin

    console.log("The request has all the following cookies:");
    console.log(request.cookies);
    if (request.cookies.lastAccessed) {
        console.log("This user last accessed the site at " + request.cookies.lastAccessed);
    } else {
        console.log("This user has never accessed the site before");
    }
    
    // THIS SECTION WILL EXPIRE THE COOKIE EVERY 5th request
    if (currentNumberOfRequests % 5 === 0) {
        console.log("now clearing the cookie");
        
        var anHourAgo = new Date();
        anHourAgo.setHours(anHourAgo.getHours() -1);
        
        // invalidate, then clear so that lastAccessed no longer shows up on the
        // cookie object
        response.cookie("lastAccessed", "", { expires: expiresAt });
        response.clearCookie("lastAccessed");
        next();
        return;
    }

    var now = new Date();
    var expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);

    // Providing a third parameter is optional, but allows you to set options for the cookies.
    // see: http://expressjs.com/en/api.html#res.cookie
    // for details on what you can do!
    response.cookie("lastAccessed", now.toString(), { expires: expiresAt });
    next();
});

// 4. One which will deny all users access to the /admin path.
app.use("/admin", function(request, response, next) {
    // If we had a user system, we could check to see if we could access /admin

    console.log("Someone is trying to get access to /admin! We're stopping them!");
    response.status(500).send("You cannot access /admin");
});


// Get a single recipe
app.get("/recipe/:id", function(request, response) {
    recipeData.getRecipe(request.params.id).then(function(recipe) {
        response.json(recipe);
    }, function(errorMessage) {
        response.status(500).json({ error: errorMessage });
    });
}); 

// Get all the recipes
app.get("/recipes", function(request, response) {
    recipeData.getAllRecipes().then(function(recipeList) {
        response.json(recipeList);
    });
}); 

//Get comments for a recipe id
app.get("/comments/recipe/:id", function(request, response) {
    recipeData.getComments(request.params.id).then(function(commentsList) {
        response.json(commentsList);
    }, function(errorMessage) {
        response.status(500).json({ error: errorMessage });
    });
});
//Get comments for a comment id
app.get("/comments/:commentId", function(request, response) {
    recipeData.getCommentsbyID(request.params.commentId).then(function(commentsList) {
        response.json(commentsList);
    }, function(errorMessage) {
        response.status(500).json({ error: errorMessage });
    });
});
// Create a recipe
app.post("/recipes", function(request, response) {
    recipeData.createRecipe(request.body.title,request.body.ingredients,request.body.steps,request.body.comments).then(function(recipe) {
        response.json(recipe);
    }, function(errorMessage) {
        response.status(500).json({ error: errorMessage });
    });
});

// Update recipe title for a recipe 
app.put("/recipes/:id", function(request, response) {
    recipeData.updateRecipe(request.params.id, request.body.title,request.body.ingredients,request.body.steps).then(function(recipe) {
        response.json(recipe);
    }, function(errorMessage) {
        response.status(500).json({ error: errorMessage });
    });
});
/*
app.put("/api/recipes/:id", function(request, response) {
    recipeData.updateComment(request.params.id, request.body.commentID,request.body.comment).then(function(recipe) {
        response.json(recipe);
    }, function(errorMessage) {
        response.status(500).json({ error: errorMessage });
    });
});

app.put("/recipes/:id", function(request, response) {
    recipeData.updateIngredients(request.params.id, request.body.name, request.body.amount).then(function(recipe) {
        response.json(recipe);
    }, function(errorMessage) {
        response.status(500).json({ error: errorMessage });
    });
});
*/
app.delete("/recipes/:id", function(request, response) {
    recipeData.deleteRecipe(request.params.id).then(function(status) {
        response.json({ success: status });
    }, function(errorMessage) {
        response.status(500).json({ error: errorMessage });
    });
});
//Post a new comment
app.post("/comments/:recipeId", function(request, response){
    recipeData.addAComment(request.params.recipeId,request.body.poster, request.body.comment).then(function(comments){
     response.json(comments); 
    }, function(err){
      response.status(500).json({error: err});
    });
  });
  //Update a comment using comment id
app.put("/comments/:recipeId/:commentId",  function(request, response){
    recipeData.updateAComment(request.params.recipeId, request.params.commentId, request.body.comment).then(function(updateComments){
      response.json(updateComments);
    },  function(err){
      response.status(500).json({error:err});
    });
  });
//Delete a comment using comment id
app.delete("/comments/:id", function(request, response){
    recipeData.deleteComment(request.params.id).then(function(comment){
      response.json({ success: status });
    }, function(err){
      response.status(500).json({error:err});
    });
  });
app.use("/", (req, res) => {
    res.status(404).json({error: "Not found. Please use http://localhost:3000/recipes"});
});
app.use("*", (req, res) => {
    res.status(404).json({error: "Not found."});
});

app.get("/admin*", function(request, response) {
    response.status(200).send("Oh my! You're in the admin panel!");
})

// We can now navigate to localhost:3000
app.listen(3000, function() {
    console.log('Your server is now listening on port 3000! Navigate to http://localhost:3000/recipes to access it');
});