import z from 'zod'

const envSchema = z.object({
  API_BASE_URL: z.string().default('http://localhost:3333'),
})

const _env = envSchema.safeParse(import.meta.env)

if (_env.success === false) {
  throw new Error('All environment variables are necessary to run application')
}

export const env = _env.data
