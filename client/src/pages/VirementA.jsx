import React, { useEffect, useState } from "react";

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
import { Link } from "react-router-dom";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function ChangeVirement() {
  const [value, setValue] = useState(0);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    const url = "http://localhost:3000/grades";
    axios.get(url).then((res) => setGrades(res.data.grades));
  }, []);

  const handleSubmit = () => {
    const url = "http://localhost:3000/grades";
    axios
      .post(url, {
        Value: selectedGrade,
        PricePerHour: parseInt(value),
      })
      .then(() => {
        toast.success("Price updated successfully");
      });
  };

  return (
    <div>
      <Breadcrumb className="mx-20 ">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link href="/Virement">Payment</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-blue-500">
              Edit Payment
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="px-20 ">
        <div className="flex items-center pb-4">
          <div className="mr-auto">
            <h2 className="text-2xl font-bold tracking-tight">Edit Payment</h2>
            <p className="text-muted-foreground">
              You can change the price per hour
            </p>
          </div>
          <Select onValueChange={setSelectedGrade} value={selectedGrade}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select grade" />
            </SelectTrigger>
            <SelectContent>
              {grades.map((grade) => (
                <SelectItem key={grade.id} value={grade.Value}>
                  {grade.Value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col items-start space-y-2 pt-8 ">
          <Label htmlFor="Price" className="text-blue-500">
            Hourly Price
          </Label>
          <Input
            type="number"
            name="price"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Price"
            className="h-[40px]"
          />
        </div>
        <Button className="mt-8" onClick={handleSubmit}>
          Change
        </Button>
      </div>
    </div>
  );
}
