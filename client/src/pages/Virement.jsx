import { Button } from "@/components/ui/button";
import "./Virement.css";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

export const Virement = () => {
  return (
    <section className="Virement">
      <div className="overlay"></div>
      <div className="VirementContent container">
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
             <BreadcrumbPage className="text-blue-500">Virement</BreadcrumbPage>
             </BreadcrumbLink>
           </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="textDiv">
            <h3 data-aos="fade up" className="text-muted-foreground py-2"></h3>
            <h1 data-aos="fade up" className="VirementTitle font-bold tracking-tight pb-2">CHAIB SLIMEN</h1>
          </div>

        

          <div className="flex items-center pb-4">
            <div className="flex flex-col items-center justify-center mr-auto w-screen">
              <Tabs defaultValue="virement" className="w-[800px]">
                <TabsList >
                  <TabsTrigger value="virement">Virements</TabsTrigger>
                </TabsList>
                <TabsContent value="virement">
                  <Card>
                    <CardHeader>
                      <CardTitle></CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="space-y-1">
                        <Card>
                          <CardHeader>
                            <CardTitle>First virment session
                              
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                          <p className="text-gray-600 ">Total Hours Supplémentaire : <span className="text-gray-900 font-bold ms-auto space-x-4  d-flex justify-content-end"> 10h</span></p>
                            <p className="text-gray-600 ">Amount: <span className="text-blue-600 ms-auto font-bold d-flex justify-content-end" >100.00 DA</span></p>
                            <div className="flex justify-end">
                            <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" className="font-bold">. . .</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <p></p>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">1st session</h4>
            <p className="text-sm text-gray-600">
              Total Hours Supplementaires per section : <span> 30h</span>
            </p>
            <div className="flex items-center pt-2">
              <p>
              amount : 
              <span className="text-xs text-muted-foreground">
                 7000000 DA
              </span>
              </p>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
                            </div>
                     
                          </CardContent>
                        </Card>
                      </div>
                      <div className="space-y-1">
                        <Card>
                          <CardHeader>
                            <CardTitle>Second virment session</CardTitle>
                          </CardHeader>
                          <CardContent>
                          <p className="text-gray-600 ">Total Hours Supplémentaire : <span className="text-gray-900 font-bold ms-auto space-x-4  d-flex justify-content-end"> 10h</span></p>
                            <p className="text-gray-600 ">Amount: <span className="text-blue-600 ms-auto font-bold d-flex justify-content-end" >100.00 DA</span></p>
                            <div className="flex justify-end">
                            <HoverCard>
                            <HoverCardTrigger asChild>
        <Button variant="link" className="font-bold">. . .</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <p></p>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">2nd session</h4>
            <p className="text-sm text-gray-600">
              Total Hours Supplementaires per section : <span> 30h</span>
            </p>
            <div className="flex items-center pt-2">
              <p>
              amount : 
              <span className="text-xs text-muted-foreground">
                 7000000 DA
              </span>
              </p>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                      
                    </CardContent>
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
