function operate(num1, num2, operator)
{
    // Checks the operator user entered to return back the calculation
    switch (operator)
    {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2;
        case "/":
            return num1 / num2;
        default:
            console.log("ERROR! INVALID OPERATOR!!!");
            break;
    }

}

function display()
{
    // Let program know user entered operator, decimal, or negative value
    let onSecondNum = false, usedDot = false, usedNegative = false;

    // Display the two numbers when entering input
    let firstNum = "0", secondNum = "";
    let operator = ""; // Indicate which operator being used when calculating

    // Display the default value to the screen
    const result = document.querySelector(".results");
    result.textContent = firstNum;

    const input = document.querySelectorAll(".input");

    // Checks through all the buttons to see if any button was clicked
    input.forEach(function(num) {
        // To show the user's input on the screen
        num.addEventListener("click", function() {
            // To retrieve the button's text that user trying to enter
            const number = num.textContent;

            // Boolean to ensure it's a number and not any other button
            const validNum = number !== "AC" && number !== "+/-" && number !== "%"
            && number !== "+" && number !== "-" && number !== "*" 
            && number !== "/" && number !== "=" && number !== "." 
            && firstNum.length < 12;

            // Checks if user entered a button to display on screen
            if (validNum)
            {
                // Runs all operations for the first number use entered
                if (!onSecondNum)
                {
                    // To add onto the display ensuring no errors in calculation
                    if (firstNum !== "0")
                    {
                        firstNum += number;
                        result.textContent = firstNum;
                    }
                    else
                    {
                        firstNum = "";
                        firstNum += number;
                        result.textContent = firstNum;
                    }
                }
                // Runs all operations for when user enters second number
                else
                {
                    // To start new numbers after first numbers are entered
                    if (secondNum !== firstNum)
                        {
                            secondNum += number;
                            result.textContent = secondNum;
                        }
                        else
                        {
                            secondNum = "";
                            secondNum += number;
                            result.textContent = secondNum;
                        }                    
                }
            }

            // Check if the button entered was not a number
            switch (number)
            {
                // Restarts everything
                case "AC":
                    display();
                    break;
                // Starts the second number input when using operator
                case "+":
                case "-":
                case "*":
                case "/":
                    secondNum += firstNum;
                    operator += number;
                    onSecondNum = true;
                    result.textContent = secondNum;
                    usedDot = false;
                    break;
                // Calculates the number
                case "=":
                    // Joke if user divides by zero
                    if (secondNum === "0")
                    {
                        firstNum = "Nice try. ;)"
                        result.textContent = firstNum;
                    }
                    else
                    {
                        // Converts the string numbers into actual integers
                        let convertNum1 = parseFloat(firstNum);
                        let convertNum2 = parseFloat(secondNum);
                        // Resets the first number to display the result
                        firstNum = "";
                        firstNum += `${operate(convertNum1, 
                        convertNum2, operator)}`;
                        result.textContent = firstNum;
                    }

                    // Resets operator and everything back to default
                    secondNum = "";
                    operator = "";
                    onSecondNum = false;
                    usedDot = false;
                    break;
                case ".":
                    if (onSecondNum && !usedDot)
                    {
                        secondNum += ".";
                        result.textContent = secondNum;
                    }
                    else if (!usedDot)
                    {
                        firstNum += ".";
                        result.textContent = firstNum;
                    }
                    usedDot = true;
                    break;
                case "+/-":
                    if (!usedNegative && onSecondNum)
                    {
                        secondNum = `${secondNum}`;
                        result.textContent = secondNum;
                        usedNegative = true;
                    }
                    else if (usedNegative && onSecondNum)
                    {
                        secondNum = secondNum.slice(1);
                        result.textContent = secondNum;
                        usedNegative = false;
                    }
                    else if (!usedNegative)
                    {
                        firstNum = `-${firstNum}`;
                        result.textContent = firstNum;
                        usedNegative = true;
                    }
                    else if (usedNegative)
                    {
                        firstNum = firstNum.slice(1);
                        result.textContent = firstNum;
                        usedNegative = false;
                    }
                    break;
                case "%":
                    if (onSecondNum)
                    {
                        let percentage = parseFloat(secondNum) / 100;
                        secondNum = percentage;
                        result.textContent = secondNum;
                    }
                    else
                    {
                        let percent = parseFloat(firstNum) / 100;
                        firstNum = percent;
                        result.textContent = firstNum;
                    }
                    break;
            }
        });
    });
}

display();
