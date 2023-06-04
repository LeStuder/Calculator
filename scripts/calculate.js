import { countBrackets } from "./input.js"

const displayResult = document.getElementById("display-result")

function calculate(inputStr) {
    let resultStr = inputStr

    if (!checkAllBracketsClosed(resultStr)) {
        console.log("The inputStr still has " + countBrackets(resultStr)[2] + " open Brackets")
        return
    }

    resultStr = replaceMultiplyBracketShorthand(resultStr)
    console.log(resultStr)
}

// Pseudocode

function checkAllBracketsClosed(str) {
    if (countBrackets(str)[2] > 0) {
        updateResults(countBrackets(str)[2] + " open brackets")
        return false
    }

    return true
}

function updateResults(str) {
    displayResult.textContent = str
}

function replaceMultiplyBracketShorthand(str) {
    let returnStr = str
    const regexLeftBracketHasNumberBeforeIt = /[0-9]*[\.]*[0-9]+[\(]/g
    const regexRightBracketHasNumberAfterIt = /[\)][0-9]+[\.]*[0-9]*/g
    const leftBracketArr = returnStr.match(regexLeftBracketHasNumberBeforeIt)
    const rightBracketArr = returnStr.match(regexRightBracketHasNumberAfterIt)

    for (let i in leftBracketArr) {
        const before = leftBracketArr[i]
        const after = before.replace("(", "*(")
        returnStr = returnStr.replace(before, after)
    }

    for (let i in rightBracketArr) {
        const before = rightBracketArr[i]
        const after = before.replace(")", ")*")
        rightBracketArr[i] = [before, after]
        returnStr = returnStr.replace(before, after)
    }

    return returnStr
}

function calculateMDAS(str) {
    let returnStr = str
    const regexFirstNumber = /^([-]*[0-9]+[\.]*[0-9]*)/
    const regexSecondNumber = /([-]*[0-9]+[\.]*[0-9]*)$/
    const regexToMultiply =
        /((?<=[+\-\/*]|)[-]{1}[\d]+[\.][\d]+|(?<=[+\-\/*]|)[-][\d]+|[\d]*[\.]*[\d]+)[*]([-][\d]+[\.][\d]+|[-][\d]+|[\d]*[\.]*[\d]+)/
    const regexToDivide =
        /((?<=[+\-\/*]|)[-]{1}[\d]+[\.][\d]+|(?<=[+\-\/*]|)[-][\d]+|[\d]*[\.]*[\d]+)[\/]([-][\d]+[\.][\d]+|[-][\d]+|[\d]*[\.]*[\d]+)/
    const regexToAdd =
        /((?<=[+\-\/*]|)[-]{1}[\d]+[\.][\d]+|(?<=[+\-\/*]|)[-][\d]+|[\d]*[\.]*[\d]+)[+]([-][\d]+[\.][\d]+|[-][\d]+|[\d]*[\.]*[\d]+)/
    const regexToSubtract =
        /((?<=[+\-\/*]|)[-]{1}[\d]+[\.][\d]+|(?<=[+\-\/*]|)[-][\d]+|[\d]*[\.]*[\d]+)[-]([-][\d]+[\.][\d]+|[-][\d]+|[\d]*[\.]*[\d]+)/

    //Multiplication
    while (regexToMultiply.test(returnStr)) {
        const toMultiplyStr = returnStr.match(regexToMultiply)[0]
        const firstNumber = toMultiplyStr.match(regexFirstNumber)[0]
        const secondNumber = toMultiplyStr.match(regexSecondNumber)[0]
        const calculatedNumber = parseFloat(firstNumber) * parseFloat(secondNumber)
        returnStr = returnStr.replace(toMultiplyStr, calculatedNumber.toString())
    }
    //Division
    while (regexToDivide.test(returnStr)) {
        const toDivideStr = returnStr.match(regexToDivide)[0]
        const firstNumber = toDivideStr.match(regexFirstNumber)[0]
        const secondNumber = toDivideStr.match(regexSecondNumber)[0]
        if (secondNumber === "0") {
            console.log("division by 0")
            //create solution to finish function and display this
        }
        const calculatedNumber = parseFloat(firstNumber) / parseFloat(secondNumber)
        returnStr = returnStr.replace(toDivideStr, calculatedNumber.toString())
    }
    //Addition
    while (regexToAdd.test(returnStr)) {
        const toAddStr = returnStr.match(regexToAdd)[0]
        const firstNumber = toAddStr.match(regexFirstNumber)[0]
        const secondNumber = toAddStr.match(regexSecondNumber)[0]
        const calculatedNumber = parseFloat(firstNumber) + parseFloat(secondNumber)
        returnStr = returnStr.replace(toAddStr, calculatedNumber.toString())
    }
    //Subtraction
    while (regexToSubtract.test(returnStr)) {
        const toSubtractStr = returnStr.match(regexToSubtract)[0]
        const firstNumber = toSubtractStr.match(regexFirstNumber)[0]
        const secondNumber = toSubtractStr.match(regexSecondNumber)[0]
        const calculatedNumber = parseFloat(firstNumber) - parseFloat(secondNumber)
        returnStr = returnStr.replace(toSubtractStr, calculatedNumber.toString())
    }

    return returnStr
}

console.log("Output calculateMDAS: " + calculateMDAS("3*2+3*4-1/5"))
console.log("Output removeBrackets: " + removeUnneccessaryBrackets("(34+3)+(-3)-2"))

function removeUnneccessaryBrackets(str) {
    let returnStr = str
    const regexBracketWithOneNumber = /[\(][0-9]+[\.]*[0-9]*[\)]/g
    let bracketArr = returnStr.match(regexBracketWithOneNumber)
    console.log("bracketArr: " + JSON.stringify(bracketArr))
    if (bracketArr) {
        bracketArr.map((numberWithBrackets) => {
            const numberWithoutBrackets = numberWithBrackets.slice(1, numberWithBrackets.length - 1)
            returnStr = returnStr.replace(numberWithBrackets, numberWithoutBrackets)
        })
    }

    return returnStr
}

/*

function that loops through all brackets and calculates each individual bracket

make somehow sure that the following negative-number-cases are handled:
3+(-1)
3*(-2)
3+(-1*5)
-1+3
So, everywhere were we search for a bracket or first/second numbers make sure that negative-signs are included

finish calculateMDAS.division

while-loop till the string doesnt have any brackets anymore
calculateMDAS one last time
output to displayResult

*/

export { calculate }
