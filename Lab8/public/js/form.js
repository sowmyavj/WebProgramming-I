(function () {

    function checkForPalindrome(_text) {
        if (!_text) throw "No text provided";
        const cleaned_text=cleanText(_text);
        var checkPalindrome = cleaned_text.split('').reverse().join('');
        if(cleaned_text === checkPalindrome){
            return 1;
        }
        return 0;
    }
    function cleanText(_text) {
        if (!_text) throw "No text provided";
        //let textLowerCase= _text.toLowerCase();
        //Replace non alpha-numeric characters, multiple white space,new line to 
        var cleaned_text = _text.replace(/[^A-Z0-9]/ig, "").toLowerCase();
        console.log(cleaned_text);
        //console.log(remove_tabs);
        return (cleaned_text.trim());
    }
    const staticForm = document.getElementById("static-form");

    if (staticForm) {
        // We can store references to our elements; it's better to 
        // store them once rather than re-query the DOM traversal each time
        // that the event runs.
        const inputTextElement = document.getElementById("text1");
        
        const errorContainer = document.getElementById("error-container");
        const errorTextElement = errorContainer.getElementsByClassName("text-goes-here")[0];

        //const resultContainer = document.getElementById("result-container");
        //const resultTextElement = resultContainer.getElementsByClassName("text-goes-here")[0];
        
        const ul = document.getElementById("listOfwords");
        
        // We can take advantage of functional scoping; our event listener has access to its outer functional scope
        // This means that these variables are accessible in our callback
        staticForm.addEventListener("submit", (event) => {
            event.preventDefault();

            try {
                // hide containers by default
                errorContainer.classList.add("hidden");
                ul.classList.add("hidden");
                
                // Values come from inputs as strings, no matter what :(
                const inputTextValue = inputTextElement.value;
                //input_words.push(inputTextValue);
                const isPalindrome = checkForPalindrome(inputTextValue);
                if(isPalindrome) {
                    result = "\""+inputTextValue+"\" is a Palindrome.";
                }
                else {
                    result = "\""+inputTextValue+"\" is not a Palindrome.";
                }
                
                var li = document.createElement("li");
                li.appendChild(document.createTextNode(inputTextValue));
                if(!isPalindrome) {
                    li.setAttribute("style", "background-color:red;list-style-type:none;");
                    
                }else{
                    li.setAttribute("style", "background-color:blue;list-style-type:none;");
                    
                }
                ul.appendChild(li);
                ul.classList.remove("hidden");
                

            } catch (e) {
                const message = typeof e === "string" ? e : e.message;
                errorTextElement.textContent = e;
                errorContainer.classList.remove("hidden");
            }
        });
    }
})();




