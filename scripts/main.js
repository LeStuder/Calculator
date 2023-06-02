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
    addToInputStr("0")
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
    addToInputStr(".")
})

//Operands
operandAddition.addEventListener("click", () => {
    addToInputStr("+")
})
operandSubtraction.addEventListener("click", () => {
    addToInputStr("-")
})
operandMultiplication.addEventListener("click", () => {
    addToInputStr("*")
})
operandDivision.addEventListener("click", () => {
    addToInputStr("/")
})

//Function Keys
functionKeyLeftBracket.addEventListener("click", () => {
    addToInputStr("(")
})
functionKeyRightBracket.addEventListener("click", () => {
    addToInputStr(")")
})
functionKeyClear.addEventListener("click", () => {})
functionKeyDelete.addEventListener("click", () => {})

//FUNCTIONS

function updateDisplayInput(input) {
    displayInput.textContent = inputStr
}

function addToInputStr(val) {
    inputStr = inputStr.split("").concat(val).join("")
    displayInput.textContent = inputStr
}
