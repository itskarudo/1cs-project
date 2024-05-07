"use client"

import * as React from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const modules = [
  {
    value: "base de données avancées 1",
    label: "Base de données avancées 1",
  },
  {
    value: "technologies et développement web 1",
    label: "Technologies et développement web 1SvelteKit",
  },
  {
    value: "méthodes de conception avancées",
    label: "Méthodes de conception avancées",
  },
  {
    value: "système d'aide à la décision",
    label: "Système d'aide à la décision",
  },
  {
    value: "système d'Exploitation 1",
    label: "Système d'Exploitation 1",
  },
  {
    value: "réseaux 1",
    label: "Réseaux 1",
  },
  {
    value: "introduction au Génie Logiciel",
    label: "Introduction au Génie Logiciel",
  },
  {
    value: "architectures Évoluées des Ordinateurs",
    label: "Architectures Évoluées des Ordinateurs",
  },
  {
    value: "langages et Outils du Web",
    label: "Langages et Outils du Web",
  },
  {
    value: "recherche Opérationnelle",
    label: "Recherche Opérationnelle",
  },
]

export function ComboboxModule() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[1050px] justify-between"
        >
          {value
            ? modules.find((module) => module.value === value)?.label
            : "Selectioner un module..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0">
        <Command>
          <CommandInput placeholder="Search subject..." className="h-9" />
          <CommandList>
          <CommandEmpty>No subject found.</CommandEmpty>
          <CommandGroup>
            {modules.map((module) => (
              <CommandItem
                key={module.value}
                value={module.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
              >
                {module.label}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === module.value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
