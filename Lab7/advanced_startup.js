const dbConnection = require("./mongoConnection");
const mongoCollections = require("./mongoCollections");
var recipe = mongoCollections.recipes;
var uuid = require('uuid');


async function runSetup(){
        const recipeCollection = await recipe();
        try {
            // We can recover from this; if it can't drop the collection, it's because
            await recipeCollection.drop();
          } catch (e) {
            // the collection does not exist yet!
          }
        var uniqueID_recipe = uuid();
        var uniqueID_comment = uuid();
        const makeDoc = function(title) {
            return {
                _id: uuid(),
                title: title,
                ingredients:[],
                steps: [],
                comments: []
            };
          };

        const addIngredients = function(recipe,ingredientName,ingredientAmount) {
            var newIngredient = {
                name: ingredientName,
                amount: ingredientAmount
            };
            recipe.ingredients.push(newIngredient);
        
          };
        var addComment = function(recipe, posterName, comment) {
            var newComment = {
                commentID: uuid(),
                poster: posterName,
                comment: comment
            };

            recipe.comments.push(newComment);
        };
        var listOfRecipes = [];
          
        var friedEggs = makeDoc("Fried Eggs");
        addIngredients(friedEggs, "Eggs", "10");
        addIngredients(friedEggs, "Olive Oil", "2 tbs");
        friedEggs.steps.push( "First, heat a non-stick pan on medium-high until hot",
                      "Add the oil to the pan and allow oil to warm; it is ready the oil immediately sizzles upon contact with a drop of water.",
                      "Crack the egg and place the egg and yolk in a small prep bowl; do not crack the yolk!",
                      "Gently pour the egg from the bowl onto the oil",    
                      "Wait for egg white to turn bubbly and completely opaque (approx 2 min)",
                      "Using a spatula, flip the egg onto its uncooked side until it is completely cooked (approx 2 min)",
                      "Remove from oil and plate",
                      "Repeat for second egg");
        addComment(friedEggs,"Gordan Ramsay","These eggs are delicious!");
                      
        
        var noodles = makeDoc("Noodles");
        addIngredients(noodles, "Rice Noodles", "500 gms");
        addIngredients(noodles, "Water", "500 ml");
        addIngredients(noodles, "Salt", "2 tbsp");

        noodles.steps.push(
                        "Boil water in a pan",
                        "Once the water starts boiling add salt",
                        "Add the Rice Noodles to the pan and cook it for thirty minutes.",
                        "Once done, serve on a plate."
        );
        addComment(noodles, "Anthony Bourdain","The noodles turned out to be very sticky!");
        addComment(noodles, "Mario Batelli","I loved it!");
        addComment(noodles, "Bobby Flay","Will love to try this out.");
          
        var sandwich = makeDoc("Sandwich");
        addIngredients(sandwich, "Bread", "2 slices");
        addIngredients(sandwich, "Butter", "1 spoon");
        addIngredients(sandwich, "Jam", "1 spoon");

        sandwich.steps.push(
                        "Cut the edges off the bread.",
                        "Toast the bread slices.",
                        "Apply butter on the bread slices and then apply jam.",
                        "Once done, serve on a plate."
        );
        addComment(sandwich, "Anthony Bourdain","How long am I supposed to toast the bread?");
        addComment(sandwich, "Mario Batelli","Turned out ok. Woud'nt recommend.");
        addComment(sandwich, "Bobby Flay","The best toast that I have had ever!");
        listOfRecipes.push(friedEggs, noodles, sandwich); 
        //listOfRecipes.push(friedEggs);
        await recipeCollection.insertMany(listOfRecipes);
        
        return await recipeCollection.find().toArray();
}

exports = module.exports = runSetup;
