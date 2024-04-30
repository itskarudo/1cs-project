import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { AlertDestructive } from "@/components/ui/alertdemo";
function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [alert, setAlert] = useState(false);

  // due to how shadcn <Select /> elements work, this needs to be its own state.
  const [grade, setGrade] = useState("");

  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      setAlert(true);
      return;
    } else {
      setAlert(false);
    }

    try {
      const url = "http://localhost:3000/auth/signup";
      await axios.post(url, {
        firstName: formData.firstName,
        lastName: formData.lastName,

        email: formData.email,
        password: formData.password,
        grade: grade,
        role: "admin",
      });
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[350px] pb-8">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create Account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full gap-4">
            <div className="flex flex-col items-start space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
              />
            </div>
            <div className="flex flex-col items-start space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
              />
            </div>
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
              <Label htmlFor="grade">Grade</Label>
              <Select onValueChange={setGrade} value={formData.grade}>
                <SelectTrigger className="">
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Professeur">Professeur</SelectItem>
                    <SelectItem value="enseignant">Enseignant</SelectItem>
                    <SelectItem value="Assistant Master A">
                      Assistant Master A
                    </SelectItem>
                    <SelectItem value="Assistant Master B">
                      Assistant Master B
                    </SelectItem>
                    <SelectItem value="Lecturer A">Lecturer A</SelectItem>
                    <SelectItem value="Lecturer B">Lecturer B</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
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
            <div className="flex flex-col items-start space-y-2">
              <Label htmlFor="password">Confirme Password</Label>
              <Input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="space-y-4">
            <Button className="w-full" onClick={handleSubmit}>
              Sign Up
            </Button>
            {alert && <AlertDestructive />}
          </div>
        </CardFooter>
        <div className=" text-center text-sm text-muted-foreground ">
          <span className="">
            already have an account?
            <Link
              to="/Login"
              className="ml-1 underline underline-offset-4 hover:text-primary"
            >
              Login
            </Link>
          </span>
        </div>
      </Card>
    </div>
  );
}
export default Signup;
