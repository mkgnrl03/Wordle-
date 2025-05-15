import { z } from "zod"

export const UserProfileSchema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  age: z.number().optional(),
  phone_number: z.number().optional()
}) 

export type UserProfile = z.infer<typeof UserProfileSchema>

