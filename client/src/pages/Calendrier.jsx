import "./Calendrier.css";
import Aos from "aos";
import "aos/dist/aos.css"


import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"

  
  






  

  import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  

 
import "./Accueil"
  
  
  import { Link } from "react-router-dom"

import React from "react";
export const Calendrier = () => {
    return <section className="Calendrier">
      <div className="overlay"></div>
      <div className="CalendrierContent container">
      <div className=" bg-white h-screen" >
      
       
        <div>
        <Breadcrumb >
         <BreadcrumbList>
           <BreadcrumbItem>
             <BreadcrumbLink>
               <Link to ="/Accueil">Home</Link>
             </BreadcrumbLink>
           </BreadcrumbItem>
           <BreadcrumbSeparator />
           <BreadcrumbItem>
             <BreadcrumbLink>
             <BreadcrumbPage className="text-blue-500">Schedule</BreadcrumbPage>
             </BreadcrumbLink>
           </BreadcrumbItem>
          </BreadcrumbList> 
       
               </Breadcrumb> 
               </div>

               <div className="textDiv">
                    <h3 data-aos="fade up"  className="font-bold py-2"></h3>
                    <h1 data-aos="fade up" className="CalendrierTitle font-bold tracking-tight pb-2">CHAIB SLIMEN</h1>
                </div>
                
                
  <div className="flex items-center pb-4">
  <div className="flex flex-col items-center justify-center mr-auto w-screen">
  <div className="text-2xl font-bold tracking-tight pb-2">Emploi du temps individuel</div>
  
  <p className="font-bold pb-1"><span className="font-medium">Année universitaire :</span>
    2023/2024
  </p>
  <p className="font-bold pb-1"><span className="font-medium">Fonction :</span>
    Enseignant-Chercheur
  </p>
  <p className="font-bold pb-4"><span className="font-medium">Etablissement d'origine :</span>
    ESI-SBA
  </p>

</div>


      </div>
      

      <div className="px-15">
<Card className="b-4 ">
                  <CardHeader className="">
                  </CardHeader>
                  <CardContent className="mt-4">
                  <Table> 
                      <TableHeader>
                        <TableRow>
                          <TableHead>Jours</TableHead>
                          
                          <TableHead>Horaires</TableHead>
                         
                          <TableHead>Type de la séance</TableHead>
                         
                          <TableHead>Modules enseigné</TableHead>
                        
                          <TableHead >Promotion</TableHead>
                          
                          
                          <TableHead>Group-Salle</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                      <TableRow style={{ height: "50px" }} className="bg-accent">
                      <TableCell>
                            <div className="font-medium"> Dimanche</div>
                           
                          </TableCell>
                          <TableCell className="text-right">
                            a
                          </TableCell> 
                         
                          <TableCell className="text-right">a</TableCell>
                          <TableCell className="text-right">a</TableCell>
                          <TableCell className="text-right">a</TableCell>
                          <TableCell className="text-right">a</TableCell>
                         
                          

                        </TableRow>
                        <TableRow >
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                        
                        

                        
                      </TableBody>
                      </Table>
                      </CardContent>
                      </Card>
                      </div>

                      <div className="px-15 py-5">
                      <p className="font-bold text-blue-500 pb-1"><span className="font-medium text-black">Nombre des heures de cours :</span>
    04H
  </p>
  <p className="font-bold  text-blue-500 pb-1"><span className="font-medium text-black">Nombre des heures de TD :</span>
    04H
  </p>
  <p className="font-bold  text-blue-500 pb-1"><span className="font-medium text-black">Nombre des heures de TP :</span>
    02H
  </p>
  <p className="font-bold pb-4"><span className="font-Bold text-black">Heures Supplémentaires :</span>
    01H
  </p>

                         </div>
            
              
               </div>
               </div>
               </section>;
}