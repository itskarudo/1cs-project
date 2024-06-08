import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import axios from "axios";
import { Label } from "@/components/ui/label";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export function AddSchedule() {
  const [promo, setPromo] = useState("");
  const [semester, setSemester] = useState("");
  const [spec, setSpec] = useState("");

  const handleSubmit = () => {
    const url = `http://localhost:3000/schedules`;
    axios
      .post(url, {
        Promotion: promo,
        Semester: semester,
        Speciality: spec,
      })
      .then((r) => {
        const url = "http://localhost:3000/sessions";
        axios
          .post(url, {
            StartDate: semester == "S1" ? "2023-07-01" : "2024-01-01",
            FinishDate: semester == "S1" ? "2023-12-31" : "2024-06-30",
            ScheduleId: r.data.schedule.id,
          })
          .then(() => {
            toast.success("Schedule added successfully");
          });
      });
  };

  return (
    <div>
      <Separator className="mx-4" />
      <Breadcrumb className="mx-20 ">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link to="/Schedule">Schedule</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-blue-500">
              Add Schedule
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="pl-[100px] ">
        <h2 className="text-2xl font-bold tracking-tight">Add Schedule</h2>
      </div>
      <div className="flex justify-center items-center h-scree py-8 ">
        <Card className="w-[1100px]">
          <CardHeader>
            <CardTitle></CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="area">Promotion</Label>
                <Select value={promo} onValueChange={setPromo}>
                  <SelectTrigger id="Semestre">
                    <SelectValue placeholder="Select a promotion..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1CPI">1CPI</SelectItem>
                    <SelectItem value="2CPI">2CPI</SelectItem>
                    <SelectItem value="1CS">1CS</SelectItem>
                    <SelectItem value="2CS">2CS</SelectItem>
                    <SelectItem value="3CS">3CS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="Type">Semester</Label>
              <Select value={semester} onValueChange={setSemester}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select a semster..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="S1">S1</SelectItem>
                  <SelectItem value="S2">S2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Speciality</Label>
              <Select value={spec} onValueChange={setSpec}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select a speciality..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SIW">SIW</SelectItem>
                  <SelectItem value="ISI">ISI</SelectItem>
                  <SelectItem value="AIDS">AIDS</SelectItem>
                  <SelectItem value="MI">MI</SelectItem>
                  <SelectItem value="INFO">INFO</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="justify-between space-x-2">
            <Button
              variant="outline"
              className="bg-blue-500 text-white"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
