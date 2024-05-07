

import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"


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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { ComboboxModule } from "@/components/ComboboxModule"
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Comboboxclasse } from "@/components/comboboxClasse"
import { Comboboxteacher } from "@/components/comboboxTeacher"
import { Separator } from "@/components/ui/separator";

export function AddSeance() {
  
  return (
    <div>
       <Separator className="mx-4"/>
       <Breadcrumb className="mx-20 ">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink>
            <Link to="/">admine</Link>
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
          <BreadcrumbPage className="text-blue-500">Ajouter Séance</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
       <div className="pl-[100px] ">
            <h2 className="text-2xl font-bold tracking-tight">Ajouter Séance</h2>
            <p className="text-muted-foreground">
            Selectioner les propriété de votre séance
            </p>
          </div>
    <div className="flex justify-center items-center h-scree py-8 ">
    
    <Card className="w-[1100px]">
      <CardHeader>
        <CardTitle ></CardTitle>
        <CardDescription>
         
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="semestre">Semestre</Label>
            <Select >
              <SelectTrigger id="Semestre">
                <SelectValue placeholder="Select semestre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="first">Premier semestre</SelectItem>
                <SelectItem value="second">Deuxième Semestre</SelectItem>
                
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="year">Année</Label>
            <Select defaultValue="2023-2024">
              <SelectTrigger
                id="year">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">2022-2023</SelectItem>
                <SelectItem value="2">2023-2024</SelectItem>
                <SelectItem value="3">2024-2025</SelectItem>
                <SelectItem value="4">2025-2026</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="area">Groupe</Label>
            <Select defaultValue="groupe1">
              <SelectTrigger id="Semestre">
                <SelectValue placeholder="Select groupe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Grpupe 1</SelectItem>
                <SelectItem value="2">Groupe 2</SelectItem>
                <SelectItem value="3">Groupe 3</SelectItem>
                <SelectItem value="4">Groupe 4</SelectItem>
                <SelectItem value="5">Groupe 5</SelectItem>
                <SelectItem value="6">Groupe 6</SelectItem>
                <SelectItem value="7">Groupe 7</SelectItem>
                <SelectItem value="8">Groupe 8</SelectItem>
                <SelectItem value="9">Groupe 9</SelectItem>
                <SelectItem value="10">Groupe 10</SelectItem>
                <SelectItem value="11">Groupe 11</SelectItem>
                
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid gap-2">
        <Label >module</Label>
          
          <ComboboxModule />
        </div>
        <div className="grid gap-2">
            <Label htmlFor="Type">Type</Label>
            <Select >
              <SelectTrigger
                id="type"
                
              >
                <SelectValue placeholder="Selectioner le type de séance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Cours</SelectItem>
                <SelectItem value="2">TD</SelectItem>
                <SelectItem value="3">Tp</SelectItem>
                
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
        <Label >Salle</Label>
          
          <Comboboxclasse />
        </div>
        <div className="grid gap-2">
        <Label >Enseignant</Label>
          
          <Comboboxteacher />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="grid gap-2">
            <Label >jour</Label>
            <Select >
              <SelectTrigger id="jour">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dimanche">Dimanche</SelectItem>
                <SelectItem value="lundi">Lundi</SelectItem>
                <SelectItem value="mardi">Mardi</SelectItem>
                <SelectItem value="mercredi">Mercredi</SelectItem>
                <SelectItem value="jeudi">Jeudi</SelectItem>
                
                
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label >Heur Début</Label>
            <Input
                type="time"
                name=""
                value=""
                onChange=""
                placeholder="from"
              />

          </div>
          <div className="grid gap-2">
            <Label >Heur Fin</Label>
            <Input
                type="time"
                name=""
                value=""
                onChange=""
                placeholder="from"
              />
          </div>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Please include all information relevant to your issue."
          />
        </div>
      </CardContent>
      <CardFooter className="justify-between space-x-2">
        <Button variant="ghost">Cancel</Button>
        <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="bg-blue-500 text-white">Submit</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will create new session and add 
            it to the schedule ,press continue to confirme .
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel  >Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
      </CardFooter>
    </Card>
    </div>
    </div>
  )
}
