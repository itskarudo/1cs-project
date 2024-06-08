import { Button } from "@/components/ui/button";
import "./Profile.css";
import "aos/dist/aos.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

export const Profile = () => {
  const auth = useAuth();
  const { authData } = auth;

  const [grades, setGrades] = useState([]);

  useEffect(() => {
    const url = "http://localhost:3000/grades";
    axios.get(url).then((res) => setGrades(res.data.grades));
  }, []);

  const [email, setEmail] = useState(authData.email);
  const [pwd, setPwd] = useState(null);

  const handleSubmit = async () => {
    if (pwd && pwd.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    const url = `http://localhost:3000/users/${authData.id}`;

    await axios.patch(url, {
      email,
      password: pwd,
    });

    toast.success(
      "Information updated successfully, you will be automatically logged out.",
    );
    setTimeout(async () => {
      await auth.logout();
    }, 3000);
  };

  return (
    <section className="Profile">
      <div className="ProfileContent container">
        <div className="bg-white h-screen">
          <div>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink>
                    <Link to="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink>
                    <BreadcrumbPage className="text-blue-500">
                      Profile
                    </BreadcrumbPage>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="flex items-center pb-4">
            <div className="flex flex-col items-center justify-center mr-auto w-screen">
              <Tabs defaultValue="account" className="w-[800px]">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="account">Information</TabsTrigger>
                  <TabsTrigger value="password">Edit</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                  <Card className="w-full bg-white shadow-md">
                    <CardHeader className=" text-gray-800">
                      <CardTitle>Account Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex flex-wrap justify-center">
                        <div className="w-1/2">
                          <Label htmlFor="name" className="text-gray-600">
                            Full Name
                          </Label>
                          <p className="text-gray-800">
                            {authData.firstName} {authData.lastName}
                          </p>
                        </div>
                        <div className="w-1/2">
                          <Label htmlFor="username" className="text-gray-600">
                            Email
                          </Label>
                          <p className="text-gray-800">{authData.email}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap justify-center">
                        <div className="w-1/2">
                          <Label
                            htmlFor="date_of_birth"
                            className="text-gray-600"
                          >
                            Role
                          </Label>
                          <p className="capitalize text-gray-800">
                            {authData.role}
                          </p>
                        </div>
                        <div className="w-1/2">
                          <Label
                            htmlFor="place_of_birth"
                            className="text-gray-600"
                          >
                            Grade
                          </Label>
                          <p className="text-gray-800">
                            {grades.find((v) => v.id === authData.grade)?.Value}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="password">
                  <Card>
                    <CardHeader>
                      <CardTitle>Edit Information</CardTitle>
                      <CardDescription>
                        Change your info here. After hitting save, you will be
                        logged out.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          value={pwd}
                          onChange={(e) => setPwd(e.target.value)}
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button onClick={handleSubmit}>Save</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
