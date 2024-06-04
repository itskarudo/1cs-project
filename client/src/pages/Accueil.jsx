import React, { useState, useEffect } from "react";
import "./Accueil.css";
import "./Calendrier";
import Aos from "aos";
import "aos/dist/aos.css";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";

const data = [
  { week: "Mardi", horaires: "10h-12h", module: "Recherch Opérationnelle", type_de_sc: "Td" },
  { week: "Wednesday", horaires: "08h-10h", module: "Recherch Opérationnelle", type_de_sc: "Td" },
  // Add more data here
];

const itemsPerPage = 9;

export const Accueil = () => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <section className="Accueil">
      <div className="overlay"></div>
      <div className="AccueilContent container">
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <Link to="/Accueil">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <Link to="/Calendrier" className="text-blue-500">Schedule</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="textDiv">
          <h3 data-aos="fade up" className="text-muted-foreground py-2">Hello Mr</h3>
          <h1 data-aos="fade up" className="AccueilTitle font-bold tracking-tight pb-2">CHAIB SLIMEN</h1>
        </div>
        <div data-aos="fade up" className="AccueilTitleD mb-4">
          Your horaires number Hours Supplementaires for this <span>month</span>
        </div>
        <div className="px-20">
          <Tabs defaultValue="week" className="b-4">
            <div>
              <TabsList>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="year">Year</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="week">
              <Card>
                <CardHeader className="">
                  <CardTitle className="flex title-left">Hours Supplementaires</CardTitle>
                  <CardDescription>
                    Your weekly hours Sup.
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableCell>Day</TableCell>
                        <TableCell>Horaires</TableCell>
                        <TableCell>Type de séance</TableCell>
                        <TableCell>Module</TableCell>
                        
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.map((item) => (
                        <TableRow key={item.week}  style={{ height: "50px" }}>
                          <TableCell>{item.week}</TableCell>
                          <TableCell>{item.horaires}</TableCell>
                          
                          <TableCell>{item.type_de_sc}</TableCell>
                          <TableCell>{item.module}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="year">
              <Card>
                <CardHeader className="">
                  <CardTitle className="flex title-left">Hours Supplementaires</CardTitle>
                  <CardDescription>
                    Your weekly hours Sup.
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-4 flex justify-center">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Years</TableHead>
                        <TableHead className="hidden md:table-cell">
                          horaires
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody >
                      <TableRow className="bg-accent" style={{ height: "50px" }}>
                        <TableCell>
                          <div className="font-medium">2022/2023</div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          20h
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">2023/2024</div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          35h
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default Accueil;
