import { loginUser } from "@/api/auth/login";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/useAuthContext";
import { useUserStore } from "@/store/useUserStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

const LoginPage = () => {

  const [isLogging, setIsLogging] = useState<boolean>(false) 
  const user = useUserStore((state) => state.user)
  const setUser = useUserStore((state) => state.setUser)

  const { login, logout } = useAuth()
  const navigate = useNavigate()

  const mutation  = useMutation({
    mutationKey: ['user-authentication'],
    mutationFn: loginUser,
    onMutate: () => {
      setIsLogging(true)
    },
    onSuccess: (data) => {
      login()
      setUser(data.data)
      setIsLogging(false)
      // navigate("/")
    },
    onError: (error) => {
      console.log(error.message)
      setIsLogging(false)
      logout()
    }
  })

  return (
    <div className="w-screen h-[100vh] flex flex-col items-center justify-center text-black">
      <h1>{user?.id}</h1>
      <p className="mb-10">{user?.first_name} { user?.last_name } </p>
      <Button 
        onClick={() => mutation.mutate({
          username: "mkgnrl",
          password: "test123"
        })}
        disabled={isLogging}
      >
        { isLogging ? <Loader className="animate-spin"  /> : "" }
        Login
      </Button>
      <Button 
       onClick={}
      >
        Logout
      </Button>
    </div>
  );
}

export default LoginPage;
