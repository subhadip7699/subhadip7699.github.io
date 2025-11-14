let input = document.getElementById('input-box');
let buttons = document.querySelectorAll("button");

let expression = ""; 

buttons.forEach(button => {
    button.addEventListener("click", (e) => handleInput(e.target.innerHTML));
});


document.addEventListener("keydown", (e) => {
    let key = e.key;

    if (!isNaN(key) || "+-*/.%".includes(key)) {
        handleInput(key); 
    } else if (key === "Enter") {
        handleInput("="); 
    } else if (key === "Backspace") {
        handleInput("DEL");
    } else if (key === "Escape") {
        handleInput("AC"); 
    }
});


function handleInput(value) {
    if (value === "=") {
        try {
            expression = eval(expression).toString();
            input.value = expression;
        } catch {
            input.value = "";
            expression = "";
        }
    } else if (value === "AC") {
        expression = ""; 
        input.value = "";
    } else if (value === "DEL") {
        expression = expression.slice(0, -1); 
        input.value = expression;
    } 
    else {
        
        expression += value;
        input.value = expression;
    }
    
  
}
