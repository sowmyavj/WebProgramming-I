const connection = require("./mongoConnection");
const todoItems = require("./todo");

const main = async () => {
    try { 
            const task1 = await todoItems.createTask("Ponder Dinosaurs","Has Anyone Really Been Far Even as Decided to Use Even Go Want to do Look More Like?");
            console.log("New task has been added! Task details are as follows:");
            console.log(task1);

            const task2 = await todoItems.createTask("Play Pokemon with Twitch TV","Should we revive Helix?");
            console.log("New task has been added!");
            console.log(task2); 

            //Query and log all the tasks present in the database
            let getTasks = await todoItems.getAllTasks();
            console.log("\nDisplaying all the tasks in the collection:");
            console.log(getTasks);
        
            //Remove the first task
            console.log("\nRemove the first task with task id:")
            console.log(task1._id);
            const removeTask = await todoItems.removeTask(task1._id);

            //Query and log all the remaining tasks present in the database
            getTasks = await todoItems.getAllTasks();
            console.log("\nDisplaying all the tasks in the collection:");
            console.log(getTasks);

            //Complete the remaining task
            const task = await todoItems.getTask(task2._id);
            const finishedTask = await todoItems.completeTask(task._id);  
            console.log(finishedTask);
  
            const db = await connection();
            await db.close();
            console.log("Done!");
    }catch (error) {
            console.error(error);
    }
};

main();
