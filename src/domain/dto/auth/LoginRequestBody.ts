import { z } from "zod"

export const LoginReqBodySchema = z.object({
  username: z.string().min(1, 'Username or email is required'),
  password: z.string().min(1, 'Password is required'),
})

export type LoginReqBody = z.infer<typeof LoginReqBodySchema>