
import React from "react";


import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
  
  import { Link } from "react-router-dom"
  import { Separator } from "@/components/ui/separator"; 


export const Calendrier = () => {
    return 

    <div>

        <Separator className="mx-4" />
        <Breadcrumb className="mx-20 ">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink>
                        <Link href="/dashboard">Aceuil</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink>
                        <Link href="/Calendrier">Schedule</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>

        <div className="px-20">
            <div className="flex items-center pb-4">
              <div className="mr-auto">
                <h2 className="text-2xl font-bold tracking-tight">All promos!</h2>
                <p className="text-muted-foreground">
                   Here&apos;s a list of all promotions!
                </p>
              </div>

            </div>

        </div>
    </div>

}