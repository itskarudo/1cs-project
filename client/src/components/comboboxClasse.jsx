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

const classes = [
  {
    value: "salle 1",
    label: "Salle 1",
  },
  {
    value: "salle 2",
    label: "Salle 2",
  },
  {
    value: "salle 3",
    label: "Salle 3",
  },
  {
    value: "salle 4",
    label: "Salle 4",
  },
  {
    value: "salle 5",
    label: "Salle 5",
  },
  {
    value: "tp1 1",
    label: "TP 1",
  },
  {
    value: "tp 5",
    label: "TP 5",
  },
  {
    value: "tp 8",
    label: "TP 8",
  },
  {
    value: "emphi A",
    label: "Emphi A",
  },
  {
    value: "emphi E",
    label: "Emphi E",
  },
]

export function Comboboxclasse() {
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
            ? classes.find((classe) => classe.value === value)?.label
            : "Selectioner un classe..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search classe..." className="h-9" />
          <CommandList>
          <CommandEmpty>No classe found.</CommandEmpty>
          <CommandGroup>
            {classes.map((classe) => (
              <CommandItem
              className="w-[170px]"
                key={classe.value}
                value={classe.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
              >
                {classe.label}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === classe.value ? "opacity-100" : "opacity-0"
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
