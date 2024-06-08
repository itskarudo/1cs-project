import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AlertPassword } from "@/components/ui/alertpassword";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await auth.login(formData);
      navigate("/");
    } catch (error) {
      console.error(error);
      setAlert(true);
    }
  };

  if (!auth.isAuthReady) return null;
  if (auth.isLoggedIn) return <Navigate replace to="/" />;

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[350px] pb-8">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Welcome Back!</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full gap-4">
            <div className="flex flex-col items-start space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="@esi-sba.dz"
              />
            </div>
            <div className="flex flex-col items-start space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="space-y-4">
            <Button className="w-full" onClick={handleSubmit}>
              Login
            </Button>
            {alert && <AlertPassword />}
          </div>
        </CardFooter>
        <div className=" text-center text-sm text-muted-foreground ">
          <span className="">
            No admins yet?{" "}
            <Link
              to="/Signup"
              className="ml-1 underline underline-offset-4 hover:text-primary"
            >
              Create account
            </Link>
          </span>
        </div>
      </Card>
    </div>
  );
}
export default Login;
