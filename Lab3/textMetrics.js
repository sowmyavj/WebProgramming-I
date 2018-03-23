let textMetricsModules = (exports = module.exports);
module.exports.simplify=simplify;
module.exports.createMetrics=createMetrics;
function simplify(text){
    try{
            if(!text){
                throw "Text must be supplied for simplify function"
            }
            let textLowerCase= text.toLowerCase();
            //Replace non alpha-numeric characters, multiple white space,new line to 
            //single whitespace
            let remove_tabs=textLowerCase.replace(/\\t/g, ' ').replace(/\\n/g, ' ').replace(/[\W_]+/g,' ');
            //console.log(remove_tabs);
            return (remove_tabs.trim());
    }
    catch(err){
        console.error(err);
    }
}

function createMetrics(text){
    try{
        let totalLetters;
        let totalWords=0;
        let uniqueWords;
        let longWords=0;
        let averageWordLength;
        let wordOccurrences={};
        //text=text.trim();
        //Count total letters in text
        totalLetters=text.replace(/[^\w]+/gmi,"").length;
       
        //Count total number of words in text
        let numWords = text.split(" ");
        
        for(let i=0;i<numWords.length;i++){
            //let matches = numWords[i].match(/\d+/g); //ignores numbers
            if (numWords[i] == "") {
                continue;
            }else{
                totalWords++;
            }
        }
        
        //Count the wordOccurrences
        for(let i=0;i<numWords.length;i++){
            key=numWords[i];
           // let matches = key.match(/\d+/g); //ignores numbers
           // if (matches != null) {continue;}
            if (!wordOccurrences.hasOwnProperty(key)) {
                wordOccurrences[key]=1;
            }else{
                wordOccurrences[key]=wordOccurrences[key]+1;
            }
        }
        //count unique words
        uniqueWords=(Object.keys(wordOccurrences).length);

    //count no of long words
        for(let i=0;i<numWords.length;i++){
            key=numWords[i];
            
            if (key.length>=6) {
                longWords++;
            }
        }
    //Calculate average word length
    if(totalWords != 0)
        averageWordLength=(totalLetters/totalWords).toFixed(2);
    else
        averageWordLength=0;

    resultObject={};
    resultObject["totalLetters"]=totalLetters;
    resultObject["totalWords"]=totalWords;
    resultObject["uniqueWords"]=uniqueWords;
    resultObject["longWords"]=longWords;
    resultObject["averageWordLength"]=averageWordLength;
    resultObject["wordOccurrences"]=wordOccurrences;

    return(resultObject);



    }catch(err){
        console.error(err);
    } 


}