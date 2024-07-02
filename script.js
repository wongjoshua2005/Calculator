function add(num1, num2)
{
    return num1 + num2;
}

function subtract(num1, num2)
{
    return num1 - num2;
}

function multiply(num1, num2)
{
    return num1 * num2;
}

function divide(num1, num2)
{
    return num1 / num2;
}

function operate(num1, num2, operator)
{
    switch (operator)
    {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
        default:
            console.log("ERROR! INVALID OPERATOR!!!");
            break;
    }

}

function display()
{
    let onSecondNum = false;
    let firstNum = "0", secondNum = "";
    let operator = "";

    const result = document.querySelector(".results");
    result.textContent = firstNum;

    const input = document.querySelectorAll(".input");

    input.forEach(function(num) {
        num.addEventListener("click", function() {
            const number = num.textContent;
            const validNum = number !== "AC" && number !== "+/-" && number !== "%"
            && number !== "+" && number !== "-" && number !== "*" 
            && number !== "/" && number !== "=" && firstNum.length < 12;

            if (validNum)
            {
                if (!onSecondNum)
                {
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
                else
                {
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

            switch (number)
            {
                case "AC":
                    display();
                    break;
                case "+":
                case "-":
                case "*":
                case "/":
                    secondNum += firstNum;
                    operator += number;
                    onSecondNum = true;
                    result.textContent = secondNum;
                    break;
                case "=":
                    let convertNum1 = parseInt(firstNum);
                    let convertNum2 = parseInt(secondNum);
                    firstNum = "";
                    firstNum += "" + operate(convertNum1, convertNum2, operator);
                    result.textContent = firstNum;
                    secondNum = "";
                    operator = "";
                    break;
            }
        });
    });
}

display();



