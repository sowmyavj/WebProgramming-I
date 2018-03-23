const fileDatamod = require("./fileData");
const textMetricmod = require("./textMetrics");
var fs = require('fs');
async function processFile(fpath){
    
    try{
        const filename=fpath.slice(0,fpath.indexOf('.'));
        const resultFile=filename+".result.txt";
        const resultFileJSON=filename+".result.json";
        
        var resultfileexists = fs.existsSync(resultFile);
        
        if(!resultfileexists){
            //Get the given input file in a string format
            let fileasString=await fileDatamod.getFileAsString(fpath);
            //Simplify the text, and store that text in a file named <filename>.result.txt
            let simplifiedText=textMetricmod.simplify(fileasString);
            await fileDatamod.saveStringToFile(resultFile,simplifiedText);

            //Run the text metrics and store those results in <filename>.result.json
            let resultTextMetric=textMetricmod.createMetrics(simplifiedText);
            await fileDatamod.saveJSONToFile(resultFileJSON,resultTextMetric);
            
            //Read and Print the resultant json file
            let result = await fileDatamod.getFileAsJSON(resultFileJSON);
            console.log(`Printing the contents of the file ${resultFileJSON} :`);
            console.log(result);
                  
        } else{
            //console.log("Printing the contents of the file "+resultFileJSON+" :");
            let result = await fileDatamod.getFileAsJSON(resultFileJSON);
            console.log(`Printing the contents of the file ${resultFileJSON} :`);
            console.log(result);
        }  
        

    }catch (error){
        console.error(error);
    }

}
async function main(){
    await processFile("chapter1.txt");
    await processFile("chapter2.txt");
    processFile("chapter3.txt");
}

main();