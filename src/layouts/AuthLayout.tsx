import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <main> 
      <h1> AuthLayout </h1>
      <Outlet />
    </main>
  );
}

export default AuthLayout;
