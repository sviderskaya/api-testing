import {test, expect} from "@playwright/test"

test('check  integer array', async() => {
    function numArray(num) {
        let set = new Set(num)
        return set.size !== num.length
    }
    let num1 = [1, 2, 3, 5, 2]
    let num2 = [1, 2, 3, 4, 5, 6]
    
    console.log(numArray(num1))  //true
    console.log(numArray(num2))  //false
})

test('check palindrome string', async() => {
    function isPalindrome(string) {
        string = string.toLowerCase().replace(/[^A-Z0-9]/ig, "")
        return string === string.split('').reverse().join('')
    }
    let phraseOne = "race a car"
    let phraseTwo = "A man, a plan, a canal: Panama"

    console.log(isPalindrome(phraseOne)) //false
    console.log(isPalindrome(phraseTwo)) //true
})