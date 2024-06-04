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
                            <CardTitle>card1
                              
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p>Amount: 100.00</p>
                            <p>Total Hours Supplémentaire: 10.00</p>
                            <div className="flex justify-end">
                            <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" className="font-bold">. . .</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <p>avatar</p>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Card1</h4>
            <p className="text-sm">
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
                            <CardTitle>Card 2</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p>Amount: 200.00</p>
                            <p>Total Hours Supplémentaire: 20.00</p>
                          </CardContent>
                        </Card>
                      </div>
                      <div className="space-y-1">
                        <Card>
                          <CardHeader>
                            <CardTitle>Card 3</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p>Amount: 300.00</p>
                            <p>Total Hours Supplémentaire: 30.00</p>
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
