import { z } from "zod"
import { UserProfileSchema } from "./UserProfile";

export const UserSchema = UserProfileSchema.extend({
  id: z.string().uuid(),
  email: z.string().email()
});

export type User = z.infer<typeof UserSchema>
