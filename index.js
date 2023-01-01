stack = [];

$(document).ready(function () {
    $(".button").click(function (e) {
        e.preventDefault();
        if ($(this).html() === "=") {
            let result = handleEval($("#display").text());
            $("#answer").text(result);
        } else if ($(this).html() === "DEL") {
            $("#display").text($("#display").text().slice(0, -1))
        } else if ($(this).html() === "AC") {
            $("#display").text("");
        } else {
            $("#display").append($(this).html());
        }
    })
})

function handleEval (text) {
    // convert infix to postfix
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
            }
            if (text[i] === "(") {
                stack.push(text[i]);
            } else if (text[i] === '×' || text[i] === '÷') {
                stack.push(text[i]);
            } else if (text[i] === '+' || text[i] === '-') {
                while (stack[stack.length-1] === "×" || stack[stack.length-1] === "÷") {
                    queue.push(stack.pop());
                }
                stack.push(text[i]);
            } else if (text[i] === ")") {
                while (stack[stack.length-1] !== "(") {
                    queue.push(stack.pop());
                }
                // Pop the left bracket from the stack and discard it
                stack.pop()
            }
        }
        //console.log(queue);
        //console.log(stack);
    }

    if (number !== '') {
        queue.push(Number(number));
    }

    while (stack.length > 0) {
        queue.push(stack.pop());
    }
    console.log(queue);
    return evalPostfix(queue);
}

function evalPostfix (expression) {
    let stack = [];

    for (let i=0; i < expression.length; i++) {
        if (!isNaN(expression[i]) === true) {
            stack.push(expression[i]);
        } else {
            // is operator
            // pop two operands from stack
            one = stack.pop();
            two = stack.pop();
            
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