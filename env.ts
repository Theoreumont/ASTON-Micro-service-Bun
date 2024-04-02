import z from "zod"

export const envSchema = z.object({
	OPENAI_API_KEY: z
		.string({
			required_error: "Set OPENAI_API_KEY in .env file"
		})
		.startsWith("sk-", {
			message: "OPENAI_API_KEY must start with 'sk-', are you sure this is an OpenAI API key?"
		})
})

export type Env = z.infer<typeof envSchema>

export const env = envSchema.parse(process.env)

console.log("env", env)
