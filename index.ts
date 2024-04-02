import {detectEmotion} from "./emotion-checker"

const input = "I am happy"

const result = await detectEmotion(input)

console.log(result)
