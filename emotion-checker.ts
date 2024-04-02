import {env} from "./env"
import openai from "openai"

export async function detectEmotion(input: string) {
	try {
		const OpenAI = new openai({
			apiKey: env.OPENAI_API_KEY
		})
		const completion = await OpenAI.chat.completions.create({
			messages: [
				{
					role: "system",
					content: `You are a helpful assistant designed to return the sentiment of a given text. 
						The JSON object format is {sentiment: 'positive' | 'negative' | 'neutral'}.`
				},
				{role: "user", content: input}
			],
			model: "gpt-3.5-turbo-0125",
			response_format: {type: "json_object"}
		})

		const sentiment = completion.choices[0].message.content

		return sentiment
	} catch (err) {
		console.error(err)
		return null
	}
}
