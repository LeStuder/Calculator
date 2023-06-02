// vVARIABLE DECLARATIONS
// Numbers
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

//Dot
const numberDot = document.getElementById("number-dot")

//Operands
const operandAddition = document.getElementById("operand-addition")
const operandSubtraction = document.getElementById("operand-subtraction")
const operandMultiplication = document.getElementById("operand-multiplication")
const operandDivision = document.getElementById("operand-division")
const operandCalculate = document.getElementById("operand-calculate")

//Function Keys
const functionKeyLeftBracket = document.getElementById("function-left-bracket")
const functionKeyRightBracket = document.getElementById("function-right-bracket")
const functionKeyClear = document.getElementById("function-clear")
const functionKeyDelete = document.getElementById("function-delete")

//Display
const displayInput = document.getElementById("display-input")
const displayResult = document.getElementById("display-result")

//Variables used in Functions
let inputStr = ""

//EVENT LISTENERS
//Numbers
numberZero.addEventListener("click", () => {
    const regexJustZeros = /^0+$/
    if (regexJustZeros.test(getLastInputBlock())) {
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

//Dot
numberDot.addEventListener("click", () => {
    const regexDoesNotHaveDot = /\.+/g
    const regexHasNumbersBeforeIt = /[0-9]+$/
    if (regexDoesNotHaveDot.test(getLastInputBlock()) && regexHasNumbersBeforeIt.test(getLastInputBlock())) {
        addToInputStr(".")
    }
})

//Operands
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

//Function Keys
functionKeyLeftBracket.addEventListener("click", () => {
    regexHasRightBracketBeforeIt = /\)+$/
    if (inputStr.length === 0 || !regexHasRightBracketBeforeIt.test(getLastInputBlock)) {
        addToInputStr("(")
    }
})
functionKeyRightBracket.addEventListener("click", () => {
    console.log("here")
    console.log(JSON.stringify(countBrackets()))
    if (countBrackets()[2] > 0) {
        addToInputStr(")")
    }
})
functionKeyClear.addEventListener("click", () => {
    inputStr = " "
    updateDisplayInput()
})
functionKeyDelete.addEventListener("click", () => {
    removeLastInput()
})

//FUNCTIONS

//returns [amountLeftBrackts, amountRightBrackets, openBrackets]
function countBrackets() {
    const amountLeftBrackets = inputStr.split("").filter((elem) => elem === "(").length
    const amountRightBrackets = inputStr.split("").filter((elem) => elem === ")").length
    const arr = [amountLeftBrackets, amountRightBrackets, amountLeftBrackets - amountRightBrackets]
    return arr
}

function addOperandToStr(operand) {
    //removes the operand before it to be able to replace it
    regexHasNoNumberOrBracketBeforeIt = /[^0-9\)\(]$/
    if (regexHasNoNumberOrBracketBeforeIt.test(getLastInputBlock())) {
        removeLastInput()
    }

    //only add operands if there are already numbers in the string
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

//Updates display value when called
function updateDisplayInput() {
    displayInput.textContent = inputStr
}

//Adds parameter to inputStr and updates Display Value
function addToInputStr(val) {
    inputStr = inputStr.split("").concat(val).join("")
    updateDisplayInput()
}
