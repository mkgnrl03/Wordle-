import { UserSchema } from "@/domain/model/User"
import { z } from "zod"

export const LoginResponseSchema = z.object({
  data: UserSchema
})

export type LoginResponse = z.infer<typeof LoginResponseSchema>