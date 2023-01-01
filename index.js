stack = [];

$(document).ready(function () {
    $(".button").click(function (e) {
        e.preventDefault();
        if ($(this).html() === "=") {
            let result = handleEval($("#display").text());
            console.log(result);
            $("#answer").text(result);
        } else if ($(this).html() === "DEL") {
            $("#display").text($("#display").text().slice(0, -1))
        } else if ($(this).html() === "AC") {
            $("#display").text("");
            $("#answer").text("");
        } else {
            $("#display").append($(this).html());
        }
    })
})

function handleEval (text) {
    // convert infix to postfix

    // values to test if postfix expression is true
    let operands = 0;
    let operators = 0;

    let stack = [];
    let queue = [];

    let number = '';
    for (let i=0; i < text.length; i++) {
        if (!isNaN(text[i]) === true) {
            number = number + text[i];
        } else {
            if (number !== '') {
                queue.push(Number(number));
                number = '';
                operands++;
            }

            if (text[i] === "(") {
                stack.push(text[i]);
                if (text[i+1] === "-") {
                    queue.push(0);
                    operands++;
                }
            } else if (text[i] === '×' || text[i] === '÷') {
                while (stack[stack.length-1] === "×" || stack[stack.length-1] === "÷") {
                    queue.push(stack.pop());
                }
                stack.push(text[i]);
                operators++;
            } else if (text[i] === '+' || text[i] === '-') {
                if (i===0) {
                    queue.push(0);
                    operands++;
                };
                while (stack[stack.length-1] === "×" 
                || stack[stack.length-1] === "÷"
                || stack[stack.length-1] === "-"
                || stack[stack.length-1] === "+") {
                    queue.push(stack.pop());
                }
                stack.push(text[i]);
                operators++;
            } else if (text[i] === ")") {
                while (stack[stack.length-1] !== "(") {
                    queue.push(stack.pop());
                }
                // Pop the left bracket from the stack and discard it
                stack.pop()
            }
        }
    }

    if (number !== '') {
        queue.push(Number(number));
        operands++;
    }

    while (stack.length > 0) {
        queue.push(stack.pop());
    }

    console.log(queue);
    console.log(isNaN(queue[0]))
    console.log(isNaN(queue[1]))
    console.log(isNaN(queue[queue.length-1]))
    console.log(operands-operators)

    // check if postfix expression is valid
    if (isNaN(queue[0]) === false
     && isNaN(queue[1]) === false
     && isNaN(queue[queue.length-1]) === true
     && operands-operators === 1) {
        return evalPostfix(queue);
     } else {
        return 'Syntax Error'
     }
}

function evalPostfix (expression) {
    let stack = [];

    for (let i=0; i < expression.length; i++) {
        if (!isNaN(expression[i]) === true) {
            stack.push(expression[i]);
        } else {
            // is operator
            // pop two operands from stack
            two = stack.pop();
            one = stack.pop();
            
            if (expression[i] === '+') {
                stack.push(one+two);
            } else if (expression[i] === '-') {
                stack.push(one-two);
            } else if (expression[i] === '×') {
                stack.push(one*two);
            } else {
                stack.push(one/two);
            }
        }
    }
    return stack[0]
}