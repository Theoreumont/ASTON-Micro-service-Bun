import {detectEmotion} from "./emotion-checker"
import z from "zod"

const PORT = process.env.PORT || 3000

console.log(`Server running on port ${PORT}`)

Bun.serve({
	port: PORT,
	fetch: async (req) => {
		const path = new URL(req.url).pathname
		console.log("path", path)

		if (path == "/api/getEmotion" && req.method == "POST") {
			try {
				const body = await req.json()
				const bodySchema = z.object(
					{
						input: z.string({
							required_error: "Input is required",
							invalid_type_error: "Input must be a string",
							description: "The text to analyze"
						})
					},
					{
						required_error: "Body is required",
						invalid_type_error: "Body must be an object"
					}
				)
				const {input} = bodySchema.parse(body)
				console.log("input", body)

				const result = await detectEmotion(input)

				if (!result) {
					return new Response("Error", {status: 500})
				}

				const responseSchema = z.object({
					sentiment: z.string()
				})

				const response = responseSchema.parse(JSON.parse(result))

				console.log("response", response)

				return Response.json({
					result: response,
					success: true
				})
			} catch (err) {
				// If the error is a ZodError, return a 400 response with the error message
				if (err instanceof z.ZodError) {
					return Response.json(err.errors, {status: 400})
				}
			}
		}

		return new Response("Page not found", {status: 404})
	}
})
