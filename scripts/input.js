import { calculate } from "./calculate.js"

//VARIABLE DECLARATIONS Numbers
const numberZero = document.getElementById("number-0")
const numberOne = document.getElementById("number-1")
const numberTwo = document.getElementById("number-2")
const numberThree = document.getElementById("number-3")
const numberFour = document.getElementById("number-4")
const numberFive = document.getElementById("number-5")
const numberSix = document.getElementById("number-6")
const numberSeven = document.getElementById("number-7")
const numberEight = document.getElementById("number-8")
const numberNine = document.getElementById("number-9")

//VARIABLE DECLARATIONS Dot
const numberDot = document.getElementById("number-dot")

//VARIABLE DECLARATIONS Operands
const operandAddition = document.getElementById("operand-addition")
const operandSubtraction = document.getElementById("operand-subtraction")
const operandMultiplication = document.getElementById("operand-multiplication")
const operandDivision = document.getElementById("operand-division")
const operandCalculate = document.getElementById("operand-calculate")

//VARIABLE DECLARATIONS Function Keys
const functionKeyLeftBracket = document.getElementById("function-left-bracket")
const functionKeyRightBracket = document.getElementById("function-right-bracket")
const functionKeyClear = document.getElementById("function-clear")
const functionKeyDelete = document.getElementById("function-delete")

//VARIABLE DECLARATIONS Display
const displayInput = document.getElementById("display-input")
const displayResult = document.getElementById("display-result")

//Variables used in Functions
let inputStr = ""

//EVENT LISTENERS Numbers
numberZero.addEventListener("click", () => {
    const regexJustZeros = /^[0]+$/
    if (inputStr.length === 0 || !regexJustZeros.test(getLastInputBlock())) {
        addToInputStr("0")
    }
})
numberOne.addEventListener("click", () => {
    addToInputStr("1")
})
numberTwo.addEventListener("click", () => {
    addToInputStr("2")
})
numberThree.addEventListener("click", () => {
    addToInputStr("3")
})
numberFour.addEventListener("click", () => {
    addToInputStr("4")
})
numberFive.addEventListener("click", () => {
    addToInputStr("5")
})
numberSix.addEventListener("click", () => {
    addToInputStr("6")
})
numberSeven.addEventListener("click", () => {
    addToInputStr("7")
})
numberEight.addEventListener("click", () => {
    addToInputStr("8")
})
numberNine.addEventListener("click", () => {
    addToInputStr("9")
})

//EVENT LISTENER Dot
numberDot.addEventListener("click", () => {
    const regexHasDot = /[\.]+/
    const regexHasNumbersBeforeIt = /[0-9]+$/
    if (!regexHasDot.test(getLastInputBlock()) && regexHasNumbersBeforeIt.test(getLastInputBlock())) {
        addToInputStr(".")
    }
})

//EVENT LISTENERS Operands
operandAddition.addEventListener("click", () => {
    addOperandToStr("+")
})
operandSubtraction.addEventListener("click", () => {
    addOperandToStr("-")
})
operandMultiplication.addEventListener("click", () => {
    addOperandToStr("*")
})
operandDivision.addEventListener("click", () => {
    addOperandToStr("/")
})
operandCalculate.addEventListener("click", () => {
    calculate(inputStr)
})

