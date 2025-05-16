import type { LoginReqBody } from "@/domain/dto/auth/LoginRequestBody"
import { LoginResponseSchema, type LoginResponse } from "@/domain/dto/auth/LoginResponse"

export async function loginUser(body: LoginReqBody) {
    console.log(body)
    const response: LoginResponse = await new Promise((resolve, reject) => setTimeout(() => {

      if(body.username !== "mkgnrl" && body.password !== "test123") {
        reject("Invalid credentials.")
      }

      const data: any = {
        data: {
          id: "42387a0f-ce36-4634-8521-a3abee71fd18",
          email: "test@gmail.com",
          first_name: "Miko",
          last_name: "Generale",
          age: 25,
          phone_number: "09999999",
          username: "Miko"
        }
      }
      const filtereData = LoginResponseSchema.parse(data)
    
      resolve(filtereData)
    }, 1000))

    return response
}