import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
  import {
    CaretSortIcon,
    ChevronDownIcon,
    DotsHorizontalIcon,
  } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
   
    DropdownMenuContent,
    DropdownMenuItem,
    
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Link } from "react-router-dom"
import { Label } from "@radix-ui/react-label"
import { Input } from "@/components/ui/input"

export function ChangeVirement() {
  
    return (
        <div>
            
    <Breadcrumb className="mx-20 ">
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink>
        <Link href="/Schedule">Aceuil</Link>
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink>
        <Link href="/VirementA">virement</Link>
      </BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage className="text-blue-500">Edit virement</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
<div className="px-20 ">
  <div className="flex items-center pb-4">
  <div className="mr-auto">
        <h2 className="text-2xl font-bold tracking-tight">Changer le prix</h2>
        <p className="text-muted-foreground">
          You can change the price per hour
        </p>
      </div>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto bg-blue-500 text-white border border-blue-500 hover:bg-blue-700 hover:border-blue-700">
          Grades <ChevronDownIcon className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Professeur</DropdownMenuItem>
        <DropdownMenuItem>Enseignant</DropdownMenuItem>
        <DropdownMenuItem>Assistant Master A</DropdownMenuItem>
        <DropdownMenuItem>Assistant Master B</DropdownMenuItem>
        <DropdownMenuItem>Lecturer A</DropdownMenuItem>
        <DropdownMenuItem>Lecturer B</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    
  </div>
  
    <div className="flex flex-col items-start space-y-2 pt-8 ">
              <Label htmlFor="Price" className="text-blue-500">Hourly Price</Label>
              <Input
                type="text"
                name="price"
                value=""
                onChange="{handleChange}"
                placeholder="Price"
                className="h-[40px]"
              />
            </div>
            
  </div>
  </div>
  )
  }