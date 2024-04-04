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