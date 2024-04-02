import z from "zod"

export const envSchema = z.object({
	OPEN_AI_API_KEY: z.string({
		required_error: "Set OPEN_AI_API_KEY in .env file"
	})
})

export type Env = z.infer<typeof envSchema>

export const env = envSchema.parse(process.env)
