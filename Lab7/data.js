var runStartup = require("./advanced_startup"),
uuid = require('uuid');

const mongoCollections = require("./mongoCollections");
const recipe = mongoCollections.recipes;

/* runStartup().then(function(allRecipes) {
console.log("After the setup has been complete, we have the following recipes:");
console.log(allRecipes);
}); */

async function main() {
    const allRecipes = await runStartup();
    console.log(
      "After the advanced document setup has been complete, we have the following recipes:"
    );
    console.log(allRecipes);
}
main()

module.exports = {
    async getAllRecipes(){
		const recipeCollection = await recipe();
        const recipes = await recipeCollection.find({},{id:1,title:1}).toArray();
		return recipes;
    },
    async getRecipe(id){
        if(!id) throw "You must provide an id to search for a recipe";
        
        const recipeCollection = await recipe();
        const listOfRecipes = await recipeCollection.find({ _id: id }).limit(1).toArray();
        if (listOfRecipes.length === 0) throw "Could not find recipe with id of " + id;
            
        return listOfRecipes[0];
    },
    //Get comments using recipeid
    async getComments(id) {
        if (id === undefined) return Promise.reject("You must provide an ID");

        const recipeCollection = await recipe();
        //var listOfComments = recipeCollection.find({ _id: id }).toArray();
        var listOfComments = await recipeCollection.find({ _id: id },{comments:1,_id:1,title:1}).toArray();
       if(listOfComments)
        {
        var comments = listOfComments[0].comments;
        var recipeid = listOfComments[0]._id;
        var recipetitle = listOfComments[0].title;
        console.log(comments.length);
       // db.products.find( { qty: { $gt: 25 } }, { item: 1, qty: 1 } )
//{_id: COMMENT_ID, recipeId: RECIPE_ID, recipeTitle: RECIPE_TITLE, poster: COMMENT_NAME, comment: COMMENT}
         var myoutput = [];
        
        for(let i = 0, l = comments.length; i < l; i++) {
            var output = {
                _id: comments[i].commentID,
                recipeId: recipeid,
                recipeTitle:recipetitle,
                poster: comments[i].poster,
                comment: comments[i].comment
                
            }; 
            //console.log(output);
            myoutput.push(output);
        }
    }
        //console.log("hiiii"+comments);
       // console.log(myoutput);
        if (!listOfComments) throw "Comments not found as - Could not find recipe with id of " + id;
        return myoutput;
        
    },
    //get comments using comment id
    async getCommentsbyID(commentid){
        if (commentid === undefined) return Promise.reject("You must provide a comment ID");
        const recipeCollection = await recipe();
        //return recipeCollection.find({"comments.commentID":commentid},{comments:{$elemMatch: {commentID:commentid}}},{"title":1}).toArray();
       var listOfComments= await recipeCollection.find({"comments.commentID":commentid},{comments:{$elemMatch: {commentID:commentid}}},{"title":1,"ingredients":1}).toArray();
       //var listOfComments= await recipeCollection.find({"comments.commentID":commentid},{comments:{$elemMatch: {commentID:commentid}}}).toArray();
       console.log(listOfComments[0]);
        var comments = listOfComments[0].comments;
        var recipeid = listOfComments[0]._id;
        //var recipetitle = listOfComments[0].title;
        var myoutput = [];
        
        for(let i = 0, l = comments.length; i < l; i++) {
            var output = {
                _id: comments[i].commentID,
                recipeId: recipeid,
                recipeTitle:"",
                poster: comments[i].poster,
                comment: comments[i].comment
                
            }; 
            //console.log(output);
            myoutput.push(output);
        }
    //return recipeCollection.find({"comments.commentID":commentid},{comments:{$elemMatch: {commentID:commentid}}},{"title":1}).toArray();
    return myoutput;
    }
    ,
    async createRecipe(_title, _ingredients,_steps, _comments) {
                
        if (!_title) throw "No title provided";
        if (typeof _title !== "string") throw "Title must be a string";
        var ingredients=_ingredients;
        var steps=[];
        var comments=[];
        const recipeCollection = await recipe();
                
        const newRecipe = {
          title: _title,
          ingredients: _ingredients,
          steps:_steps,
          comments: comments,
          _id: uuid()
        };
        if(_comments){
            for(let i = 0, l = _comments.length; i < l; i++) {
                var newComment = {
                                    commentID: uuid(),
                                    poster: _comments[i].poster,
                                    comment: _comments[i].comment
                }; 
                newRecipe.comments.push(newComment);
            }
        }
        const newInsertInformation = await recipeCollection.insertOne(newRecipe);
        const newId = newInsertInformation.insertedId;
        return await this.getRecipe(newId);
      },
    async updateRecipe(id, _newTitle, _ingredients, _steps){
        if (id === undefined) throw "No id provided";
        if (!_newTitle && !_ingredients && !_steps ) throw "Please update newTitle, ingredients or steps "; 

        if (_newTitle) newTitle=_newTitle;
        if(_ingredients) newingredients = _ingredients;
        if(_steps) newsteps = _steps 
        else newsteps="";
        const recipeCollection = await recipe();
        var upddatedRecipe={};
        if(_newTitle && _ingredients && _steps){
            upddatedRecipe = {
            title: newTitle,
            ingredients: newingredients,
            steps:newsteps
          };
        }
        else if(_newTitle && _ingredients){
            upddatedRecipe = {
            title: newTitle,
            ingredients: newingredients          };
        }
        else if(_newTitle && _steps){
            upddatedRecipe = {
            title: newTitle,
            steps:newsteps          };
        }
        // we use $set to update only the fields specified
        //await recipeCollection.update({ _id: id }, { $set: { title: newTitle } });
        await recipeCollection.update({ _id: id }, { $set: upddatedRecipe });
        return await this.getRecipe(id);
    },
    async deleteRecipe(id){
        if (id === undefined) return Promise.reject("You must provide an ID");

        const recipeCollection = await recipe();
        const deletedInformation = await recipeCollection.deleteOne({ _id: id });
        
        if (deletedInformation.deletedCount === 0) throw "Could not find the document with this id to delete";

        return true;
    }
    
    ,async addAComment(id,posterName,Newcomment){
        if(id ===undefined) return Promise.reject("No input provided");

        const recipeCollection = await recipe();
        return await recipeCollection.update({"_id":id},{$push:{"comments":{"commentID":uuid(), "poster":posterName, "comment": Newcomment}}} );
    },
    async updateAComment(Recipeid,commentorID,Newcomment){
        if(Recipeid === undefined) return Promise.reject("No Id Provided");
        if(commentorID === undefined) return Promise.reject("No Commentor id provided");
        if(!Newcomment) return Promise.reject("No new Comment Provided");
        const recipeCollection = await recipe();
        await recipeCollection.update({"_id":Recipeid, "comments.commentID":commentorID},{"$set": {"comments.$.comment": Newcomment}});
        return await exports.getRecipe(Recipeid);
    
    },
    async deleteComment(id){
        const recipeCollection = await recipe();
        if(id ===  undefined)return Promise.reject("No Id Provided");
        await recipeCollection.update({"comments.commentID":id}, {$pull: {"comments":{commentID:id}}});
        return true; 
    }
    
};

