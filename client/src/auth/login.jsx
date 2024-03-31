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
import { Link,  useNavigate } from "react-router-dom";
import { useState } from "react";
import { AlertPassword } from "@/components/ui/alertpassword";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    loggedIn: false,
  });
  const [alert, setAlert] = useState(false);
  const navigate=useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:3000/auth/login";
      const response = await axios.post(url, {
        email: formData.email,
        password: formData.password,
      });
      // Store token in localStorage
      localStorage.setItem("token", response.data.token);
      // Update loggedIn state to true
      setFormData({ ...formData, loggedIn: true });
    } catch (error) {
      console.error(error);
      setAlert(true);
    }
  };

  // Redirect to home page if logged in
  if (formData.loggedIn) {
     navigate("/welcom");
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[350px] h-[370px]">
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
          <Button className="w-full" onClick={handleSubmit}>
            Login
          </Button>
          {alert && <AlertPassword />}
        </CardFooter>
        <div className=" text-center text-sm text-muted-foreground ">
          <span className="">
            Register admin!
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
