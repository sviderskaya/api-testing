import {test, expect} from "@playwright/test"

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