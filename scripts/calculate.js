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

    //Create a array from all the matches and then manipulate each element that there is a subarray [before, after]
    //where the after has a multiply symbol between the bracket and the number.
    //Then make a for loop for all subarray and replace the before with the after
}

/*

function replaceMultiplyBracketShorthand to replace 5( with 5*( and )3 with )*3{

}

function calculateMDAS() to calculate without bracket according to mdas{
    
}

function to search for (2 + 5) and give content to calculateMDAS{

}

function to replace (7) with 7 {

}

while-loop till the string doesnt have any brackets anymore
calculateMDAS one last time
output to displayResult

*/

export { calculate }