//EVENT LISTENERS Function Keys
functionKeyLeftBracket.addEventListener("click", () => {
    if (inputStr.length === 0) {
        addToInputStr("(")
    }
})
functionKeyRightBracket.addEventListener("click", () => {
    const regexHasLeftBracketBeforeIt = /[\(]+$/
    if (countBrackets(inputStr)[2] > 0 && !regexHasLeftBracketBeforeIt.test(getLastInputBlock())) {
        removeOperandBeforeIt()
        addToInputStr(")")
    }
})
functionKeyClear.addEventListener("click", () => {
    inputStr = " "
    updateDisplayInput()
    updateResults("")
})
functionKeyDelete.addEventListener("click", () => {
    removeLastInput()
})

//EVENT LISTENER Keyboard events
document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "0":
            numberZero.click()
            break
        case "1":
            numberOne.click()
            break
        case "2":
            numberTwo.click()
            break
        case "3":
            numberThree.click()
            break
        case "4":
            numberFour.click()
            break
        case "5":
            numberFive.click()
            break
        case "6":
            numberSix.click()
            break
        case "7":
            numberSeven.click()
            break
        case "8":
            numberEight.click()
            break
        case "9":
            numberNine.click()
            break
        case "+":
            operandAddition.click()
            break
        case "-":
            operandSubtraction.click()
            break
        case "*":
            operandMultiplication.click()
            break
        case "/":
            operandDivision.click()
            break
        case "=":
        case "Enter":
            operandCalculate.click()
            break
        case "Backspace":
            functionKeyDelete.click()
            break
        case "Delete":
            functionKeyClear.click()
            break
        case "(":
            functionKeyLeftBracket.click()
            break
        case ")":
            functionKeyRightBracket.click()
            break
    }
})

//FUNCTIONS
//returns [amountLeftBrackets, amountRightBrackets, openBrackets]
//is being exported
function countBrackets(str) {
    const amountLeftBrackets = str.split("").filter((elem) => elem === "(").length
    const amountRightBrackets = str.split("").filter((elem) => elem === ")").length
    const arr = [amountLeftBrackets, amountRightBrackets, amountLeftBrackets - amountRightBrackets]
    return arr
}

//removes unneccessary zeros in cases as 00.0, 1.0 and 0.0200
function removeUnneccessaryZeros() {
    const regexHasOnlyOneZero = /^[0]+$/
    const regexLastInputBlock = /[0-9.]+$|[^0-9]+$/g
    const regexHasZerosAfterLastDecimalPlace = /(?<=[\.0-9])[0]+$/

    //prevents more than one lone zero before the decimal point (prevents 00.02)
    if (regexHasOnlyOneZero.test(getLastInputBlock())) {
        inputStr = inputStr.replace(regexLastInputBlock, "0")
        updateDisplayInput()
    }

    //removes unneccessary zeros after the last (number after the) decimal point -> (prevents 0.0200 and 0.00)
    if (regexHasZerosAfterLastDecimalPlace.test(getLastInputBlock())) {
        inputStr = inputStr.replace(regexHasZerosAfterLastDecimalPlace, "")
        updateDisplayInput
    }
}

//removes the operand before it to be able to replace it
function removeOperandBeforeIt() {
    const regexHasNoNumberOrBracketBeforeIt = /[^0-9\)\(]$/
    if (regexHasNoNumberOrBracketBeforeIt.test(getLastInputBlock())) {
        removeLastInput()
    }
}

//removes unneccessary zeros and operand before it and
function addOperandToStr(operand) {
    removeUnneccessaryZeros()
    removeOperandBeforeIt()

    //only add operands if there are already numbers in the string, exception is the minus operand to indicate negative numbers
    const regexHasNoLeftBracketBeforeIt = /[^\(]+$/
    if (inputStr.length > 0 && (regexHasNoLeftBracketBeforeIt.test(getLastInputBlock()) || operand === "-")) {
        addToInputStr(operand)
    }
}

//removes the last number/operand/bracket from the inputStr
function removeLastInput() {
    inputStr = inputStr.slice(0, inputStr.length - 1)
    updateDisplayInput()
}

//Returns the last input block which is either a block of numbers(including dot) or a operand / bracket
function getLastInputBlock() {
    const regexLastInputBlock = /[0-9.]+$|[^0-9]+$/g
    return inputStr.slice(inputStr.search(regexLastInputBlock))
}

//Updates displayInput value
function updateDisplayInput() {
    displayInput.textContent = inputStr
}

//Updates displayResult value
function updateResults(str) {
    displayResult.textContent = str
}

//Adds parameter to inputStr and updates Display Value
function addToInputStr(val) {
    inputStr = inputStr.split("").concat(val).join("")
    updateDisplayInput()
}

export { countBrackets, updateResults }
