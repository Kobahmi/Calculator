let firstOperand = ""
let secondOperand = ""
let currentOperation = null
let shouldResetScreen = false

const addBtn = document.querySelector("#add")  //grab all buttons and the screens
const substractBtn = document.querySelector("#substract")
const multiplyBtn = document.querySelector("#multiply")
const divideBtn = document.querySelector("#divide")
const equalBtn = document.querySelector("#equal")
const decimalBtn = document.querySelector("#decimal")
const clearBtn = document.getElementById("clear")
const deleteBtn = document.querySelector("#delete")
const screenDisplay = document.querySelector(".screentwo")
const screenDisplayTop = document.querySelector(".screen")

const numberButtons = document.querySelectorAll("[data-number]") //select all number and operator buttons
const operatorButtons = document.querySelectorAll("[data-operator")

equalBtn.addEventListener("click", evaluate) //make all buttons do stuff with functions that we will make later
clearBtn.addEventListener("click", clearAll)
decimalBtn.addEventListener("click", decimal)
deleteBtn.addEventListener("click", deleteNumber)

numberButtons.forEach((button) => //needs to be forEach because querySelectAll didnt make string
button.addEventListener("click", () => setNumber(button.textContent)))

operatorButtons.forEach((button) =>
button.addEventListener("click", () => setOperator(button.textContent)))


function setNumber(value) { //takes off whatever number currently on screen and puts new one
    if (screenDisplay.textContent === "0" || shouldResetScreen) resetScreen()
    screenDisplay.textContent += value
}

function setOperator(operator) { //calculates result and puts what we have so far on the screen above
    if (currentOperation !== null) evaluate()
    firstOperand = screenDisplay.textContent
    currentOperation = operator
    screenDisplayTop.textContent = `${firstOperand} ${currentOperation}`
    shouldResetScreen = true
}

function clearAll() { //clear all and puts the number 0 back
    firstOperand = ""
    secondOperand = ""
    screenDisplay.textContent = "0"
    screenDisplayTop.textContent = ""
    currentOperation = null
}

function deleteNumber() { //backspace
    screenDisplay.textContent = screenDisplay.textContent
        .toString()
        .slice(0, -1)
}

function add(a, b) { //calculations
   return a+b
}

function substract(a, b) {
    return a-b
}

function multiply(a, b) {
    return a*b
}

function divide(a, b) {
    return a/b
}

function decimal() { //adds decimal point and makes sure that only one decimal can be put at the same time
    if (shouldResetScreen) resetScreen()
    if (screenDisplay.textContent === "") screenDisplay.textContent = "0"
    if (screenDisplay.textContent.includes(".")) return
    screenDisplay.textContent += "."
}

function equal(operator, a, b) { //makes sure a and b are numbers and calculates; makes the "=" do nothing if used alone
a = Number(a)
b = Number(b)
switch(operator) {
    case "+":
        return add(a, b)
    case "-":
        return substract(a, b)
    case "x": 
        return multiply(a, b)
    case "÷":
        if (b===0) return null
        else return divide(a, b)
    default: 
        return null
    }
}

function evaluate()  { //shouldResetScreen is turned on, so we cannot keep repeating the same operator after another
    if (currentOperation === null || shouldResetScreen) return
    if (screenDisplay.textContent === "0" && currentOperation === "÷") {
        alert("You cannot divide by 0")
        return
    }
    secondOperand = screenDisplay.textContent
    screenDisplay.textContent = roundResult(equal(currentOperation, firstOperand, secondOperand))
    screenDisplayTop.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`

    currentOperation = null //makes it so that pressing "=" again wont keep calculating non-stop
}

function roundResult(number) { //rounds number
    return Math.round(number*1000)/1000
}

function resetScreen() { //replaces the current number in the display for the new one if its 0 || if its after an operator
    screenDisplay.textContent = ""
    shouldResetScreen = false
}