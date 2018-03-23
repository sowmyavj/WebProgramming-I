function checkIsProperNumber(val) {
    if (val === undefined || typeof val !== "number") {
        throw `${val} is not a number`;
    }
}
function isTwoOrMore(num){
    if(num < 2){
        throw "Number should be greater than or equal to 2 ";
    }

}
function isEven(num){
    if(num % 2 != 0){
        throw "Number should be even";
    }

}
module.exports = {
    description: "This module will print triangles,squares and rhombuses",
    triangle: (lines) => {
        checkIsProperNumber(lines);
        printTriangle(lines);

    },
    square: (lines) => {
        checkIsProperNumber(lines);
        isTwoOrMore(lines);
        printSquare(lines);
        
    },
    rhombus: (lines) => {
        checkIsProperNumber(lines);
        isTwoOrMore(lines);
        isEven(lines);
        printRhombus(lines);
        
    }
};

function printTriangle(lines) {
    console.log("printTriangle for number of lines ="+lines);
     for(let i =1;i<=lines;i++){
        let spaceCount=1;
            while(spaceCount <= lines - i){
                process.stdout.write(" ");
                spaceCount++;
            }
            process.stdout.write("/");
            if (i==1){
                process.stdout.write("\\\n");
                continue;                               
            }
            let midSpaceCount=0;
            while(midSpaceCount < 2*(i-1)){
                if(i==lines){
                    process.stdout.write("-");
                }else{
                    process.stdout.write(" ");
                }
                midSpaceCount++;
            }
            process.stdout.write("\\\n");  
    } 
    
}

function printSquare(lines) {
    console.log("printSquare for number of lines ="+lines);
    for(let i=1;i<=lines;i++){
        process.stdout.write("|");
        for(let j=1;j<=lines;j++){
            if(i==1 || i==lines){process.stdout.write("-");  }   
            else {process.stdout.write(" ");}   
        }
        process.stdout.write("|\n");

    }
    process.stdout.write("\n");
}

function printRhombus(lines){
    console.log("printRhombus for number of lines ="+lines);
        for(let i =1;i<=lines/2;i++){
           let spaceCount=1;
               while(spaceCount <= lines - i){
                   process.stdout.write(" ");
                   spaceCount++;
               }
               process.stdout.write("/");
               if (i==1){
                   process.stdout.write("-\\\n");
                   continue;                               
               }
               let midSpaceCount=0;
               while(midSpaceCount < 2*(i-1)+1){
                   process.stdout.write(" ");
                   midSpaceCount++;
               }
               process.stdout.write("\\\n");  
       } 
       for(let i =lines/2 ;i>0;i--){
        let spaceCount=1;
            while(spaceCount <= lines - i){
                process.stdout.write(" ");
                spaceCount++;
            }
            process.stdout.write("\\");
            if (i==1){
                process.stdout.write("-/\n");
                continue;                               
            }
            let midSpaceCount=0;
            while(midSpaceCount < 2*(i-1)+1){
                process.stdout.write(" ");
                midSpaceCount++;
            }
            process.stdout.write("/\n");  
    } 
    
   
}