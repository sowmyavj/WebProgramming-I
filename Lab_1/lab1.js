
function UserException(message) {
    this.message = message;
    this.name = 'UserException';
 }
function sumOfSquares(num1, num2, num3) {
  if(typeof num1 != 'number' || typeof num2 != 'number' || typeof num3 != 'number'){
    throw new UserException("Number expected!");
  }
  num1square= num1 * num1;
  num2square= num2 * num2;
  num3square= num3 * num3;
  sumOfsquares=num1square+num2square+num3square;
  resultSquares=`Sum of squares of the three numbers is ${sumOfsquares}`;
  return resultSquares;
}

function cupsOfCoffee(howManyCups){
    let resultString="";
    for(let i=howManyCups;i>0;i--){
        let temp=i-1;
        if(i==1){
            resultString+="1 cup of coffee on the desk! 1 cup of coffee!\nPick it up, drink the cup, no more coffee left on the desk!";
            break;
        }
        else if(i==2){
            resultString+=`${i} cups of coffee on the desk! ${i} cups of coffee!\nPick one up, drink the cup, ${temp} cup of coffee on the desk!\n`;
        }
        else{
            resultString+=`${i} cups of coffee on the desk! ${i} cups of coffee!\nPick one up, drink the cup, ${temp} cups of coffee on the desk!\n`;
        }
    }
    return resultString;
}

function occurrencesOfSubstring(myString, subString){
    let count=0;
    lengthOfString=myString.length;
    for(let i=0;i<lengthOfString;i++){
        //console.log("i is "+i);
        if(myString.indexOf(subString,i) != -1){
            let nextStartPos=myString.indexOf(subString,i);
            //console.log("i is "+i+" nextStartPos "+nextStartPos);
            i=nextStartPos;
            count++;
        }
    }
    return count;
    //console.log(`The number of times the substring ${subString} occurs in the string ${myString} = ${count}`);
}

function sayHelloTo(firstName, lastName, title){
    if(firstName != null && typeof firstName != 'string' || lastName != null &&typeof lastName != 'string' ||title != null && typeof title != 'string' ){
        throw new UserException("Expected arguments must be of type string");
    }
    if (firstName != null && lastName != null && title!= null){
        console.log(`Hello, ${title} ${firstName} ${lastName}! Have a good evening!`);
    }
    else if (firstName != null && lastName != null && title == null){
        console.log(`Hello, ${firstName} ${lastName}. I hope you are having a good day!`);
    }
    else if (firstName != null && lastName == null && title == null){
        console.log(`Hello, ${firstName}!`);
    }
    else if (firstName == null && lastName == null && title == null){
        throw new UserException("first name missing!");
    }
}

function randomizeSentences(paragraph){

//console.log(paragraph.split("(.|!)"));
var lines = paragraph.match( /[^\.!\?]+[\.!\?]+/g );
//console.log(lines);
//console.log(parseInt(Math.random()*result.length));
//console.log(result[parseInt(Math.random()*result.length)]);
let count =0;
let temp=[];
 var result = [];
 while(count < lines.length) {
    let nextRandomindex=parseInt(Math.random()*lines.length);
    if(temp[nextRandomindex]!= 1){
        temp[nextRandomindex]=1;
        count++;
        result.push(lines[nextRandomindex]);
    }
 }
 return ( result.join(" "));

}


try{
    console.log("\nsumOfSquares:");
    console.log(sumOfSquares(2,1,3));
    console.log(sumOfSquares(4,4,8));
    console.log(sumOfSquares(5,4,2));
     console.log(sumOfSquares(-5,-4,-2));
    console.log(sumOfSquares(13,2,9));
    //console.log(sumOfSquares(12,"som",9));//Uncomment this line to see exception checking
    console.log("\nsayHelloTo:");
    //sayHelloTo(); //Uncomment this line to see exception checking
    sayHelloTo("Sowmya");
    sayHelloTo("Sowmya","Vijay");
    sayHelloTo("Sowmya","Vijay","Ms.");
    console.log("\ncupsOfCoffee:");
    console.log(cupsOfCoffee(5));
    console.log("\noccurrencesOfSubstring:");
    console.log("occurrencesOfSubstring(\"Missisippi\",\"i\") => "+occurrencesOfSubstring("Missisippi","i"));
    console.log("occurrencesOfSubstring(\"Oradell\",\"w\") => "+occurrencesOfSubstring("Oradell","w"));
    console.log("occurrencesOfSubstring(\"Helllllllo\",\"ll\") => "+occurrencesOfSubstring("Helllllllo","ll"));
    console.log("occurrencesOfSubstring(\"Missisippi\",\"ipp\") => "+occurrencesOfSubstring("Missisippi","ipp"));
    
    var paragraph = "Hello, world! I am a paragraph. You can tell that I am a paragraph because there are multiple sentences that are split up by punctuation marks. Grammar can be funny, so I will only put in paragraphs with periods, exclamation marks, and question marks -- no quotations.";
    console.log("\nrandomizeSentences:");
    console.log(randomizeSentences(paragraph));
}catch(e){
    console.log(e.message, e.name);
}