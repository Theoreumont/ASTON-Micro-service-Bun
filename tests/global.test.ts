import {expect, test, mock, jest, describe, it} from "bun:test"

const openaiCall = mock(async (input: string) => {
	return {
		chat: {
			completions: {
				create: {
					choices: [
						{
							message: {
								content: {sentiment: "positive"}
							}
						}
					]
				}
			}
		}
	}
})

describe("detectEmotion", () => {
	it("should return the sentiment of a given text", async () => {
		const result = await openaiCall("I am happy")
		const sentiment = result.chat.completions.create.choices[0].message.content
		expect(sentiment).toEqual({sentiment: "positive"})
	})
})
