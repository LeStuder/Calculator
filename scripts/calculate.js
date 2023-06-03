import { countBrackets } from "./input.js"

const displayResult = document.getElementById("display-result")

function calculate(inputStr) {
    if (!checkAllBracketsClosed(inputStr)) {
        console.log("The inputStr still has " + countBrackets(inputStr)[2] + " open Brackets")
        return
    }
}

// Pseudocode

function checkAllBracketsClosed(inputStr) {
    if (countBrackets(inputStr)[2] > 0) {
        updateResults(countBrackets(inputStr)[2] + " open brackets")
        return false
    }
    return true
}

function updateResults(resultStr) {
    displayResult.textContent = resultStr
}

/*

function displayResult() displays Result

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
