import { Button } from "@/components/ui/button";
import "./Profile.css";
import Aos from "aos";
import "aos/dist/aos.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";

export const Profile = () => {
  return (
    <section className="Profile">
      <div className="overlay"></div>
      <div className="ProfileContent container">
        <div className="bg-white h-screen">
          <div>
            <Breadcrumb>
              <BreadcrumbList>
              <BreadcrumbItem>
             <BreadcrumbLink>
               <Link to ="/Accueil">Home</Link>
             </BreadcrumbLink>
           </BreadcrumbItem>
           <BreadcrumbSeparator />
           <BreadcrumbItem>
             <BreadcrumbLink>
             <BreadcrumbPage className="text-blue-500">Profile</BreadcrumbPage>
             </BreadcrumbLink>
           </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="textDiv">
            <h3 data-aos="fade up" className="text-muted-foreground py-2"></h3>
            <h1 data-aos="fade up" className="ProfileTitle font-bold tracking-tight pb-2">CHAIB SLIMEN</h1>
          </div>

          <div className="flex items-center pb-4">
            <div className="flex flex-col items-center justify-center mr-auto w-screen">
              <Tabs defaultValue="account" className="w-[800px]">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="password">Password</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
  <Card className="w-full bg-white shadow-md">
    <CardHeader className=" text-gray-800">
      <CardTitle>Account</CardTitle>
    </CardHeader>
    <CardContent className="space-y-2">
      <div className="flex flex-wrap justify-center">
        <div className="w-1/2">
          <Label htmlFor="name" className="text-gray-600">Name</Label>
          <p className="text-gray-800">Aya</p>
        </div>
        <div className="w-1/2">
          <Label htmlFor="username" className="text-gray-600">Username</Label>
          <p className="text-gray-800">@aya</p>
        </div>
      </div>
      <div className="flex flex-wrap justify-center">
        <div className="w-1/2">
          <Label htmlFor="date_of_birth" className="text-gray-600">Date of Birth</Label>
          <p className="text-gray-800">1990-01-01</p>
        </div>
        <div className="w-1/2">
          <Label htmlFor="place_of_birth" className="text-gray-600">Place of Birth</Label>
          <p className="text-gray-800">Annaba, Algeria</p>
        </div>
      </div>
     
      <div className="flex flex-wrap justify-center">
        <div className="w-1/2">
          <Label htmlFor="email" className="text-gray-600">Email</Label>
          <p className="text-gray-800">aya@example.com</p>
        </div>
        <div className="w-1/2">
          <Label htmlFor="phone" className="text-gray-600">Phone</Label>
          <p className="text-gray-800">+33 6 12 34 56 78</p>
        </div>
      </div>
      <div className="flex flex-wrap justify-center">
        <div className="w-1/2">
          <Label htmlFor="department" className="text-gray-600">Department</Label>
          <p className="text-gray-800">Mathematics</p>
        </div>
        <div className="w-1/2">
          <Label htmlFor="position" className="text-gray-600">Grade</Label>
          <p className="text-gray-800">Professor</p>
        </div>
      </div>
      <div className="flex flex-wrap justify-center">
        <div className="w-1/2">
          <Label htmlFor="research_interests" className="text-gray-600">Research Interests</Label>
          <p className="text-gray-800">Algebra, Geometry, and Number Theory</p>
        </div>
      </div>
    </CardContent>
  </Card>
</TabsContent>

               
                <TabsContent value="password">
                  <Card>
                    <CardHeader>
                      <CardTitle>Password</CardTitle>
                      <CardDescription>
                        Change your password here. After saving, you'll be logged out.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="space-y-1">
                        <Label htmlFor="current">Current password</Label>
                        <Input id="current" type="password" />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="new">New password</Label>
                        <Input id="new" type="password" />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>Save password</Button>
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
