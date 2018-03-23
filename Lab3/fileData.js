const bluebird = require("bluebird");
const Promise = bluebird.Promise;
const fs = bluebird.promisifyAll(require("fs"));

module.exports.getFileAsString = getFileAsString;
module.exports.getFileAsJSON = getFileAsJSON;
module.exports.saveStringToFile = saveStringToFile;
module.exports.saveJSONToFile= saveJSONToFile;

async function getFileAsString(path) {
  try{
    if (!path) throw "You must provide a path";

    const fileName = path;
    console.log(`Reading ${fileName} ...`);
    const fileContent = await fs.readFileAsync(fileName, "utf-8");
    return fileContent.toString();
  }catch (err){
    console.error(err);
    throw (err);
  }
  }
 
  async function getFileAsJSON(path) {
    try{
      if (!path) throw "You must provide a path";

      const fileName = path;
      console.log(`Reading ${fileName} ...`);
      const fileContent = await fs.readFileAsync(fileName, "utf-8");
      let jsonData = JSON.parse(fileContent);

      return jsonData;
    }catch (err){
        console.error(err);
    }
  }

 async function saveStringToFile(path, text) {
    try{
      if (!path || !text) throw "You must provide both path and text";

      await fs.writeFileAsync(path, text);
      console.log("Finished saving file!");
    
      return null;
     }catch (err){
      console.error(err);
    }
  }
  async function saveJSONToFile(path, obj){
    if (!path || !obj) throw "You must provide both path and object";

    jsonData = JSON.stringify(obj,null, 4);
    await fs.writeFileAsync(path, jsonData);
    console.log("Finished saving object to file as JSON!");
    return null;
  }


