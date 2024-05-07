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
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Separator } from "@/components/ui/separator";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
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
function SignupAdmin() {
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
  const [type, setType] = useState("");

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
    <div>
        <Separator className="mx-4"/>
       <Breadcrumb className="mx-20 ">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink>
            <Link to="/Schedule">Aceuil</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
    
        <BreadcrumbItem>
          <BreadcrumbPage className="text-blue-500">Ajouter member</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <div className="pl-[100px] pb-8">
            <h2 className="text-2xl font-bold tracking-tight">Ajouter Membres</h2>
            <p className="text-muted-foreground">
            Ajouter des nouveaux membre pour les heurs supplémentaire.
            </p>
          </div>
    <div className="flex justify-center items-center h-screen  pt-32">
      <Card className="w-[1100px] pb-8 ">
        <CardHeader>
          <CardTitle></CardTitle>
          <CardDescription></CardDescription>
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
              <Label htmlFor="type">Type</Label>
              <Select onValueChange={setType} value={formData.type}>
                <SelectTrigger className="">
                  <SelectValue placeholder="Add new ..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="enseignant">Enseignant</SelectItem>
                    
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
            you wanna delete a member!
            <Sheet >
      <SheetTrigger asChild>
        <Button variant="Ghost" className="text-blue-500 ">delete</Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader >
          <SheetTitle >Delete Member</SheetTitle>
          <SheetDescription>
            enter the member's email that you want to delete.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col items-start space-y-2 px-32">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                name="email"
                value=""
                onChange=""
                placeholder="@esi-sba.dz"
              />
            </div>
        <SheetFooter>
          <SheetClose asChild>
          <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="bg-blue-500 text-white">Submit</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will delete the user permanently ,press continue to confirme .
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel  >Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
          </span>
        </div>
      </Card>
    </div>
    </div>
  );
}
export default SignupAdmin;
